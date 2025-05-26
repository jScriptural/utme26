import {useState, useEffect, useContext, createContext} from 'react';
//import {useNavigate} from 'react-router';
import auth from '../firebase/firebase.auth.js'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
  signOut
} from 'firebase/auth';



const AuthContext = createContext();

function useAuth(){
  return useContext(AuthContext);
}


function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [errCode,setErrCode] = useState();
  const [errMsg,setErrMsg] = useState();
  //const navigate = useNavigate();

  async function signup(email,password,displayName){
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);

      await updateProfile(auth.currentUser,{displayName});
      await sendEmailVerification(auth.currentUser);
    } catch(error) {
      setErrCode(error.code);
      setErrMsg(error.message);
    }
  }

  async function resendVerificationLink(){
    try {
      await sendEmailVerication(auth.currentUser);

    }catch (error){
      console.log("verification error: ",error.code);
    }
  }


  async function logout(){
    try {
      await signOut(auth);
      setLoading(true);
    } catch(err) {
      setErrCode(err.code);
      setErrMsg(err.message);
    }
  }

  async function login(email,password){
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email,password);
      if(!userCredential.emailVerified){
	throw new Error({code: "auth/unverified-email", message: "Unverified email: Please verify your email!"});
      }
    } catch(error) {
      setErrCode(error.code);
      setErrMsg(error.message);
    }

  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{

      console.log("auth state changed");
      if(user)
      {
	console.log("user defined on auth stated changed");
	
	setCurrentUser(user);
	setLoading(false);
	console.log("user: ", user);
      }else {
	setCurrentUser(user);
	setLoading(true);
	console.log("user undefined  on auth stated changed",user);
      }
    })
  },[])

  const value = {
    currentUser,
    errCode,
    errMsg,
    signup,
    login,
    logout,
    loading,
  }
  return (<>

    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>

    </>)
}

export {AuthProvider as default, useAuth};

