import React, { useState } from "react";
import "./login.css";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = ({ setLoggedUser }) => {
  const [inputs, setInputs] = useState({});
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
      /* const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      }); */
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
  };

  return (
    <div className="cont">
      <div className="wrapper">
        <Container className="py-5 form-box">
          <h2>Iniciar Sesión</h2>
          <Form className="my-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 inputBox" controlId="formBasicEmail">
              <Form.Label className="label">
                <MdEmail />
                Email*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="johndoe@gmail.com"
                name="email"
                value={inputs.email || ""}
                onChange={(e) => handleChange(e)}
                className="formInput"
              />
            </Form.Group>
            <Form.Group className="mb-3 inputBox" controlId="formBasicPassword">
              <Form.Label className="label">
                <RiLockPasswordLine />
                Contraseña*
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ej: Ingrese su contraseña"
                name="password"
                value={inputs.password || ""}
                onChange={(e) => handleChange(e)}
                className="formInput"
              />
            </Form.Group>
            <Link
              to="/auth/register"
              className="btn-primary text-decoration-none regNewUser"
            >
              Registrar usuario nuevo
            </Link>
            <div className="text-center btnSend">
              <button className="btn-yellow btnClass">Ingresar</button>
            </div>
          </Form>
          {error ? (
            <Alert variant="danger" onClick={() => setError(false)} dismissible>
              {errorMessage}
            </Alert>
          ) : null}
        </Container>
      </div>
    </div>
  );
};

export default Login;
