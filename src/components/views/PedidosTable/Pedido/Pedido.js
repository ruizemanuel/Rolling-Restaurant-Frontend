import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit"

const Pedido = ({ pedido, URL, getApi }) => {

  /* const url = process.env.REACT_APP_API_HAMBURGUESERIA;
  console.log(url);
 */

  console.log("DESDE PEDIDO", pedido)


  return (

    <tr>

      <td>{pedido.productName}</td>
      <td>${pedido.price}</td>

    </tr>

  );
};

export default Pedido;




{/* <td className="w-25">
        <div className="d-flex justify-content-center">
          <Link
            to={`/product/edit/${pedido._id}`}
            className="update-btn mx-1 text-decoration-none text-center"
          >
            Update
          </Link>
          <button
            className="delete-btn mx-1"
            onClick={() => handleDelete(pedido._id)}
          >
            Delete
          </button>
        </div>
      </td> */}



// const handleDelete =  (id) => {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Delete'
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         //consulta delete con fetch
//         /* const res = await fetch(`${URL}/${id}`,{
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         });
//          */
//         //consulta delete con axios

//         const res = await axios.delete(`${URL}/${id}`);

//         if(res.status === 200) {
//           Swal.fire(
//             'Deleted!',
//             'Your file has been deleted.',
//             'success'
//           )
//           //volvemos a recargar la tabla
//           getApi();
//         }
//       } catch (error) {
//         console.log(error);
//         //agregar cartel alert o modal al usuario con el error
//       }
//     }
//   })
// };