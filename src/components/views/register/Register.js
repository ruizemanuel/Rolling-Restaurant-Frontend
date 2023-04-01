import React, { useState, useRef } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import emailjs from '@emailjs/browser';
import "./register.css"


const Register = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_USUARIO


  const handleResetValidation = () => {
    form.current.classList.remove('was-validated');
  };


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    handleResetValidation();

    if (name === "name" && /[^a-zA-Z\s]/.test(value)) {
      setErrorMessage("No se permiten números o símbolos como nombre de usuario");
    } else {
      setErrorMessage("");
    }

    setInputs((values) => ({ ...values, [name]: value }));
  };

  //useNavigate
  const navigate = useNavigate();


  const form = useRef();

  //Funcion para crear el producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    //validar los campos usando las validaciones de Bootstrap
    const isValidForm = form.current.checkValidity();
    form.current.classList.add('was-validated');

    if (!isValidForm) {
      return;

    }
    if (inputs.password !== inputs.passwordrep) {
      setErrorMessage("Las contraseñas no coinciden");
      setError(true);
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
      const res = await axios.post(`${URL}/register`, newUser);
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: '¡Bienvenido ' + inputs.name + '!',
          confirmButtonText: 'Ok',
          timer: 3000
        });
        
        // const data = await res.json(); // si es con fetch
        const data = res.data
        console.log(data);
        localStorage.setItem("user-token", JSON.stringify(data));
        setLoggedUser(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      error.response.data?.message && setErrorMessage(error.response.data?.message)
    }

    emailjs.sendForm('service_470nr1h', 'template_q5eze0c', form.current, 'SFzC0PALs3luZR9uq')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

  };

  return (
    <div>
      <Container className="registerContainer py-5">
        <h1 className="text-center">Register</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit} ref={form}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>User name <span>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Jose Paz"
              minLength="5"
              maxLength="40"
              name="name"
              required
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
              isInvalid={inputs.name && /[^a-zA-Z\s]/.test(inputs.name)}
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
              maxLength='45'
              name="email"
              required
              value={inputs.email || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su password"
              minLength='5'
              maxLength='18'
              name="password"
              required
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswordRep">
            <Form.Label>Repeat Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Repeat your password"
              minLength='5'
              maxLength='18'
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

          <div className="text-center">
            <button className="btnRegister">Registrarse</button>
          </div>

          <Link to="/auth/login" className="backHomeLink">
            Back to login
          </Link>
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
