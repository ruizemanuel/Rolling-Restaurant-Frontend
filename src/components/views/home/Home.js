import React, { useState } from "react";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import CardProduct from "./cardProduct/CardProduct";
import AboutUs from "./AboutUs/AboutUs";
import Testimonials from "./Testimonials/Testimonial";
import CarouselHome from "./carouselHome/CarouselHome";
import ContactUs from "./ContactUs.js/ContactUs";

const Home = ({ products, spinner }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4
  const [selectedCategory, setSelectedCategory] = useState("Todas");


  const filteredProducts = selectedCategory === "Todas"
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

      {spinner ? (
        <div className="text-center fw-bold fs-4 d-flex justify-content-center align-items-center" style={{"padding": "150px 150px"}}>
        <div className="spinner-border me-2" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div>Cargando Menu...</div>
      </div>
      ) : (
        <Container className="py-5 ">
          <h1 className="display-3 text-center">Nuestro <span>Menu</span></h1>
          <hr />
          <Dropdown>
            <Dropdown.Toggle id="dropdowCategories">
              {selectedCategory.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className={` ${selectedCategory === "Todas" ? 'active' : ''}`}
                onClick={() => handleCategoryChange("Todas")}>
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
              <h1>🍕 No hay productos disponibles 🍕</h1>
            </div>
          )}
        </Container>
      )}


      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;
