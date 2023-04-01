import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Pedido from "./Pedido/Pedido";
import axios from "../../../config/axiosInit"
import Swal from "sweetalert2";

const PedidosTable = ({ }) => {

  const [habilitado, setHabilitado] = useState(false);
  const [spinner, setSpinnner] = useState(false);
  const [habilitadoDel, setHabilitadoDel] = useState(false);
  const [pedidoBuscado, setPedidoBuscado] = useState({});

  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS
  const email = JSON.parse(localStorage.getItem("user-token")).email


  useEffect(() => {
    getApi_pedidos()

  }, []);

  const getApi_pedidos = async () => {
    ////////////////////////////////////////////////////////////////////////

    try {
      //la peticion con fetch
      /* const res = await fetch(`${URL}/${id}`);
      const productApi = await res.json(); */

      //la peticion con Axios
      const res = await axios.post(`${URL}/pedido`, {
        email
      });
      const pedidoApi = res.data;
      console.log('PROBANDO UN PEDIDO', pedidoApi)
      //setProduct(productApi);
      setPedidoBuscado(pedidoApi)

    } catch (error) {
      console.log(error);
    }

    //////////////////////////////////////////////////////////////////////////
  };


  const navigate = useNavigate()

  //////////////////////////////////////
  // const [pedidos, setPedidos] = useState([]);
  // const URL = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS

  // useEffect(() => {
  //   console.log('HOLA DESDE PEDIDOSSSSSS')
  //   getApi_pedidos()
  // }, []);

  // const getApi_pedidos = async () => {
  //   try {

  //     const res = await axios.get(URL);
  //     const pedidoApi = res?.data;

  //     setPedidos(pedidoApi);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //const pedidoBuscado = JSON.parse(localStorage.getItem("pedido"))

  /////////////////////////////////////

  //const pedidoBuscado = pedidos.find((pedido) => pedido.uid === uid);

  // const total = pedidoBuscado?.pedido.reduce((acumulador, pedido) => acumulador + pedido.price, 0);
  //const total = "0"


  const handleOrder = async () => {

    /////////////////////////////////////////////////



    const pedidoUpdated = {
      estado: "Pendiente"
    };

    try {
      setSpinnner(true)
      const res = await axios.put(`${URL}/${pedidoBuscado._id}`, pedidoUpdated)

      console.log(res.data);

      if (res.status === 200) {
        Swal.fire("Updated!", "Your pedido has been delivered.", "success");
        getApi_pedidos();
        setHabilitado(true)
        navigate("/pedidos");
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setSpinnner(false)
    }

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
          setSpinnner(true)

          const res = await axios.delete(`${URL}/${pedidoBuscado._id}`);

          if (res.status === 200) {
            Swal.fire(
              'Deleted!',
              'Your pedido has been deleted.',
              'success'
            )
            //volvemos a recargar la tabla
            getApi_pedidos()
            setHabilitadoDel(true)
          }
        } catch (error) {
          console.log(error);
        }
        finally {
          setSpinnner(false)
        }
      }
    })
  };

  return (
    <div>
      <Container className="py-5 pedidosContainer">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Pedidos Table</h1>

          {pedidoBuscado !== null ?
            
            
            spinner ? (

              <div className="text-end">
                <button class="delete-btn text-light" type="button" disabled>
                  <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              </div>

            ) : (

              <button
              className="delete-btn mx-1" disabled={habilitadoDel}
              onClick={() => handleDelete()}
            >
              Vaciar Carrito
            </button> 

            ) :
            
            <div>

            </div>

          }

        </div>
        <hr />
        {/* Table of products */}
        {pedidoBuscado !== null ?
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
                    getApi={getApi_pedidos}
                  />
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between">
              <h5>TOTAL: ${pedidoBuscado.total}</h5>
              <h5>Estado: {pedidoBuscado.estado}</h5>


              {spinner ? (

                <div className="text-end">
                  <button class="btn-primary text-light" type="button" disabled>
                    <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                </div>

              ) : (

                <div className="text-end">
                  <button
                    className="btn-primary mx-1 text-light" disabled={habilitado}
                    onClick={() => handleOrder()}
                  >
                    Enviar
                  </button>
                </div>

              )}


            </div>

          </>
          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            <h1>🍕 No se encontraron pedidos 🍕</h1>
          </div>
        }
      </Container>
    </div>
  );
};

export default PedidosTable;
