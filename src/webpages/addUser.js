import React, { useState } from 'react';
import { CreateUserButton } from '../components/CreateUserButton';
import { Link, Navigate } from 'react-router-dom';
import { renderErrorMessage } from '../utils/utils';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const addUser = async (name, email, password, phone) => {
        try {
            const response = await fetch('http://127.0.0.1:3001/signup', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            if (response.status === 201) {
                setIsSubmitted(true);
                localStorage.setItem('project1', JSON.stringify({ token: data.token }));
            } else {
                setIsSubmitted(false);
                setErrorMessages({ name: 'crea', message: data.message });
            }
        } catch (error) {
            console.log(error.message);
            setIsSubmitted(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(name, email, password, phone);
    };

    const renderForm = (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre </label>
                <input type="text" className="form-control" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder='Ingrese nombre'
                />
            </div>
            <div>
                <label>email </label>
                <input type="text" className="form-control" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder='Ingrese email'
                />
            </div>
            <div>
                <label>Password </label>
                <input type="password" className="form-control" value={password} placeholder='Ingrese password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Teléfono </label>
                <input type="text" className="form-control" value={phone} placeholder='Ingrese teléfono'
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <CreateUserButton />
        </form>
    );

    

    return (
        <React.Fragment>
            <h2>Registro de usuario</h2>
            {isSubmitted ? <Navigate to='/home' />: renderForm}
            <br />
            {renderErrorMessage('crea', errorMessages)}
            <br />
            <Link to={'/'}>Login</Link>
        </React.Fragment>
    );
}

export default AddUser;