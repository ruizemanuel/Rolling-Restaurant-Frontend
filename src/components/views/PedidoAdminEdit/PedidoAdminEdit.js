import { useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "../../../config/axiosInit"

const PedidoAdminEdit = ({ URL, getApi }) => {
  //State
  //const [user, setUser] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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
      const res = await axios.get(`${URL}/${id}`);
      const pedidoApi = res.data;
      //setUser(userApi)
      if(pedidoApi.estado === 'Pendiente'){
        setIsChecked(false)
      } else{
        setIsChecked(true)
      }
     
      

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

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log(productNameRef.current.value);

    //guardar el objeto
    const pedidoUpdated = {
      estado: isChecked ? "Realizado" : "Pendiente",
    };

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

          const res = await axios.put(`${URL}/${id}`, pedidoUpdated);

          console.log(res.data);

          if (res.status === 200) {
            Swal.fire("Updated!", "Your pedido has been updated.", "success");
            getApi();
            navigate("/pedidos/table");
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
        <h1>Edit Pedido</h1>
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
                  Realizado
                </label>)
                : (
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Pendiente
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

export default PedidoAdminEdit;





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