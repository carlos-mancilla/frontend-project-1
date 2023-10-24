import { Link } from 'react-router-dom';

const UserItem = (props) => {
    return (
        <li>
            <Link to={`user/${props.id}`}>{props.name}</Link>
        </li>
    );
}

export { UserItem }