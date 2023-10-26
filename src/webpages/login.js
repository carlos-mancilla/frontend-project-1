import React, { useState } from 'react';
import {
    Navigate,
    Link
} from 'react-router-dom';
import { renderErrorMessage } from '../utils/utils';

const Login = () => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const errors = {
        email: "usuario o contraseña incorrectos"
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://127.0.0.1:3001/signin', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error.message);
            return undefined;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, pass } = document.forms[0];

        try {
            const userData = await login(email.value, pass.value);
            console.log('userData: ', userData);

            if (userData.token) {
                setIsSubmitted(true);
                localStorage.setItem('project1', JSON.stringify({ token: userData.token }));
            }
        } catch (error) {
            setErrorMessages({ name: "email", message: error.message });
            return;
        }
        setErrorMessages({ name: "email", message: errors.email });
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email </label>
                    <input type="text" name="email" required />
                </div>
                <div>
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div>
                    {renderErrorMessage('email', errorMessages)}
                </div>
                <br />
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <React.Fragment>
            <h2>Sign In</h2>
            {isSubmitted ? <Navigate to='/home' /> : renderForm}
            <br />
            <Link to={'/adduser'}>Agrega usuario</Link>
        </React.Fragment>
    );
}

export default Login;