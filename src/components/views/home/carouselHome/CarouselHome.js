import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselHome = () => {
  return (
    <div>
      <Carousel id="carousel">
        <Carousel.Item id="carousel">
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="hamburguesa"
          />
          <Carousel.Caption className="text-danger">
            <h3>The best burger!</h3>
            <p>Enjoy an unforgettable taste.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1611250188496-e966043a0629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
            alt="pancakes"
          />
          <Carousel.Caption className="text-danger">
            <h3>Sabores que te transportan directamente a México.</h3>
            <p>"Deléitate con los mejores tacos de la ciudad"</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.pexels.com/photos/10790638/pexels-photo-10790638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="pizza"
          />
          <Carousel.Caption className="text-danger">
            <h3>¡Las mejores pizzas están aquí!</h3>
            <p> ¡Prueba nuestra selección de ingredientes frescos y masa artesanal hoy mismo!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselHome;
