import React from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import './AboutUs.css';

function AboutUs() {
    return (
        <section id="about-us" className="py-5">
            <Container>
                        <h1 className='text-center'> <span>About</span> Us</h1>
                <Row id='rowAbout'>
                    <Col md={6}>
                        <Image className='imageRestaurant' src="https://images.pexels.com/photos/4913313/pexels-photo-4913313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Rolling Restaurant" fluid rounded />
                    </Col>
                    <Col md={6}>
                        <p>Rolling Restaurant es un negocio familiar que lleva más de 20 años sirviendo deliciosa comida a la comunidad. Nuestro restaurante es conocido por su mezcla única de sabores e ingredientes de alta calidad, todo ello servido en un ambiente cálido y acogedor.</p>
                    </Col>
                </Row>
                <Row id='rowAbout'>
                    <Col md={6}>
                        <h2>Trabajo en equipo</h2>
                        <p>
                            En Rolling, creemos en la importancia del trabajo en equipo para
                            brindar la mejor experiencia gastronómica a nuestros clientes.
                            Desde nuestro chef hasta nuestro personal de servicio, todos
                            trabajamos juntos para ofrecer platos deliciosos y un servicio de
                            calidad.
                        </p>
                    </Col>
                    <Col md={6}>
                        <Image className='imageRestaurant'
                            src="https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            fluid rounded
                        />
                    </Col>
                </Row>
                
            </Container>
        </section>
    );
}

export default AboutUs;
