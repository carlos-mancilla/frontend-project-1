import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';
import Home from './home';
import User from './user';
import AddUser from './addUser';

const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/adduser" element={<AddUser />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Webpages;