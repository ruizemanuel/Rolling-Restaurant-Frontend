import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../../config/axiosInit";
import Swal from "sweetalert2";

const ProductDetails = ({ URL, pedidos }) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const URL_PEDIDOS = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS
  const uid = JSON.parse(localStorage.getItem("user-token")).uid
  const pedidoBuscado = pedidos.find((pedido) => pedido.uid === uid);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const res = await fetch(`${URL}/${id}`);
      const productApi = await res.json();
      setProduct(productApi);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePedido = async (e) => {
    e.preventDefault();
    console.log('HOLA DESDE DETALLE',pedidoBuscado);

    if(pedidoBuscado === undefined){
      const newPedido = {
        pedido: {"productName": `${product.productName}`, "price": `${product.price}`},
        uid: uid,
        estado: "-"
      };

      console.log("DESDE PEDIDO", newPedido)

    try {
      /* const res = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }); */
      const res = await axios.post(URL_PEDIDOS, newPedido);
      console.log(res);
      if (res.status === 201) {
        Swal.fire("Created!", "Your pedido has been created.", "success");
        // const data = await res.json(); // si es con fetch
        const data = res.data 
        console.log(data);
        //localStorage.setItem("user-token", JSON.stringify(data));
        //setLoggedUser(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      error.response.data?.message && setErrorMessage(error.response.data?.message)
    }
  
    } else{
      /////////////////////////////////////////////////

      //const pedidoBuscado = pedidos.find((pedido) => pedido.uid === uid);

      console.log('PEDIDO BUSCADO'. pedidoBuscado)

      const pedidoUpdated = {
        pedido: [ ...pedidoBuscado.pedido, {"productName": `${product.productName}`, "price": `${product.price}`} ]
      };

    try {
      /* const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productUpdated),
      }); */

      //const res = await axios.put(`${URL}/${id}`,productUpdated);

      const res = await axios.put(`${URL_PEDIDOS}/${pedidoBuscado._id}`, pedidoUpdated)
        
      console.log(res.data);
      
      if (res.status === 200) {
        Swal.fire("Updated!", "Your pedido has been updated.", "success");
        //getApi();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }

    //////////////////////////////////////////////////////
    }

    
    


    

  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className="my-4">
            <Card.Img
              className="img-fluid"
              variant="top"
              src={product.urlImg}
            />
          </Card>
        </Col>
        <Col>
          <Card className="my-4">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Card.Title className="m-0 text-truncate">
                  {product.productName}
                </Card.Title>
                <span className="badge bg-yellow">New</span>
              </div>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                id, voluptate necessitatibus ex eius sunt!
              </Card.Text>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ms-4 fs-4 ">${product.price}</p>

                <Button className="btn-gray text-decoration-none text-center" onClick={handlePedido}>
                  Buy
                </Button>



              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
