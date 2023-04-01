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
      <Container className="py-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Products Table</h1>

          {spinner ? (

            <div className="btn-primary text-decoration-none text-center text-light">
              Add Product
            </div>

          ) : (
            <Link
              to="/product/create"
              className="btn-primary text-decoration-none text-center text-light"
            >
              Add Product
            </Link>

          )}
        </div>
        <hr />
        {/* Table of products */}


        {products?.length !== 0 ?

          spinner ? (

            <div class="text-center" >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>

          ) : (

            <Table bordered hover responsive className="align-middle mt-3">
              <thead>
                <tr>
                  <th>N.</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image url</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Actions</th>
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
            <h1>🍕 No products found 🍕</h1>
          </div>
        }
      </Container >
    </div >
  );
};

export default ProductsTable;
