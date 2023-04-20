import React from "react";
import { Link } from "react-router-dom";


const PedidoAdmin = ({ pedido, URL, getApi }) => {



  return (
    <tr>
      <td className="d-none">{pedido._id}</td>
      <td>{pedido.email}</td>
      <td>{pedido.estado}</td>

      <td className="w-25">
        <div className="d-flex justify-content-center">

          {pedido.estado === 'Pendiente' ||  pedido.estado === 'Realizado'?
            (
              <Link
                to={`/pedido/edit/${pedido._id}`}
                className="update-btn mx-1 text-decoration-none text-center"
              >
                Modificar
              </Link>
            ) : (
              <div className="update-btn mx-1 text-decoration-none text-center">
                Esperando al usuario
              </div>
            )
          }



        </div>
      </td>
    </tr>
  );
};

export default PedidoAdmin;
