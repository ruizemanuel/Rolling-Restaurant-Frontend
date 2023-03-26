import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/views/home/Home";
import Navigation from "./components/layouts/Navigation";
import Footer from "./components/layouts/Footer";
import ProductsTable from "./components/views/ProductsTable/ProductsTable";
import ProductCreate from "./components/views/productCreate/ProductCreate";
import ProductEdit from "./components/views/productEdit/ProductEdit";
import Error404 from "./components/views/error404/Error404";
import Login from "./components/views/login/Login";
import Register from "./components/views/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./config/axiosInit";
import ProductDetails from "./components/views/productDetails/ProductDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import UsersTable from "./components/views/UsersTable/UsersTable";
import UserCreate from "./components/views/userCreate/userCreate";
import UserEdit from "./components/views/userEdit/userEdit";
import PedidosTable from "./components/views/PedidosTable/PedidosTable";
import PedidosTableAdmin from "./components/views/PedidosTableAdmin/PedidosTableAdmin";
import PedidoAdminEdit from "./components/views/PedidoAdminEdit/PedidoAdminEdit";

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loggedUser, setLoggedUser] = useState(localStorage.getItem('user-token') ? JSON.parse(localStorage.getItem("user-token")) : {});
  //const [roles, setRoles] = useState([]);
  //uso de variable de entorno
  const URL = process.env.REACT_APP_API_HAMBURGUESERIA;
  const URL_usuarios = process.env.REACT_APP_API_HAMBURGUESERIA_USERS;
  const URL_usuarios_alta = process.env.REACT_APP_API_HAMBURGUESERIA_USUARIO
  const URL_pedidos = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS


  //const URL_USUARIOS = process.env.REACT_APP_API_HAMBURGUESERIA_USERS;

  console.log('LOGGED DESDE APP', loggedUser)


  useEffect(() => {
    getApi();
    getApi_users()
    getApi_pedidos()
  }, []);

  const getApi = async () => {
    try {
      /* const res = await fetch(URL);
      const productApi = await res.json();
      setProducts(productApi); */

      const res = await axios.get(URL);
      // console.log(res?.data);
      const productApi = res?.data;

      setProducts(productApi);
    } catch (error) {
      console.log(error);
    }
  };

  const getApi_users = async () => {
    try {
      /* const res = await fetch(URL);
      const productApi = await res.json();
      setProducts(productApi); */

      const res = await axios.get(URL_usuarios);
      // console.log(res?.data);
      const userApi = res?.data;

      setUsers(userApi);
    } catch (error) {
      console.log(error);
    }
  };

  const getApi_pedidos = async () => {
    try {
      /* const res = await fetch(URL);
      const productApi = await res.json();
      setProducts(productApi); */

      const res = await axios.get(URL_pedidos);
      // console.log(res?.data);
      const pedidoApi = res?.data;

      setPedidos(pedidoApi);
    } catch (error) {
      console.log(error);
    }
  };

  // const getUsers = async () => {
  //   try {

  //     const response = await axios.get(URL_USUARIOS);
  //     // console.log(res?.data);
  //     const usersApi = response?.data; 
  //     let elementoEncontrado = usersApi?.find(elemento => elemento._id === loggedUser.uid);
  //     setRoles(elementoEncontrado.roles)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <BrowserRouter>
        <Navigation loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        <main>
          <Routes>
            <Route exact path="/" element={<Home products={products} />} />
            <Route
              exact
              path="/*"
              element={
                <ProtectedRoute loggedUser={loggedUser}>
                  <Routes>
                    <Route
                      exact
                      path="/product/table"
                      element={
                        <ProductsTable
                          products={products}
                          URL={URL}
                          getApi={getApi}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/product/create"
                      element={<ProductCreate URL={URL} getApi={getApi} />}
                    />
                    <Route
                      exact
                      path="/product/edit/:id"
                      element={<ProductEdit URL={URL} getApi={getApi} />}
                    />

                    <Route
                      exact
                      path="/user/table"
                      element={
                        <UsersTable
                          users={users}
                          URL_usuarios={URL_usuarios}
                          getApi_users={getApi_users}
                        />
                      }
                    />

                    <Route
                      exact
                      path="/user/create"
                      element={<UserCreate URL_usuarios_alta={URL_usuarios_alta} getApi_users={getApi_users} />}
                    />

                    <Route
                      exact
                      path="/user/edit/:id"
                      element={<UserEdit URL_usuarios_alta={URL_usuarios} getApi_users={getApi_users} />}
                    />

                    <Route
                      exact
                      path="/pedidos/table"
                      element={
                        <PedidosTableAdmin
                          pedidos={pedidos}
                          URL={URL_pedidos}
                          getApi={getApi_pedidos}
                        />
                      }
                    />

                    <Route
                      exact
                      path="/pedido/edit/:id"
                      element={
                        <PedidoAdminEdit
                        URL={URL_pedidos}
                        getApi={getApi_pedidos}
                        />
                      }
                    />

                  </Routes>
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/product/buy/:id"
              element={<ProductDetails URL={URL} pedidos={pedidos} />}
            />
            <Route
              exact
              path="/pedidos"
              element={<PedidosTable
                pedidos={pedidos}
                URL={URL_pedidos}
                getApi={getApi_pedidos}
              />}
            />
            <Route
              exact
              path="/auth/login/"
              element={<Login setLoggedUser={setLoggedUser} />}
            />
            <Route exact path="/auth/register/" element={<Register setLoggedUser={setLoggedUser} />} />
            <Route exact path="*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
