import {Navigate, Outlet } from "react-router";
import {useAuth} from "../../context/Auth.jsx";


export default function PrivateRoute({children}){
  const {currentUser} = useAuth();
  return (<>
    {currentUser?<Outlet />: <Navigate to="/auth/login" replace/>}
    </>);
}
