import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  validateProductName,
  validatePrice,
  validateUrl,
  validateCategory,
} from "../../helpers/validateFields";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axiosInit";

const ProductCreate = ({ URL, getApi }) => {

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

      !validateProductName(inputs.productName) ||
      !validatePrice(inputs.price) ||
      !validateUrl(inputs.urlImg) ||
      !validateCategory(inputs.category)
    ) {
      Swal.fire("Oops!", "Some data is invalid", "error");
      return;
    }

    //Enviar los datos
    const newProduct = {
      /*productName,
      price,
      urlImg,
      category, */
      productName: inputs.productName,
      price: inputs.price,
      urlImg: inputs.urlImg,
      category: inputs.category,
      description:inputs.description,
      
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
          const res = await axios.post(URL, newProduct, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            },
          });
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
            getApi();
            //navega hasta la productsTable
            navigate("/product/table");
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
        <h1>Add Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              name="productName"
              value={inputs.productName || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              name="price"
              value={inputs.price || ""}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              name="urlImg"
              value={inputs.urlImg || ""}
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
              name="category"
              value={inputs.category || ""}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select an option</option>
              <option value="pizza">Pizza</option>
              <option value="hamburguesa">Hamburguesa</option>
              <option value="taco">Tacos</option>
              <option value="veganas">Veganas</option>
              <option value="bebidas">Bebidas</option>
              <option value="postre">Postre</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-primary text-light">Save</button>
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

export default ProductCreate;
