import React from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import User from "./User/User";

const UsersTable = ({ users, URL_usuarios, getApi_users }) => {
  return (
    <div>
      <Container className="py-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Users Table</h1>
          <Link
            to="/user/create"
            className="delete-btn text-decoration-none text-center"
          >
            Add User
          </Link>
        </div>
        <hr />
        {users?.length !== 0 ?
        <Table bordered hover responsive className="align-middle mt-3">
          <thead>
            <tr>
              <th>N.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <User
                key={user._id}
                user={user}
                URL_usuarios={URL_usuarios}
                getApi_users={getApi_users}
              />
            ))}
          </tbody>
        </Table>
        :
        <div className="no-products-found d-flex align-items-center justify-content-center">
          <h1>🍕 No se encontraron usuarios 🍕</h1>
          </div>
        }
      </Container>
    </div>
  );
};

export default UsersTable;
