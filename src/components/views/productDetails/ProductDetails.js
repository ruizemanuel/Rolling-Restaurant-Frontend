import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../../../config/axiosInit";
import Swal from "sweetalert2";
import "./productDetail.css"

const ProductDetails = ({ URL }) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const URL_PEDIDOS = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS
  const email = JSON.parse(localStorage.getItem("user-token"))?.email
  const location = useLocation()
  const { borrar } = location.state



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

  const getApi_pedidos = async () => {
    try {

      const res = await axios.post(`${URL_PEDIDOS}/pedido`, {
        email
      });
      const pedidoApi = res?.data;

      return pedidoApi
    } catch (error) {
      console.log(error);
    }
  };

  const handlePedido = async (e) => {
    e.preventDefault();
    if (email === undefined) {
      Swal.fire("Error!", "Inicia sesion para hacer un pedido", "error");
      navigate("/auth/login");
    } else {

      const pedidoBuscado = await getApi_pedidos()

      if (pedidoBuscado === null) {
        const newPedido = {
          pedido: { "productName": `${product.productName}`, "price": `${product.price}` },
          email: email,
          estado: "-",
          total: product.price
        };

        try {
          const res = await axios.post(URL_PEDIDOS, newPedido);
          if (res.status === 201) {
            Swal.fire("Listo!", "Revisa la sección Pedidos.", "success");
            borrar()
            localStorage.setItem("pedido", JSON.stringify(newPedido));
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }

      } else {



        const pedidoUpdated = {
          pedido: [...pedidoBuscado.pedido, { "productName": `${product.productName}`, "price": `${product.price}` }],
          email: email,
          estado: "-",
          total: pedidoBuscado.total + product.price
        };

        try {

          const res = await axios.put(`${URL_PEDIDOS}/${pedidoBuscado._id}`, pedidoUpdated)

          if (res.status === 200) {
            Swal.fire("Actualizado!", "Tu carrito ha sido actualizado.", "success");
            borrar()
            localStorage.setItem("pedido", JSON.stringify(pedidoUpdated));
            navigate("/");
          }
        } catch (error) {
          console.log(error);
        }

      }
    }



  };

  return (
    <Container className="productDetailContainer">
      <Row>
        <Col className="card-img">
          <Card className="my-4 ">
            <Card.Img
              className="img-fluid"
              variant="top"
              src={product.urlImg}
              id='img-pedido'
            />
          </Card>
        </Col>
        <Col>
          <Card className="my-4 card-desc">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <Card.Title className="m-0 text-truncate">
                  {product.productName}
                </Card.Title>
                <span className="badge bg-yellow">New</span>
              </div>
              <Card.Text>
                {product.description}
              </Card.Text>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ms-4 fs-4 ">${product.price}</p>

                <Button className="btn-gray text-decoration-none text-center" onClick={handlePedido}>
                  Comprar
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
