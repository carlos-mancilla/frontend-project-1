import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';
import Home from './home';
import User from './user';
import AddUser from './addUser';
import Login from './login';

const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Webpages;