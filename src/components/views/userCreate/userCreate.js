import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  validateProductName,
  validateEmail,
  validatePassword
} from "../../helpers/validateFields";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axiosInit";

const UserCreate = ({ }) => {

  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_USUARIO

  //One general state
  const [inputs, setInputs] = useState({});
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
    if (

      !validateProductName(inputs.name) ||
      !validateEmail(inputs.email) ||
      !validatePassword(inputs.password) ||
      !validatePassword(inputs.passwordrep)
    ) {
      Swal.fire("Error", "Some data is invalid", "error");
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //la petición con Axios
          const res = await axios.post(`${URL}/register`, newUser);
          console.log(res);

          if (res.status === 201) {
            Swal.fire(
              "Created",
              "Your product has been created successfully",
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
          error.response.data.errors.length > 0 &&
            error.response.data.errors?.map((error) =>
              setErrorMessage(error.msg)
            );
          setShow(true);
        }
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Add User</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User name*</Form.Label>
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
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Ingrese su password"
              name="password"
              value={inputs.password || ""}
              onChange={(e) => handleChange(e)}
            // onChange={({ target }) => setPrice(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordRep">
            <Form.Label>Repeat Password*</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ej: Repeat your password"
              name="passwordrep"
              value={inputs.passwordrep || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <div className="text-end">
            <button className="btn-yellow">Save</button>
          </div>
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
