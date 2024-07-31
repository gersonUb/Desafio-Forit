import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UserCard = ({ usuario, onDelete }) => {
    if (!usuario) {
        return null; // No renderizar nada si el usuario es inválido
    }

    return (
        <div className="p-4 border rounded-lg shadow-md mb-4 relative">
            <h2 className="text-2xl font-bold">{usuario.name}</h2>
            <p>Username: {usuario.username}</p>
            <p>Email: {usuario.email}</p>
            <p>Ciudad: {usuario.address?.city}</p>
            <p>Teléfono: {usuario.phone}</p>
            <p>Empresa: {usuario.company?.name}</p>

            <div className="absolute top-2 right-2">
                <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => onDelete(usuario.id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    usuario: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string.isRequired,
        }).isRequired,
        phone: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserCard;