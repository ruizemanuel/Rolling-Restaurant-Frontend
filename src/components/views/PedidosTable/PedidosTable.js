import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Pedido from "./Pedido/Pedido";
import axios from "../../../config/axiosInit"
import Swal from "sweetalert2";

const PedidosTable = ({ pedidos, URL, getApi }) => {

  const [habilitado, setHabilitado] = useState(false);
  const [habilitadoDel, setHabilitadoDel] = useState(false);

  const uid = JSON.parse(localStorage.getItem("user-token")).uid

  const pedidoBuscado = pedidos.find((pedido) => pedido.uid === uid);

  const total = pedidoBuscado?.pedido.reduce((acumulador, pedido) => acumulador + pedido.price, 0);

  const navigate = useNavigate()



  const handleOrder = async () => {

    /////////////////////////////////////////////////



    const pedidoUpdated = {
      estado: "Pendiente"
    };

    try {
      /* const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productUpdated),
      }); */

      //const res = await axios.put(`${URL}/${id}`,productUpdated);

      const res = await axios.put(`${URL}/${pedidoBuscado._id}`, pedidoUpdated)

      console.log(res.data);

      if (res.status === 200) {
        Swal.fire("Updated!", "Your pedido has been delivered.", "success");
        getApi();
        setHabilitado(true)
        navigate("/pedidos");
      }
    } catch (error) {
      console.log(error);
    }

    //////////////////////////////////////////////////////

  }

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

          const res = await axios.delete(`${URL}/${pedidoBuscado._id}`);

          if (res.status === 200) {
            Swal.fire(
              'Deleted!',
              'Your pedido has been deleted.',
              'success'
            )
            //volvemos a recargar la tabla
            getApi();
            setHabilitadoDel(true)
          }
        } catch (error) {
          console.log(error);
          //agregar cartel alert o modal al usuario con el error
        }
      }
    })
  };

  return (
    <div>
      <Container className="py-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Pedidos Table</h1>

          {pedidoBuscado !== undefined ?
            <button
              className="delete-btn mx-1" disabled={habilitadoDel}
              onClick={() => handleDelete()}
            >
              Vaciar Carrito
            </button> :
            <div>

            </div>

          }

        </div>
        <hr />
        {/* Table of products */}
        {pedidoBuscado !== undefined ?
          <>

            <Table bordered hover responsive className="align-middle mt-3">
              <thead>
                <tr>

                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {pedidoBuscado.pedido?.map((pedido) => (
                  <Pedido
                    key={pedido._id}
                    pedido={pedido}
                    URL={URL}
                    getApi={getApi}
                  />
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between">
              <h5>TOTAL: ${total}</h5>
              <h5>Estado: {pedidoBuscado.estado}</h5>

              <button
                className="btn-primary mx-1" disabled={habilitado}
                onClick={() => handleOrder()}
              >
                Enviar
              </button>
            </div>

          </>
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

export default PedidosTable;
