import React, { useState } from "react";
import "./register.css";
import { Alert, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = ({ setLoggedUser }) => {
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
      roles: ["user", "admin"],
      activo: true,
    };
    try {
      /* const res = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }); */
      const res = await axios.post(`${URL}/register`, newUser);
      console.log(res);
      if (res.status === 201) {
        Swal.fire("Created!", "Your user has been created.", "success");
        // const data = await res.json(); // si es con fetch
        const data = res.data;
        console.log(data);
        localStorage.setItem("user-token", JSON.stringify(data));
        setLoggedUser(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      error.response.data?.message &&
        setErrorMessage(error.response.data?.message);
    }
  };

  return (
    <div className="cont">
      <div className="wrap">
        <Container className="py-3 formBox">
          <h2>Registro</h2>
          <Form className="my-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 inputBox" controlId="formBasicUserName">
              <Form.Label className="label">
                <AiOutlineUser />
                Nombre de usuario*
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: John Doe"
                name="name"
                value={inputs.name || ""}
                onChange={(e) => handleChange(e)}
                className="formInput"
              />
            </Form.Group>
            <Form.Group className="mb-3 inputBox" controlId="formBasicEmail">
              <Form.Label className="label">
                <AiOutlineMail />
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
                placeholder="Ej: Ingrese su password"
                name="password"
                value={inputs.password || ""}
                onChange={(e) => handleChange(e)}
                className="formInput"
              />
            </Form.Group>

            <Form.Group className="mb-3 inputBox" controlId="formBasicPasswordRep">
              <Form.Label className="label">
                <RiLockPasswordLine />
                Ingrese nuevamente la contraseña*
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ej: Repeat your password"
                name="passwordrep"
                value={inputs.passwordrep || ""}
                onChange={(e) => handleChange(e)}
                className="formInput"
              />
            </Form.Group>

            <Link to="/auth/login" className="btn-primary text-decoration-none">
              Back to login
            </Link>
            <div className="text-center btnSend">
              <button className="btn-yellow btnClass">Send</button>
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

export default Register;
