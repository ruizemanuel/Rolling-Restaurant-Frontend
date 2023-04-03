import React, { useState } from "react";
import { Alert, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../config/axiosInit";
import "./login.css"
import logo from "./Logo.png"

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
        if(data.roles.includes('admin')){
          localStorage.setItem("user-token", JSON.stringify(data));
          setLoggedUser(data); 
        } else{
          delete data['token'];
          localStorage.setItem("user-token", JSON.stringify(data));
          setLoggedUser(data);
        }


        
        
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
      <Container className="loginContainer">
        <Row>
          <Col className="imgLogin">
          </Col>
          <Col className="formLogin py-5">
            <div ><img src={logo} className="logoLogin pt-3"></img></div>
            <h1 className="text-center">Login</h1>
            <hr />
            <Form className="my-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@mail.com"
                  name="email"
                  value={inputs.email || ""}
                  onChange={(e) => handleChange(e)}
                  required
                  maxLength={48}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*****"
                  name="password"
                  value={inputs.password || ""}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <div className="text-center py-3">
                <button className="btn-login">Ingresar</button>
              </div>
              <div className="text-center"> <p>No tienes cuenta? <Link
                to="/auth/register"
                className="btn-register">
                <span className="registerLink">Registrate</span>

              </Link> </p></div>

            </Form>
            {error ? (
              <Alert variant="danger" onClick={() => setError(false)} dismissible>
                {errorMessage}
              </Alert>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
