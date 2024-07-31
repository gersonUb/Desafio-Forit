// src/paginas/Registrar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { guardarUsuarios } from '../indexedDB';

const Registrar = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoUsuario = {
          name,
          username,
          email,
          address: { city },
          phone,
          company: { name: company },
        };
          try {
              await guardarUsuarios([nuevoUsuario]); // Nota: pasar un array
              navigate('/'); // Redirige al buscador después del registro
          } catch (error) {
              console.error('Error en registrar Usuario:', error);
          }
      };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Registrar {""}
                    <span className="text-black">Clientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Nombre del Cliente"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Username del Cliente"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Ubicacion
                        </label>
                        <input
                            type="text"
                            placeholder="Ciudad donde reside"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Contacto
                        </label>
                        <input
                            type="text"
                            placeholder="Numero de Telefono"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Empresa
                        </label>
                        <input
                            type="text"
                            placeholder="Nombre de la empresa"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Registrar"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>
            </div>
        </>
    );
};

export default Registrar;
