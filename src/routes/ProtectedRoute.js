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


// const [roles, setRoles] = useState([]);

//    const URL_USUARIOS = process.env.REACT_APP_API_HAMBURGUESERIA_USERS;
   
//    useEffect(() => {
//       getUsers();
//     }, [loggedUser]);

//     const getUsers = async () => {
//       try {
  
//         const response = await axios.get(URL_USUARIOS);
//         console.log('PROTECTED!!!!',response?.data);
//         const usersApi = response?.data;
//         let elementoEncontrado = usersApi.find(elemento => elemento._id === loggedUser.uid);
//         console.log('ROLES EN PROTECTED', elementoEncontrado.roles)
//         setRoles(elementoEncontrado.roles)
//         roles.includes('admin') && localStorage.setItem("is-authorized", JSON.stringify(true));
        
  
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     console.log('DESDE PROTECTED', roles)
//    console.log('DESDE PROTECTED2', loggedUser)

//     if(!roles.includes('admin')){
//       return <Navigate to={"/auth/login"} replace></Navigate>
//     }
//     return children











