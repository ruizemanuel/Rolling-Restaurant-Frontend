import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PedidoAdmin from "./PedidoAdmin/PedidoAdmin";

const PedidosTableAdmin = ({ pedidos, URL, getApi }) => {
  return (
    <div>
      <Container className="py-5">
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
                <th>User ID</th>
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
