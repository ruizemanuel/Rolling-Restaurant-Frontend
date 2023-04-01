import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ loggedUser,children }) => {

   const token = JSON.parse(localStorage.getItem("is-authorized")) || null;

 if(!token){
    return <Navigate to={"/auth/login"}></Navigate>
 } else{
    return children
 }

};

export default ProtectedRoute;











