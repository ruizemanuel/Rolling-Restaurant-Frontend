import React, { useState, useRef } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import emailjs from '@emailjs/browser';


const Register = ({ setLoggedUser }) => {
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
    console.log(inputs);
    //Valido los campos

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
      /* const res = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }); */
      setSpinnner(true)
      const res = await axios.post(`${URL}/register`, newUser);
      console.log(res);
      if (res.status === 201) {
        Swal.fire("Created!", "Your user has been created.", "success");
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

    finally {
      setSpinnner(false)
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
      <Container className="py-5">
        <h1>Register</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit} ref={form}>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: John Doe"
              minLength='5'
              maxLength='20'
              name="name"
              required
              value={inputs.name || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="text"
              placeholder="johndoe@gmail.com"
              minLength='5'
              maxLength='30'
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
          </Form.Group>


          <Link to="/auth/login" className="btn btn-info text-decoration-none">
            Back to login
          </Link>

          {spinner ? (

            <div className="text-center">
              <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
            </div>

          ) : (

            <div className="text-center">
              <button className="btn-primary">Send</button>
            </div>

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
