import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './modules/HomePage/Home';
import Profile from './modules/userProfile/Profile';

function Router() {
    return (
        <BrowserRouter>

            <Navbar />


            <Routes>

                <Route path="/" element={<Home />} />


             {/* <Route path="/feeds" element={<FeedsPage />} /> */}

                <Route path="/profile" element={<Profile />} />


                {/* <Route path="/messages" element={<Messages />} />  */}


                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}


function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600">Page Not Found</p>
            </div>
        </div>
    );
}

export default Router;