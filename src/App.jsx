import { useState } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/Header.jsx";
import AuthProvider from "./context/Auth.jsx";
import Signup from "./components/authentications/Signup.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/authentications/Login.jsx";
import PrivateRoute from "./components/main/PrivateRoute.jsx";
import Main from "./components/main/Main.jsx";
import ResetPassword from "./components/authentications/ResetPassword.jsx";


function App() {
  return (
    <>
      <AuthProvider>
      <Routes>
	  <Route path="/" element={<Home />} />
	  <Route  element={<PrivateRoute />} >
	    <Route path="/main" element={<Main />} />
	  </Route>
	  <Route path="/auth" element={<Navigate to="/auth/login" replace/>} />
	  <Route path="/auth/signup" element={<Signup />} />
	  <Route index path="/auth/login" element={<Login />} />
	  <Route path="/auth/forgot-password" element={<ResetPassword />} />
	  <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
