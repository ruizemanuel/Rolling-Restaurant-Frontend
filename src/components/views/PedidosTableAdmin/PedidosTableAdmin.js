import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PedidoAdmin from "./PedidoAdmin/PedidoAdmin";
import axios from "../../../config/axiosInit"

const PedidosTableAdmin = ({ }) => {

  const [pedidos, setPedidos] = useState([]);
  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS

//////////////////////////////////////
useEffect(() => {
  getApi()
  
}, []);
/////////////////////////////////////

const getApi = async () => {
  ////////////////////////////////////////////////////////////////////////

try {
  //la peticion con fetch
  /* const res = await fetch(`${URL}/${id}`);
  const productApi = await res.json(); */

  //la peticion con Axios
  const res = await axios.get(URL);
  const pedidoApi = res.data;
  console.log('PROBANDO UN PEDIDO', pedidoApi)
  //setProduct(productApi);
  setPedidos(pedidoApi)

} catch (error) {
  console.log(error);
}

//////////////////////////////////////////////////////////////////////////
};

  return (
    <div>
      <Container className="py-5 pedidosContainerAdm">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Pedidos Table</h1>

        </div>
        <hr />
        {/* Table of products */}
        {pedidos?.length !== 0 ?
          <Table bordered hover responsive className="align-middle mt-3">
            <thead>
              <tr>
                <th>Pedido ID</th>
                <th>Email</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos?.map((pedido) => (
                <PedidoAdmin
                  key={pedido._id}
                  pedido={pedido}
                  URL={URL}
                  getApi={getApi}
                />
              ))}
            </tbody>
          </Table>
          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            {/* No products found message */}
            <h1>🍕 No se encontraron pedidos 🍕</h1>
          </div>
        }
      </Container>
    </div>
  );
};

export default PedidosTableAdmin;
