import React, { useState, useEffect } from 'react';
import { UserList } from '../components/UserList';
import { UserItem } from '../components/UserItem';
import { Link } from 'react-router-dom';

const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://127.0.0.1:3001/users");
                const data = await response.json();
                setIsLoaded(true);
                setUsers(data.users);
            } catch (error) {
                setIsLoaded(true);
                setError(error);
            }
        })();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <React.Fragment>
                <h2>Listado de usuarios</h2>
                <UserList>
                    {
                        users.map(user => (
                            <UserItem key={user.id} id={user.id} name={user.name} />
                        ))
                    }
                </UserList>
                <Link to={'/adduser'}>Agrega usuario</Link>
            </React.Fragment>
        );
    }
}

export default Home;