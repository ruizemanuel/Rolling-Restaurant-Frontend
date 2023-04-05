import React, { useState } from "react";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import CardProduct from "./cardProduct/CardProduct";
import AboutUs from "./AboutUs/AboutUs";
import Testimonials from "./Testimonials/Testimonial";
import CarouselHome from "./carouselHome/CarouselHome";
import ContactUs from "./ContactUs.js/ContactUs";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    event.preventDefault()
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
        <a href="/" className="page-link" id={number} onClick={handleClick}>
          {number}
        </a>
      </li>
    );
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reestablece a la pag 1 cuando cambia de categoria
  };

  return (
    <div>
      <CarouselHome />
      <AboutUs />

      <Container className="py-5 ">
        <h1 className="display-3 text-center">Nuestro <span>Menu</span></h1>
        <hr />
        <Dropdown>
          <Dropdown.Toggle id="dropdowCategories">
            {selectedCategory.toUpperCase()}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className={` ${selectedCategory === "All" ? 'active' : ''}`}
              onClick={() => handleCategoryChange("All")}>
              Todas
            </Dropdown.Item>
            <Dropdown.Item className={` ${selectedCategory === "bebidas" ? 'active' : ''}`}
              onClick={() => handleCategoryChange("bebidas")} >
              Bebidas
            </Dropdown.Item>
            <Dropdown.Item className={` ${selectedCategory === "pizza" ? 'active' : ''}`}
              onClick={() => handleCategoryChange("pizza")}>
              Pizzas
            </Dropdown.Item>
            <Dropdown.Item className={` ${selectedCategory === "hamburguesa" ? 'active' : ''}`}
              onClick={() => handleCategoryChange("hamburguesa")}>
              Hamburguesas
            </Dropdown.Item>
            <Dropdown.Item className={` ${selectedCategory === "taco" ? 'active' : ''}`}
              onClick={() => handleCategoryChange("taco")}>
              Tacos
            </Dropdown.Item>
            <Dropdown.Item className={` ${selectedCategory === "veganas" ? 'active' : ''}`}
              onClick={() => handleCategoryChange("veganas")}>
              Veganas
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>



        {currentItems?.length !== 0 ? (
          <Row>
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
