import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "../../../config/axiosInit"

const PedidoAdminEdit = () => {
  //State

  const [isChecked, setIsChecked] = useState(false);
  const [spinner, setSpinnner] = useState(false);
  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS



  //Param
  const { id } = useParams();

  //Navigate
  const navigate = useNavigate();



  useEffect(() => {
    getOne();
  }, []);

  const getOne = async () => {
    try {
      

      //la peticion con Axios
      const res = await axios.get(`${URL}/${id}`);
      const pedidoApi = res.data;
      if (pedidoApi.estado === 'Pendiente') {
        setIsChecked(false)
      } else {
        setIsChecked(true)
      }



    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (event) => {
    setIsChecked(event.target.checked);

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //guardar el objeto
    const pedidoUpdated = {
      estado: isChecked ? "Realizado" : "Pendiente",
    };

    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Modificar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setSpinnner(true)
 
          const res = await axios.put(`${URL}/${id}`, pedidoUpdated);

          if (res.status === 200) {
            Swal.fire("Excelente!", "Pedido actualizado.", "success");
            navigate("/pedidos/table");
          }
        } catch (error) {
          console.log(error);
        }
        finally {
          setSpinnner(false)
        }
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Modificar Pedido</h1>
        <hr />
        {/* Form Product */}
        <Form
          className="my-5"
          onSubmit={handleSubmit}
        >
          <div className="d-flex text-center">

            <div className="me-4">
              Estado
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={isChecked}
                onChange={(e) => handleChange(e)} id="defaultCheck1" />
              {isChecked ? (
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Realizado
                </label>)
                : (
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Pendiente
                  </label>
                )}
            </div>

          </div>



          {spinner ? (

            <div className="text-end">
              <button class="btn-primary text-light" type="button" disabled>
                <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                Cargando...
              </button>
            </div>

          ) : (

            <div className="text-end">
              <button className="btn-primary text-light">Guardar</button>
            </div>

          )}
        </Form>
      </Container>
    </div>
  );
};

export default PedidoAdminEdit;