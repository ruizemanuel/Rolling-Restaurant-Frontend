import { useEffect, useRef, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  validateCategory,
  validateDescription,
  validatePrice,
  validateProductName,
  validateUrl,
} from "../../helpers/validateFields";
import axios from "../../../config/axiosInit"

const ProductEdit = ({ URL, getApi }) => {
  //State
  const [product, setProduct] = useState({});
  const [spinner, setSpinnner] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  //Param
  const { id } = useParams();
  //References
  const productNameRef = useRef('');
  const priceRef = useRef('');
  const descriptionRef = useRef('');
  const urlImgRef = useRef('');
  //Navigate
  const navigate = useNavigate();

  //llamado a la Api para obtener el producto por su id

  useEffect(() => {
    getOne();
  }, []);

  const getOne = async () => {
    try {
      //la peticion con fetch
      /* const res = await fetch(`${URL}/${id}`);
      const productApi = await res.json(); */

      //la peticion con Axios
      const res = await axios.get(`${URL}/${id}`);
      const productApi = res.data;
      setProduct(productApi);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(productNameRef.current.value);
    //valido los campos
    if (
      !validateProductName(productNameRef.current.value) ||
      !validatePrice(priceRef.current.value) ||
      !validateDescription(descriptionRef.current.value) ||
      !validateUrl(urlImgRef.current.value) ||
      !validateCategory(product.category)
    ) {
      Swal.fire("Ops!", "Some data is invalid.", "error");
      console.log(validateDescription(descriptionRef.current.value))
      return;
    }
    //guardar el objeto
    const productUpdated = {
      productName: productNameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      urlImg: urlImgRef.current.value,
      category: product.category,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setSpinnner(true)
          /* const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productUpdated),
          }); */

          //const res = await axios.put(`${URL}/${id}`,productUpdated);

          const res = await axios.put(`${URL}/${id}`, productUpdated, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            },
          });



          console.log(res.data);

          if (res.status === 200) {
            Swal.fire("Updated!", "Your file has been updated.", "success");
            getApi();
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
        <h1>Edit Product</h1>
        <hr />
        {/* Form Product */}
        <Form
          className="my-5"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: burger"
              defaultValue={product.productName}
              ref={productNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              defaultValue={product.price}
              ref={priceRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Inserte la descripción del producto"
              defaultValue={product.description}
              ref={descriptionRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              defaultValue={product.urlImg}
              ref={urlImgRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
              value={product.category}
              onChange={({ target }) => setProduct({ ...product, category: target.value })}
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



          {spinner ? (

            <div className="text-end">
              <button class="btn-primary text-light" type="button" disabled>
                <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                Loading...
              </button>
            </div>

          ) : (

            <div className="text-end">
            <button className="btn-primary">Actualizar</button>
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

export default ProductEdit;
