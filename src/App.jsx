import { useState } from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import AuthProvider from "./context/Auth.jsx";
import Signup from "./components/authentications/Signup.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/authentications/Login.jsx";
import PrivateRoute from "./components/main/PrivateRoute.jsx";
import Main from "./components/main/Main.jsx";
import Exam from "./components/main/Exam.jsx";
import ResetPassword from "./components/authentications/ResetPassword.jsx";
import SubscriptionProvider from "./context/Subscription.jsx";

function App() {
  return (
    <>
      <SubscriptionProvider>
	<AuthProvider>
	  <Routes>
	      <Route path="/" element={<Home />} />
	      <Route  element={<PrivateRoute />} >
		<Route path="/main" element={<Main />} />
		<Route path="/main/exam" element={<Exam />} />
	      </Route>
	      <Route path="/auth" element={<Navigate to="/auth/login" replace/>} />
	      <Route path="/auth/signup" element={<Signup />} />
	      <Route index path="/auth/login" element={<Login />} />
	      <Route path="/auth/forgot-password" element={<ResetPassword />} />
	      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
	      <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
	      <Route path="/forgot-password" element={<Navigate to="/auth/forgot-password" replace />} />
	      <Route path="*" element={<Navigate to="/" />} />
	  </Routes>
	</AuthProvider>
      </SubscriptionProvider>
    </>
  )
}

export default App
