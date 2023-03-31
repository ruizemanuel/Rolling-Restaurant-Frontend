import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";

const Login = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
  const [spinner, setSpinnner] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_USUARIO;


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //useNavigate
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    //Valido los campos

    //Envio los datos
    try {
      setSpinnner(true)
      const res = await axios.post(`${URL}/login`, {
        email: inputs.email,
        password: inputs.password,
      });

      

      if (res.status === 200) {



        Swal.fire("Logged!", "Your user has been logged.", "success");
        //const data = await res.json(); //si es con fetch
        const data = res.data;
        console.log(data);




        //guardar en localStorage el token
        localStorage.setItem("user-token", JSON.stringify(data));
        setLoggedUser(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      error.response.data?.message &&
        setErrorMessage(error.response.data.message);
    }

    finally {
      setSpinnner(false)
    }
  };

  return (
    <div>
      <Container className="py-5 loginContainer">
        <h1>Login</h1>
        <hr />
        <Form className="my-5" onSubmit={handleSubmit}>
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
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su password"
              name="password"
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Link
            to="/auth/register"
            className="btn btn-warning text-decoration-none"
          >
            Register new user
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
              <button className="btn-primary">Ingresar</button>
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

export default Login;
