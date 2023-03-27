import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardProduct from "./cardProduct/CardProduct";
import AboutUs from "./AboutUs/AboutUs"
import Testimonials from "./Testimonials/Testimonial"
import CarouselHome from "./carouselHome/CarouselHome";
import ContactUs from "./ContactUs.js/ContactUs"

const Home = ({ products }) => {
  return (
    <div>
      <CarouselHome />
      <AboutUs />

      <Container className="py-5">
        <h1>Products</h1>
        <hr />
        {products?.length !== 0 ?
          <Row>
            {products?.map((product, index) => (
              <Col key={index} xl={3} lg={4} md={6}>
                <CardProduct product={product} />
              </Col>
            ))}
          </Row>
          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            <h1>🍕 No products found 🍕</h1>
          </div>
        }
      </Container>
      <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link" href="/" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="/Error404">1</a></li>
    <li class="page-item"><a class="page-link" href="/Error404">2</a></li>
    <li class="page-item"><a class="page-link" href="/Error404">3</a></li>
    <li class="page-item">
      <a class="page-link" href="/Error404">Next</a>
    </li>
  </ul>
</nav>
      <Testimonials />
      <ContactUs/>
      
    </div>
  );
};

export default Home;
