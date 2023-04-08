import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  validateUserName,
  validateEmail,
  validatePassword
} from "../../helpers/validateFields";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axiosInit";

const UserCreate = ({ }) => {

  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_USUARIO

  //One general state
  const [inputs, setInputs] = useState({});
  const [spinner, setSpinnner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  //useNavigate
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //función para crear
  const handleSubmit = (e) => {
    e.preventDefault();


    //validar los campos

    if (validateUserName(inputs.name) !== 'ok') {
      Swal.fire("Error!", `${validateUserName(inputs.name)}`, "error");
      return;
    } else if (validateEmail(inputs.email) !== 'ok') {
      Swal.fire("Error!", `${validateEmail(inputs.email)}`, "error");
      return;
    } else if (validatePassword(inputs.password) !== 'ok') {
      Swal.fire("Error!", `${validatePassword(inputs.password)}`, "error");
      return;
    } else if (validatePassword(inputs.passwordrep) !== 'ok') {
      Swal.fire("Error!", `${validatePassword(inputs.passwordrep)}`, "error");
      return;
    }




    //Enviar los datos
    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      passwordrep: inputs.passwordrep,
      roles: ['user'],
      activo: true
    };

    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setSpinnner(true)
          //la petición con Axios
          const res = await axios.post(`${URL}/register`, newUser);
          console.log(res);

          if (res.status === 201) {
            Swal.fire(
              "Excelente!",
              "Usuario creado con éxito",
              "success"
            );
            // resetear el formulario
            e.target.reset(); //el e.target en este caso por el submit es el form
            //recarga la tabla
            //getApi_users();
            //navega hasta la productsTable
            navigate("/user/table");
          }
        } catch (error) {
          console.log(error.response.data.errors);
          error.response.data?.message &&
            setErrorMessage(error.response.data?.message);
          error.response.data.errors?.length > 0 &&
            error.response.data.errors?.map((error) =>
              setErrorMessage(error.msg)
            );
          setShow(true);
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
        <h1>Agregar usuario</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>Nombre de usuario*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: John Doe"
              name="name"
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="text"
              placeholder="johndoe@gmail.com"
              name="email"
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su contraseña"
              name="password"
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            // onChange={({ target }) => setPrice(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordRep">
            <Form.Label>Repetir Contraseña*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Repita su contraseña"
              name="passwordrep"
              value={inputs.passwordrep || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>


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
        {show && (
          <Alert
            key={errorMessage}
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default UserCreate;
