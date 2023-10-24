import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const User = () => {
    let params = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://127.0.0.1:3001/users/user/" + params.id);
                const data = await response.json();
                setUser(data);
                setIsLoaded(true);
            } catch (error) {
                setIsLoaded(true);
                setError(error);
            }
        })(); 
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (user) {
        return (
            <React.Fragment>
                <h1>{user.name}</h1>
                <div>
                    Email: {user.email}
                </div>
                <div>
                    Phone: {user.phone}
                </div>
                <br />
                <Link to={'/'}>Inicio</Link>
            </React.Fragment>
        );
    }

    return (
        <div>
            <h1>User Details</h1>
            ID: {params.id}
        </div>
    );
}

export default User;