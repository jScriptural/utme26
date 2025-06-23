import auth from '../firebase/firebase.auth.js'
import Loading from "../components/Loading.jsx";
import {
  useState, 
  useEffect, 
  useContext, 
  createContext} from 'react';

import { 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword, 
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  signOut } from 'firebase/auth';



const AuthContext = createContext();

function useAuth(){
  return useContext(AuthContext);
}


function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [canUpdate, setCanUpdate] = useState(false);

  const signUp = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
  }

  const verifyEmail = user=>{
    return sendEmailVerication(user);
  }

  const logOut = ()=>{
    return signOut(auth);
  }

  const changeEmail = (newEmail)=>{
    return updateEmail(currentUser,newEmail);
  }

  const logIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
  }

  const setProfile = (props)=>{
    return updateProfile(currentUser,props);
  }

  const sendResetEmail = email=>{
    return sendPasswordResetEmail(auth,email);
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      setCurrentUser(user);
      setLoading(false);
      if(user){
	setCanUpdate(true);
      } else {
	setCanUpdate(false);
      }
    });
      return unsubscribe;
  },[]);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    verifyEmail,
    setProfile,
    canUpdate,
    sendResetEmail,
    changeEmail,
  };

  return (<>

    <AuthContext.Provider value={value}>
      {loading?<Loading /> : children}
    </AuthContext.Provider>

    </>)
}

export {AuthProvider as default, useAuth};

