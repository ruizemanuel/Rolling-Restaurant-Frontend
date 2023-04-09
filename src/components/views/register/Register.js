import React, { useState, useRef } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import emailjs from '@emailjs/browser';
import {
  validateUserName,
  validateEmail,
  validatePassword
} from "../../helpers/validateFields";
import "./register.css"


const Register = () => {
  const [inputs, setInputs] = useState({});
  const [spinner, setSpinnner] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_USUARIO


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  //useNavigate
  const navigate = useNavigate();


  const form = useRef();

  //Funcion para crear el producto
  const handleSubmit = async (e) => {
    e.preventDefault();

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


    //Envio los datos para guardarlos
    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      passwordrep: inputs.passwordrep,
      roles: ['user'],
      activo: true
    };
    try {

      setSpinnner(true)
      const res = await axios.post(`${URL}/register`, newUser);

      if (res.status === 201) {
        const templateParams = {
          user_name: inputs.name,
          destinatario: inputs.email
        };

        emailjs.send('service_r0td7ag', 'template_21lr24a', templateParams, '_Dh8QUgAk-H_cjr0m')
          .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function (error) {
            console.log('FAILED...', error);
          });
        Swal.fire("Excelente!", "Ya puedes iniciar sesión con tu email y contraseña.", "success");

        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      error.response.data?.message && setErrorMessage(error.response.data?.message)
    }
    finally {
      setSpinnner(false)
    }

  };

  return (
    <div>
      <Container className="registerContainer py-5">
        <h1 className="text-center">Registro</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit} ref={form}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>Nombre de usuario <span>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Jose Paz"
              minLength="5"
              maxLength="100"
              name="name"
              required
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
              isInvalid={inputs.name && !/^[A-Za-z\s?]+$/.test(inputs.name)}
            />
            <Form.Control.Feedback type="invalid">
              No se permiten números o simbolos como nombre de usuario
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              placeholder="jose@gmail.com"
              minLength='5'
              maxLength='100'
              name="email"
              required
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su contraseña"
              minLength='8'
              maxLength='20'
              name="password"
              required
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswordRep">
            <Form.Label>Repetir Contraseña*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Repita su contraseña"
              minLength='8'
              maxLength='20'
              name="passwordrep"
              required
              value={inputs.passwordrep || ""}
              onChange={(e) => handleChange(e)}
            />
            {inputs.passwordrep &&
              inputs.password !== inputs.passwordrep && (
                <Form.Control.Feedback type="invalid">
                  Las contraseñas no coinciden
                </Form.Control.Feedback>
              )}

          </Form.Group>
          {spinner ? (

            <div className="text-center">
              <button class="btn-primary text-light" type="button" disabled>
                <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                Cargando...
              </button>
            </div>

          ) : (
            <div className="text-center">
              <button className="btnRegister">Registrarse</button>
            </div>
          )}

          {spinner ? (
            <div></div>
          ) : (
            <Link to="/auth/login" className="backHomeLink">
              Ir a Iniciar sesión
            </Link>
          )}

        </Form>
        {error ? (
          <Alert variant="danger" onClick={() => setError(false)} dismissible>
            {errorMessage}
          </Alert>
        ) : null}
      </Container>
    </div>
  );
};

export default Register;
