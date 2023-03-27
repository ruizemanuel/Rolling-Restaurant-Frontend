import React from "react";
import "./contact-us.css";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import {
    faMapMarkerAlt,
    faEnvelope,
    faClock,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

function ContactUs() {
    const position = [-26.8241, -65.2226]; // San Miguel de Tucumán
    return (
        <div className="container-fluid bg-light p-5">
            <Row>
                <Col className="text-center">
                    <h1> <span>Contact</span> Us</h1>
                    <p className="lead">¿Como podemos ayudarte?</p>
                </Col>
            </Row>
            <div className="container-fluid bg-light py-5 ">
                <iframe
                    className="mapa"
                    title="Mapa de San Miguel de Tucumán"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1809.928400078756!2d-65.22187689999999!3d-26.818611599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456820a384bbd5%3A0x2f07722b9e03278d!2sLas%20Heras%20221%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1648071622745!5m2!1ses-419!2sar"
                    height="400"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            <Container className="contactUsbox">
                <Row className="mb-5">
                    <Col xs={12} md={6} lg={5} xl={3} className="colInfo">
                        <div className="boxInfo py-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className=" px-4 icono" />
                            <div className="info ms-4">
                                <h4>Ubicacion</h4>
                                <p>Las Heras 221</p>
                                <p>San Miguel de Tucuman</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={5} xl={3} className="colInfo">
                        <div className="boxInfo py-2">
                            <FontAwesomeIcon icon={faEnvelope} size="2x" className=" px-4 icono" />
                            <div className="info ms-4">
                                <h4>Email</h4>
                                <p>Rollinfood@gmail.com</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={5} xl={3} className="colInfo">
                        <div className="boxInfo py-2">
                            <FontAwesomeIcon icon={faPhone} size="2x" className=" px-4 icono" />
                            <div className="info ms-4">
                                <h4>Celular</h4>
                                <p>(381) 456-7890</p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={5} xl={3} className="colInfo">
                        <div className="boxInfo py-2">
                            <FontAwesomeIcon icon={faClock} size="2x" className=" px-4  icono" />
                            <div className="info ms-4">
                                <h4> Horarios</h4>
                                <p>Lun-Vier</p>
                                <p>9:00-20:00</p>
                            </div>
                        </div>
                    </Col>
                </Row>


                <Row>
                    <div className="col-md-12">
                        <div id="contact-form">

                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="Email"
                                        className="form-control"
                                        placeholder="Email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Celular"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        placeholder="Mensaje"
                                        rows="5"
                                        required
                                    ></textarea></div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">
                                        Enviar
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>

    )
}
export default ContactUs      
