import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardProduct from "./cardProduct/CardProduct";
import AboutUs from "./AboutUs/AboutUs";
import Testimonials from "./Testimonials/Testimonial";
import CarouselHome from "./carouselHome/CarouselHome";
import ContactUs from "./ContactUs.js/ContactUs";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    event.preventDefault()
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} className="page-item">
        <a
          href="/"
          className="page-link"
          id={number}
          onClick={handleClick}
        >
          {number}
        </a>
      </li>
    );
  });

  return (
    <div>
      <CarouselHome />
      <AboutUs />

      <Container className="py-5 ">
        <h1>Products</h1>
        <hr />
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
          >
            <a
              href="/"
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </a>
          </li>
          {renderPageNumbers}
          <li
            className={`page-item ${currentPage === Math.ceil(products.length / itemsPerPage)
              ? "disabled"
              : ""
              }`}
          >
            <a
              href="/"
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>

        {currentItems?.length !== 0 ? (
          <Row>
            {currentItems?.map((product, index) => (
              <Col key={index} sm={4} xl={3} lg={4} md={6}>
                <CardProduct product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="no-products-found d-flex align-items-center justify-content-center">
            <h1>🍕 No products found 🍕</h1>
          </div>
        )}
      </Container>
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;
