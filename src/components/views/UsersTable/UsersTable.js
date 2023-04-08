import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import User from "./User/User";
import axios from '../../../config/axiosInit'

const UsersTable = ({ }) => {

  const [users, setUsers] = useState([]);
  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_USERS;

  useEffect(() => {
    getApi()
  }, []);


  const getApi = async () => {
    try {
      const res = await axios.get(URL);
      const userApi = res?.data;

      setUsers(userApi);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <Container className="py-5 userContainer">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Administrar usuarios</h1>
          <Link
            to="/user/create"
            className="delete-btn text-decoration-none text-center"
          >
            Agregar usuario
          </Link>
        </div>
        <hr />
        {users?.length !== 0 ?
        <Table bordered hover responsive className="align-middle mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <User
                key={user._id}
                user={user}
                URL_usuarios={URL}
                getApi_users={getApi}
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
