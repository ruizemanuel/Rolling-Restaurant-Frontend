import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/axiosInit";

const Navigation = ({ loggedUser, setLoggedUser }) => {

  const [roles, setRoles] = useState([]);

  const URL_USUARIOS = process.env.REACT_APP_API_HAMBURGUESERIA_USERS;

  const navigate = useNavigate()
  console.log('LOGGED', loggedUser)

  useEffect(() => {
    getUsers();
  }, [loggedUser]);

  const getUsers = async () => {
    try {

      const response = await axios.get(URL_USUARIOS);
      // console.log(res?.data);
      const usersApi = response?.data;
      let elementoEncontrado = usersApi.find(elemento => elemento._id === loggedUser.uid);
      console.log('ROLES', elementoEncontrado.roles)
      setRoles(elementoEncontrado.roles)



    } catch (error) {
      console.log(error);
    }
  };

  roles.includes('admin') && localStorage.setItem("is-authorized", JSON.stringify('true'));



  const logout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("is-authorized");
    setLoggedUser({})
    setRoles([])
    navigate("/")
  }

  return (
    <div>
      <Navbar className="bg-red" expand="lg">
        <Container>
          <Navbar.Brand className="logo" href="/">
            Rolling Restaurant
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto color-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              {loggedUser.token ? (
                <>
                  {roles.includes('admin') ? (
                    <>
                      <Link className="nav-link" to="/product/table">
                        Manage Products
                      </Link>

                      <Link className="nav-link" to="/user/table">
                        Manage Users
                      </Link>

                      <Link className="nav-link" to="/pedidos/table">
                        Manage Pedidos
                      </Link>
                    </>

                  ) : (
                    <div></div>
                  )
                  }

                  <>
                    <Link className="nav-link" to="/pedidos">
                      Pedidos
                    </Link>

                    <Button variant="dark" onClick={logout}>
                      Logout
                    </Button>
                  </>



                </>
              ) : (
                <>
                  <Link className="nav-link" to="/auth/login">
                    Login
                  </Link>
                  <Link className="nav-link" to="/auth/register">
                    Register
                  </Link>
                </>

              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
