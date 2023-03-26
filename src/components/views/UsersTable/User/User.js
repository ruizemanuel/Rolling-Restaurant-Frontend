import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit"


const User = ({ user, URL_usuarios, getApi_users }) => {


  /* const url = process.env.REACT_APP_API_HAMBURGUESERIA;
  console.log(url);
 */
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //consulta delete con fetch
          /* const res = await fetch(`${URL}/${id}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });
           */
          //consulta delete con axios

          const res = await axios.delete(`${URL_usuarios}/${id}`);

          if (res.status === 200) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            //volvemos a recargar la tabla
            getApi_users();
          }
        } catch (error) {
          console.log(error);
          //agregar cartel alert o modal al usuario con el error
        }
      }
    })
  };

  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>

      <td className="w-25">
        <div className="d-flex justify-content-center">
          <Link
            to={`/user/edit/${user._id}`}
            className="btn-orange mx-1 text-decoration-none text-center"
          >
            Update
          </Link>
          
        </div>
      </td>
    </tr>
  );
};

export default User;


{/* <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={activo}
              onChange={(e) => handleChange(e)} id="defaultCheck1" />
            {activo ? (
              <label className="form-check-label" htmlFor="defaultCheck1">
                Activo
              </label>)
              : (
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Inactivo
                </label>
              )}
          </div> */}
