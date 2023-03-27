import { useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "../../../config/axiosInit"

const UserEdit = ({ URL_usuarios_alta, getApi_users }) => {
  //State
  //const [user, setUser] = useState(false);
  const [userAdmin, setUserAdmin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  //References
  let rolesRef = [];

  //Param
  const { id } = useParams();



  //Navigate
  const navigate = useNavigate();

  //llamado a la Api para obtener el usuario por su id

  useEffect(() => {
    getOne();
  }, []);

  const getOne = async () => {
    try {
      //la peticion con fetch
      //  const res = await fetch(`${URL}/${id}`);
      // const userApi = await res.json(); 

      //la peticion con Axios
      const res = await axios.get(`${URL_usuarios_alta}/${id}`);
      const userApi = res.data;
      //setUser(userApi)
      userApi.roles.includes('admin') && setUserAdmin(true);
      setIsChecked(userApi.activo)
      rolesRef = userApi.roles

    } catch (error) {
      console.log(error);
    }
  };

  
  console.log('CHECKED', isChecked)
  
  // if(user.roles.includes('admin')){
  //   rolesRef.current = true
  // }

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    
  };

  const handleChangeAdmin = (event) => {
    setUserAdmin(event.target.checked)   
  };



 

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(productNameRef.current.value);

    if(userAdmin){
      rolesRef = ["user", "admin"]
    } else{
      rolesRef = ["user"]
    }

    //guardar el objeto
    const userUpdated = {
      activo: isChecked,
      roles: rolesRef,
    };

    console.log('ROLESREF', userUpdated)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          /* const res = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productUpdated),
          }); */

          const res = await axios.put(`${URL_usuarios_alta}/${id}`, userUpdated, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": JSON.parse(localStorage.getItem("user-token"))
                .token,
            },
          });


          console.log(res.data);

          if (res.status === 200) {
            Swal.fire("Updated!", "Your file has been updated.", "success");
            getApi_users();
            navigate("/user/table");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <Container className="py-5">
        <h1>Edit User</h1>
        <hr />
        {/* Form Product */}
        <Form
          className="my-5"
          onSubmit={handleSubmit}
        >
          <div className="d-flex text-center">

            <div className="me-4">
              Estado
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={isChecked}
                onChange={(e) => handleChange(e)} id="defaultCheck1" />
              {isChecked ? (
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Activo
                </label>)
                : (
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Inactivo
                  </label>
                )}
            </div>

          </div>

          <div className="d-flex text-center">


            <div className="me-4">
              Es Admin
            </div>


            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={userAdmin}
                onChange={(e) => handleChangeAdmin(e)} id="defaultCheck2" />
              {userAdmin ? (
                <label className="form-check-label" htmlFor="defaultCheck2">
                  Es admin
                </label>)
                : (
                  <label className="form-check-label" htmlFor="defaultCheck2">
                    No es admin
                  </label>
                )}
            </div>

          </div>




          <div className="text-end">
            <button className="update-btn">Update</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default UserEdit;





{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select
             value={product.category}
             onChange={({ target })=> setProduct({...product, category: target.value })}
            >
              <option value="">Select an option</option>
              <option value="de-carne">de Carne</option>
              <option value="de-cerdo">de Cerdo</option>
              <option value="de-pollo">de Pollo</option>
              <option value="veganas">Veganas</option>
              <option value="bebidas">Bebidas</option>
              <option value="postre">Postre</option>
            </Form.Select>
          </Form.Group> */}