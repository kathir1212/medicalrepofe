import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate , Navigate } from 'react-router-dom';

import Home from './home';
import Dashboard from './dashboard';

import logo from './assets/images.png';

import Login from './components/login';
import Register from './components/register';
import ResetPassword from './components/resetpassword';
import ForgotPassword from './components/forget';
import AddMedicine from './components/addMedicine';

import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import Medicinelist from './components/medicinelist';

// Initialize Stripe public key

function App() {
  const [auth, setAuth] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // To navigate after logout
  const isAdmin = auth?.role === 'admin';

  // Routes where the navbar should be hidden
  const hideNavbarRoutes = ['/', '/login', '/register', '/forgot-password'];
  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith('/reset-password');

    const PrivateRoute = ({ children }) => {
      const token = localStorage.getItem('token');
      return token ? children : <Navigate to="/login" replace />;
    };

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    setAuth(storedAuth);
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth'); 
    localStorage.removeItem('token'); 
    setAuth(null); 
    navigate('/login'); 
  };

  return (
    <>
      {/*  Navbar - Hidden on Auth Pages */}
      {!shouldHideNavbar && (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-[3rem]" alt="Logo" />
            </a>

            <div className="flex md:order-2 space-x-4 md:space-x-0 rtl:space-x-reverse">
              {/* Logout Button */}
              <button
                onClick={logout}
                className="text-white bg-red-500 px-4 py-2 rounded-lg ml-[10%]"
              >
                Logout
              </button>
            </div>

            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="font-[Poppins] flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li><Link to="/dashboard/allorder" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">Medical Dashboard</Link></li>
               
              
              </ul>
            </div>
          </div>
        </nav>
      )}

      {/* ✅ Routes */}
      <div className="">
       
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/home" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
           
            {/* ✅ Admin-only Dashboard with nested routes */}
            {true && (
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route path="add-medicine" element={<AddMedicine />} />
                
                <Route path="list" element={<Medicinelist/>} />
              </Route>
            )}

           
            
          </Routes>
       
      </div>
    </>
  );
}

export default App;
