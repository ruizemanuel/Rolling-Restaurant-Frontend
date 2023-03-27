import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../../config/axiosInit"

const Pedido = ({ pedido, URL, getApi }) => {


  console.log("DESDE PEDIDO", pedido)


  return (

    <tr>

      <td>{pedido.productName}</td>
      <td>${pedido.price}</td>

    </tr>

  );
};

export default Pedido;