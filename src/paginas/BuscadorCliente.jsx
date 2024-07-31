// src/paginas/BuscadorCliente.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserCard from '../components/UserCard';
import { obtenerUsuarios, guardarUsuarios, eliminarUsuario } from '../indexedDB';

const BuscadorCliente = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [filtradoUsuarios, setFiltradoUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let usuarios = await obtenerUsuarios();
                
                if (usuarios.length === 0) {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                    usuarios = response.data;
                    await guardarUsuarios(usuarios);
                }
                setUsuarios(usuarios);
                setFiltradoUsuarios(usuarios);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtrarUsuarios = () => {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtrado = usuarios.filter(usuario =>
                usuario.name.toLowerCase().includes(lowercasedSearchTerm) ||
                usuario.email.toLowerCase().includes(lowercasedSearchTerm) ||
                usuario.address.city.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFiltradoUsuarios(filtrado);
        };

        filtrarUsuarios();
    }, [searchTerm, usuarios]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await eliminarUsuario(id);
            const actualizarUsuarios = await obtenerUsuarios();
            setUsuarios(actualizarUsuarios);
            setFiltradoUsuarios(actualizarUsuarios);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Buscador {""}
                    <span className="text-black">Clientes</span>
                </h1>
            </div>
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Buscar
                        </label>
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email o ciudad"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </form>

                <div className="mt-10">
                    {filtradoUsuarios.length > 0 ? (
                        filtradoUsuarios.map(usuario => (
                            <UserCard
                                key={usuario.id}
                                usuario={usuario}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </div>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className='block text-center my-5 text-gray-500' to="/registrar-cliente">
                        ¿No encontras el cliente? Regístralo
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default BuscadorCliente;
