import React from "react";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit"

const Pedido = ({ habilitado, pedido, pedidoBuscado, URL, getApi, getSpinner, handleError }) => {

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
          const res = await axios.delete(`${URL}/pedido/${pedidoBuscado._id}`,
            { data: { id, newTotal: pedidoBuscado.total - pedido.price } });

          if (res.status === 200) {
            Swal.fire(
              'Eliminado!',
              'Has eliminado el producto de tu carrito',
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


      <td>{pedido.productName}</td>
      <td>${pedido.price}</td>
      <td className="w-25">
        <div className="d-flex justify-content-center">

          {habilitado ?

            (
              <button
                className="delete-btn mx-1"
                onClick={() => handleError()}
              >
                Eliminar
              </button>

            ) : (
              <button
                className="delete-btn mx-1"
                onClick={() => handleDelete(pedido._id)}
              >
                Eliminar
              </button>

            )}


        </div>
      </td>


    </tr>





  );
};

export default Pedido;