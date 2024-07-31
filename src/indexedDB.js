// src/indexedDB.js
import { openDB } from 'idb';

// Configuración de la Base de Datos IndexedDB
export const dbPromise = openDB('usuariosDB', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('usuarios')) {
            db.createObjectStore('usuarios', { keyPath: 'id', autoIncrement: true });
        }
    },
});

// Obtener usuarios de IndexedDB
export const obtenerUsuarios = async () => {
    const db = await dbPromise;
    const tx = db.transaction('usuarios', 'readonly');
    const store = tx.objectStore('usuarios');
    return await store.getAll();
};

// Función para guardar usuarios
export const guardarUsuarios = async (usuarios) => {
    const db = await dbPromise;
    const tx = db.transaction('usuarios', 'readwrite');
    const store = tx.objectStore('usuarios');
    usuarios.forEach(usuario => {
        // Asegúrate de que cada usuario tenga un id antes de guardar
        if (!usuario.id) {
            usuario.id = Date.now(); // Genera un id único si no está presente
        }
        store.put(usuario);
    });
    await tx.done;
};

// Eliminar un usuario de IndexedDB
export const eliminarUsuario = async (id) => {
    const db = await dbPromise;
    const tx = db.transaction('usuarios', 'readwrite');
    const store = tx.objectStore('usuarios');
    await store.delete(id);
    await tx.done;
};
