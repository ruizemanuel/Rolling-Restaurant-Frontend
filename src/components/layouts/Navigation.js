import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "./LogoRolling.png"
import "./navbar.css"
import SearchBar from "./SearchBar";


const Navigation = ({ loggedUser, setLoggedUser, products }) => {

  const [roles, setRoles] = useState(loggedUser.roles);

  const navigate = useNavigate()

  useEffect(() => {
    getUsers();
  }, [loggedUser]);

  const getUsers = async () => {

    setRoles(loggedUser.roles)

  };

  roles?.includes('admin') && localStorage.setItem("is-authorized", JSON.stringify('true'));



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
            <img src={logo} alt="logo" className="logo"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto color-nav mx-4">

              <div className="mx-5 d-lg-flex flex-lg-column justify-content-lg-center d-sm-flex justify-content-sm-center d-flex justify-content-center">
                <SearchBar placeholder="Buscar..." data={products} />
              </div>


              <Link className="nav-link d-flex flex-column justify-content-center mx-2" to="/">
                Inicio
              </Link>
              {loggedUser.email ? (
                <>
                  {roles?.includes('admin') ? (
                    <NavDropdown title="Administrar" id="administrar-dropdown">
                    <Link className="dropdown-item" to="/product/table">
                      Menu
                    </Link>
                    <Link className="dropdown-item" to="/user/table">
                      Usuarios
                    </Link>
                    <Link className="dropdown-item" to="/pedidos/table">
                      Pedidos
                    </Link>
                  </NavDropdown>

                  ) : (
                    <div></div>
                  )
                  }

                  <>
                    <Link className="nav-link d-flex flex-column justify-content-center mx-2" to="/pedidos">
                      Pedidos
                    </Link>

                    <div className="d-flex flex-column justify-content-center mx-3">
                      <Button variant="dark" onClick={logout}>
                        Cerrar sesión
                      </Button>
                    </div>

                  </>



                </>
              ) : (
                <>
                  <Link className="nav-link d-flex flex-column justify-content-center" to="/auth/login">
                    Inciar sesión
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
