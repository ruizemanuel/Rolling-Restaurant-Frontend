import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit"


const User = ({ user, URL_usuarios, getApi_users }) => {

  const email = JSON.parse(localStorage.getItem("user-token")).email

  console.log('DESDE USER', email)


  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.activo ? 'activo' : 'inactivo'}</td>

      <td className="w-25">
        <div className="d-flex justify-content-center">

          {user.email !== email ? (

            <Link
              to={`/user/edit/${user._id}`}
              className="update-btn mx-1 text-decoration-none text-center"
            >
              Modificar
            </Link>

          ) : (

            <div className="update-btn mx-1 text-decoration-none text-center">
              No es posible editar
            </div>

          )}



        </div>
      </td>
    </tr>
  );
};

export default User;
