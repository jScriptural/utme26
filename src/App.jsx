import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import AuthProvider from './context/Auth.jsx';
import Signup from './components/authentications/Signup.jsx';
import Home from './components/Home.jsx'
import Login from './components/authentications/Login.jsx';



;
function App() {
  return (
    <>
      <Header />
      <AuthProvider>
      <Routes>
	  <Route path="/" element={<Home />} />
      
	  <Route path="signup" element={<Signup />} />
	  <Route path="login" element={<Login />} />
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
