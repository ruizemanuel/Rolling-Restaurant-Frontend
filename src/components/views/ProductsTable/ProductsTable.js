import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "./Product/Product";

const ProductsTable = ({ products, URL, getApi }) => {

  const [spinner, setSpinnner] = useState(false);



  const getSpinner = (spinner) => {
    setSpinnner(spinner)
  };


  return (
    <div>
      <Container className="py-5 containerTable">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Administrar Menú</h1>

          {spinner ? (

            <div className="btn-primary text-decoration-none text-center text-light">
              Agregar un Menú
            </div>

          ) : (
            <Link
              to="/product/create"
              className="btn-primary text-decoration-none text-center text-light"
            >
              Agregar un Menú
            </Link>

          )}
        </div>
        <hr />
        {/* Table of products */}


        {products?.length !== 0 ?

          spinner ? (

            <div class="text-center " >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>

          ) : (

            <Table bordered hover responsive className="align-middle mt-3 ">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>URL de la imagen</th>
                  <th>Categoría</th>
                  <th className="product-description">Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>


                {products?.map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    URL={URL}
                    getApi={getApi}
                    getSpinner={getSpinner}
                  />
                ))}


              </tbody>
            </Table>

          )



          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            {/* No products found message */}
            <h1>🍕 No hay productos disponibles 🍕</h1>
          </div>
        }
      </Container >
    </div >
  );
};

export default ProductsTable;
