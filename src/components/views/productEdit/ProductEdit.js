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



    if (validateProductName(productNameRef.current.value) !== 'ok') {
      Swal.fire("Error!", `${validateProductName(productNameRef.current.value)}`, "error");
      return;
    } else if(validatePrice(priceRef.current.value) !== 'ok'){
      Swal.fire("Error!", `${validatePrice(priceRef.current.value)}`, "error");
      return;
    } else if(validateDescription(descriptionRef.current.value) !== 'ok'){
      Swal.fire("Error!", `${validateDescription(descriptionRef.current.value)}`, "error");
      return;
    } else if(validateUrl(urlImgRef.current.value)  !== 'ok'){
      Swal.fire("Error!", `${validateUrl(urlImgRef.current.value) }`, "error");
      return;
    } else if(validateCategory(product.category) !== 'ok'){
      Swal.fire("Error!", `${validateCategory(product.category)}`, "error");
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
      title: "¿Estas seguro?",
      text: "No podrás revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Modificar",
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
            Swal.fire("Excelente!", "Plato actualizado", "success");
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
        <h1>Modificar Plato</h1>
        <hr />
        {/* Form Product */}
        <Form
          className="my-5"
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: burger"
              defaultValue={product.productName}
              ref={productNameRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Precio*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 50"
              defaultValue={product.price}
              ref={priceRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Inserte la descripción del producto"
              defaultValue={product.description}
              ref={descriptionRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>URL de la imagen*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              defaultValue={product.urlImg}
              ref={urlImgRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Categoría*</Form.Label>
            <Form.Select
              value={product.category}
              onChange={({ target }) => setProduct({ ...product, category: target.value })}
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
            <button className="btn-primary text-light">Actualizar</button>
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
