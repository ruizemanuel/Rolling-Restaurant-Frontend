import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/axiosInit";
import logo from "./LogoRolling.png"
import "./navbar.css"
// import SearchComponent from "../helpers/SearchComponent";


const Navigation = ({ loggedUser, setLoggedUser }) => {

  const [roles, setRoles] = useState(loggedUser.roles);

  const navigate = useNavigate()
  console.log('LOGGED', loggedUser)

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
            <Nav className="ms-auto color-nav">
            <form class="d-flex mx-5">
          <input class="form-control me-2" type="search" placeholder="Buscar Menu" aria-label="Search"/>
          <button class="btn btn-light" type="submit">Buscar</button>
          {/* <SearchComponent />  */}
           </form>
         
              <Link className="nav-link" to="/">
                Home
              </Link>
              {loggedUser.token ? (
                <>
                  {roles?.includes('admin') ? (
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
