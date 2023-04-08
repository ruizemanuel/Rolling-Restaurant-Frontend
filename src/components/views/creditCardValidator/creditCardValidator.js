import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { useCreditCardValidator } from 'react-creditcard-validator';
import { Alert, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../../../config/axiosInit';
import Swal from "sweetalert2";
import 'react-credit-cards-2/dist/es/styles-compiled.css';


const CreditCardValidator = () => {

  const URL = process.env.REACT_APP_API_HAMBURGUESERIA_PEDIDOS

  const { id } = useParams();
  const navigate = useNavigate()

  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    meta: { erroredInputs }
  } = useCreditCardValidator();


  const [numero, setNumero] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [focus, setFocus] = useState('');
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [spinnerEnviar, setSpinnnerEnviar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (erroredInputs.cardNumber) {
      setError(true)
      setErrorMessage(erroredInputs.cardNumber)
      return
    } else if (erroredInputs.expiryDate) {
      setError(true)
      setErrorMessage(erroredInputs.expiryDate)
      return
    } else if (erroredInputs.cvc) {
      setError(true)
      setErrorMessage(erroredInputs.cvc)
      return
    }

    const pedidoUpdated = {
      estado: "Pendiente"
    };

    try {
      setSpinnnerEnviar(true)

      const res = await axios.put(`${URL}/${id}`, pedidoUpdated)

      if (res.status === 200) {
        Swal.fire("Excelente!", "Estamos preparando tu pedido", "success");
        navigate("/pedidos");
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setSpinnnerEnviar(false)
    }



  };


  const handleInputChangeNumber = (evt) => {
    const { value } = evt.target;
    setNumero(value)
  }

  function clearNumber(value = "") {
    return value.replace(/\D+/g, "");
  }

  function formatExpirationDate(value) {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
    return clearValue;
  }

  const handleInputChangeDate = (evt) => {
    const { value } = evt.target;
    setExpiry(formatExpirationDate(value));

  }

  const handleInputChangeCvc = (evt) => {
    const { value } = evt.target;
    setCvc(value)
  }

  const handleInputChangeName = (evt) => {
    const { value } = evt.target;
    setName(value)
  }

  const handleInputFocus = (evt) => {
    setFocus(evt.target.name);
  }

  return (
    <div>
      <Container className="py-5 pedidosContainer">
        <Cards
          number={numero}
          expiry={expiry}
          cvc={cvc}
          name={name}
          focused={focus}
        />
        <div className='d-flex justify-content-center'>
          <Form className="my-3 w-30 d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Label>Numero de tarjeta*</Form.Label>
              <Form.Control
                {...getCardNumberProps({
                  value: numero,
                  onChange: handleInputChangeNumber,
                  onFocus: handleInputFocus
                })}
                required
              />

            </Form.Group>

            <div className='d-flex'>
              <Form.Group className="mb-3 me-5">
                <Form.Label>Fecha de vencimiento*</Form.Label>
                <Form.Control
                  {...getExpiryDateProps({
                    value: expiry,
                    onChange: handleInputChangeDate,
                    onFocus: handleInputFocus
                  })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>CVC*</Form.Label>
                <Form.Control
                  {...getCVCProps({
                    value: cvc,
                    onChange: handleInputChangeCvc,
                    onFocus: handleInputFocus
                  })}
                  required
                />
              </Form.Group>

            </div>

            <Form.Group className="mb-3">
              <Form.Label>Nombre en la tarjeta*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => handleInputChangeName(e)}
                onFocus={(e) => handleInputFocus(e)}
                required
                maxLength={50}
              />
            </Form.Group>

           
            {spinnerEnviar ? (

              <div className="text-center pt-3">
                <button class="btn-primary text-light" type="button" disabled>
                  <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                  Cargando...
                </button>

              </div>



            ) : (

              <div className="text-center pt-3">
              <button className="btn btn-primary">PAGAR</button>
            </div>
              

            )}
            


          </Form>

        </div>
        {error ? (
          <Alert variant="danger" onClick={() => setError(false)} dismissible>
            {errorMessage}
          </Alert>
        ) : null}

      </Container>

    </div>
  );
};

export default CreditCardValidator;
