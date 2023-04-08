import React, { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  validateProductName,
  validatePrice,
  validateDescription,
  validateUrl,
  validateCategory,
} from "../../helpers/validateFields";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axiosInit";

const ProductCreate = ({ URL, getApi }) => {

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

    if (validateProductName(inputs.productName) !== 'ok') {
      Swal.fire("Error!", `${validateProductName(inputs.productName)}`, "error");
      return;
    } else if(validatePrice(inputs.price) !== 'ok'){
      Swal.fire("Error!", `${validatePrice(inputs.price)}`, "error");
      return;
    } else if(validateDescription(inputs.description) !== 'ok'){
      Swal.fire("Error!", `${validateDescription(inputs.description)}`, "error");
      return;
    } else if(validateUrl(inputs.urlImg) !== 'ok'){
      Swal.fire("Error!", `${validateUrl(inputs.urlImg)}`, "error");
      return;
    } else if(validateCategory(inputs.category) !== 'ok'){
      Swal.fire("Error!", `${validateCategory(inputs.category)}`, "error");
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
      description: inputs.description,
      urlImg: inputs.urlImg,
      category: inputs.category,
      description: inputs.description,

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
              "Agregado",
              "Plato creado exitosamente",
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
          console.log(error.response.data.message);
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
        <h1>Agregar Plato</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Café"
              name="productName"
              value={inputs.productName || ""}
              onChange={(e) => handleChange(e)}
              required
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Precio*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              name="price"
              value={inputs.price || ""}
              onChange={(e) => handleChange(e)}
              required
              maxLength={6}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Inserte la descripción del producto"
              name="description"
              value={inputs.description || ""}
              onChange={(e) => handleChange(e)}
              required
              maxLength={200}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>URL de la imagen*</Form.Label>
            <Form.Control
              type="text"
              name="urlImg"
              value={inputs.urlImg || ""}
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Categoría*</Form.Label>
            <Form.Select
              name="category"
              value={inputs.category || ""}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Selecciona una categoría</option>
              <option value="pizza">Pizza</option>
              <option value="hamburguesa">Hamburguesa</option>
              <option value="taco">Tacos</option>
              <option value="veganas">Veganas</option>
              <option value="bebidas">Bebidas</option>
              <option value="postre">Postre</option>
            </Form.Select>
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

export default ProductCreate;
