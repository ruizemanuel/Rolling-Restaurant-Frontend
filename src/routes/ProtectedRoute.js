import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ loggedUser,children }) => {

   const token = JSON.parse(localStorage.getItem("is-authorized")) || false;

 if(!token){
    return <Navigate to={"/error"}></Navigate>
 } else{
    return children
 }

};

export default ProtectedRoute;











