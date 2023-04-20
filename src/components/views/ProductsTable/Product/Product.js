import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit"

const Product = ({ product, URL, getApi, getSpinner }) => {

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podrás revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          getSpinner(true)
          //consulta delete con axios

          const res = await axios.delete(`${URL}/${id}`);


          if (res.status === 200) {
            Swal.fire(
              'Eliminado!',
              'Plato eliminado con éxito.',
              'success'
            )
            //volvemos a recargar la tabla
            getApi();
          }
        } catch (error) {
          console.log(error);
          //agregar cartel alert o modal al usuario con el error
        }
        finally {
          getSpinner(false)
        }
      }
    })
  };

  return (

      <tr>
        <td>{product.productName}</td>
        <td>${product.price}</td>
        <td>
          <p className="truncate-img-link m-0">{product.urlImg}</p>
        </td>
        <td>{product.category}</td>
        <td>{product.description}</td>
        <td className="w-25">
          <div className="d-flex justify-content-center">

            <Link
              to={`/product/edit/${product._id}`}
              className="update-btn mx-1 text-decoration-none text-center"
            >
              Modificar
            </Link>



            <button
              className="delete-btn mx-1"
              onClick={() => handleDelete(product._id)}
            >
              Borrar
            </button>


          </div>
        </td>
      </tr>
    


  );
};

export default Product;
