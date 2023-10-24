import React, { useState } from 'react';
import { CreateUserButton } from '../components/CreateUserButton';
import { Link } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const addUser = async (name, email, phone) => {
        try {
            const response = await fetch('http://127.0.0.1:3001/users/user', {
                method: 'POST',
                body: JSON.stringify({
                    user: {
                        name,
                        email,
                        phone
                    }
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            await response.json();
            setName('');
            setEmail('');
            setPhone('');
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(name, email, phone);
    };

    return (
        <React.Fragment>
            <h2>Agrega usuario</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder='Ingrese nombre'
                />
                <input type="text" className="form-control" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder='Ingrese email'
                />
                <input type="text" className="form-control" value={phone} placeholder='Ingrese teléfono'
                    onChange={(e) => setPhone(e.target.value)}
                />
                <CreateUserButton />
            </form>
            <br/>
            <Link to={'/'}>Inicio</Link>
        </React.Fragment>
    );
}

export default AddUser;