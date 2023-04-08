import React, { useState, useEffect } from "react";
import { Alert, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Pedido from "./Pedido/Pedido";
import axios from "../../../config/axiosInit"
import Swal from "sweetalert2";

const PedidosTable = ({ }) => {

  const [habilitado, setHabilitado] = useState(false);
  const [error, setError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedEfectivo, setIsCheckedEfectivo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [spinner, setSpinnner] = useState(false);
  const [spinnerEnviar, setSpinnnerEnviar] = useState(false);
  const [pedidoBuscado, setPedidoBuscado] = useState({});
  const [spinnerBody, setSpinnnerBody] = useState(false);
  const [pago, setPago] = useState('')

  const navigate = useNavigate();

  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS
  const email = JSON.parse(localStorage.getItem("user-token")).email

  const getSpinner = (spinner) => {
    setSpinnnerBody(spinner)
  };


  useEffect(() => {
    getApi_pedidos()

  }, []);



  const getApi_pedidos = async () => {


    try {


      const res = await axios.post(`${URL}/pedido`, {
        email
      });
      const pedidoApi = res.data;


      if (pedidoApi?.estado === 'Pendiente' || pedidoApi?.estado === 'Realizado') {
        setHabilitado(true)
      }

      setPedidoBuscado(pedidoApi)



    } catch (error) {
      console.log(error);
    }


  };


  const handleChange = (event) => {
    //setIsChecked(event.target.checked);
    console.log('PAGO', event.target.getAttribute('value'))
    setPago(event.target.getAttribute('value'))

  };

  const handleError = async () => {

    setError(true)
    if (pedidoBuscado.estado === 'Realizado') {
      setErrorMessage("Por favor vacie el carrito para realizar un nuevo pedido")
    } else {
      setErrorMessage("Por favor espere, estamos procesando su pedido")
    }


  }




  const handleOrder = async () => {

   if (pago.length === 0){
    setError(true)
    setErrorMessage('Por favor seleccione un medio de pago')
    return
   }

   if(pago === 'efectivo'){
    const pedidoUpdated = {
      estado: "Pendiente"
    };

    try {
      setSpinnnerEnviar(true)
      setHabilitado(true)

      const res = await axios.put(`${URL}/${pedidoBuscado._id}`, pedidoUpdated)

      console.log(res.data);

      if (res.status === 200) {
        Swal.fire("Excelente!", "Estamos preparando tu pedido.", "success");
        getApi_pedidos();
        //setHabilitado(true)
        //navigate("/pedidos/tarjeta");
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setSpinnnerEnviar(false)
    }
   } else{
    navigate(`/pedidos/tarjeta/${pedidoBuscado._id}`);
   }

    

  }

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
          setSpinnner(true)

          const res = await axios.delete(`${URL}/${pedidoBuscado._id}`);

          if (res.status === 200) {
            Swal.fire(
              'Eliminado!',
              'Has eliminado tu pedido',
              'success'
            )
            //volvemos a recargar la tabla
            getApi_pedidos()
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
          <h1>Mis pedidos</h1>

          {pedidoBuscado !== null ?


            spinner ? (

              <div className="text-end">
                <button class="delete-btn text-light" type="button" disabled>
                  <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                  Cargando...
                </button>
              </div>

            ) : (

              habilitado && pedidoBuscado.estado !== 'Realizado' ? (
                <button
                  className="delete-btn mx-1" disabled={spinnerEnviar}
                  onClick={() => handleError()}
                >
                  Vaciar Carrito
                </button>

              ) :

                (
                  <button
                    className="delete-btn mx-1" disabled={spinnerEnviar}
                    onClick={() => handleDelete()}
                  >
                    Vaciar Carrito
                  </button>

                )


            ) :

            <div>

            </div>

          }

        </div>
        <hr />
        {/* Table of products */}
        {pedidoBuscado !== null ?

          spinnerBody ? (

            <div class="text-center" >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>


          ) : (
            <>

              <Table bordered hover responsive className="align-middle mt-3">
                <thead>
                  <tr>

                    <th>Name</th>
                    <th>Price</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidoBuscado.pedido?.map((pedido) => (
                    <Pedido
                      key={pedido._id}
                      habilitado={habilitado}
                      pedido={pedido}
                      pedidoBuscado={pedidoBuscado}
                      URL={URL}
                      getApi={getApi_pedidos}
                      getSpinner={getSpinner}
                      handleError={handleError}
                    />
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between">
                <h5>TOTAL: ${pedidoBuscado.total}</h5>
                <h5>Estado: {pedidoBuscado.estado}</h5>





              </div>

              <div className="d-flex justify-content-between mt-5">


                {pedidoBuscado.estado === '-' ? (

                  <div>

                    <h5>Medio de pago:</h5>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="pago" id="defaultCheck1" value="tarjeta"
                        onChange={(e) => handleChange(e)} />
                      <label className="form-check-label" htmlFor="defaultCheck1">
                        Tarjeta
                      </label>

                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="pago" id="defaultCheck2" value="efectivo"
                        onChange={(e) => handleChange(e)} />
                      <label className="form-check-label" htmlFor="defaultCheck2">
                        Efectivo
                      </label>

                    </div>
                  </div>
                ) : (

                  <div></div>
                )}





                {spinnerEnviar ? (

                  <div className="text-end">
                    <button class="btn-primary text-light" type="button" disabled>
                      <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                      Cargando...
                    </button>
                  </div>

                ) : (

                  habilitado ? (

                    <div className="text-end">
                      <button
                        className="btn-primary mx-1 text-light" disabled={spinner}
                        onClick={() => handleError()}
                      >
                        Enviar
                      </button>
                    </div>

                  ) : (

                    <div className="text-end">
                      <button
                        className="btn-primary mx-1 text-light" disabled={spinner}
                        onClick={() => handleOrder()}
                      >
                        Enviar
                      </button>
                    </div>
                  )

                )}
              </div>


            </>
          )

          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            <h1>🍕 No se encontraron pedidos 🍕</h1>
          </div>
        }
        {error ? (
          <Alert className="mt-5" variant="danger" onClick={() => setError(false)} dismissible>
            {errorMessage}
          </Alert>
        ) : null}
      </Container>
    </div>
  );
};

export default PedidosTable;
