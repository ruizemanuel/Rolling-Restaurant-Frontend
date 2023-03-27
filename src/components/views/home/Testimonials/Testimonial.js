import React from 'react';
import { Carousel, Card } from 'react-bootstrap';
import './Testimonial.css';

const testimonials = [
    {
        name: 'Juan Perez',
        photo: 'https://img.freepik.com/foto-gratis/retrato-hombre-blanco-aislado_53876-40306.jpg?w=1060&t=st=1679359393~exp=1679359993~hmac=c6e4942ab2caa4dc9d122a2250bab1c062eaa614fe73956461585a6fb6667c21',
        position: 'Cliente frecuente',
        testimonial: '"¡Excelente comida y servicio! Recomiendo este restaurante a todos mis amigos y familiares."'
    },
    {
        name: 'Mario Gomez',
        photo: 'https://img.freepik.com/foto-gratis/retrato-chef-sonriente-uniforme_329181-675.jpg?w=1380&t=st=1679359889~exp=1679360489~hmac=d2dbdbb6d59802ac5bb251c694eb42fb398ca4a594eb137c914191ff1fddf1bc',
        position: 'Chef',
        testimonial: '"Como chef, puedo decir que este restaurante tiene una calidad excepcional en sus platos. Definitivamente volveré."'
    },
    {
        name: 'Ana Garcia',
        photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        position: 'Comensal',
        testimonial: '"La atención al cliente es excepcional, y la comida es simplemente deliciosa. ¡Lo recomiendo!"'
    },
    {
        name: 'David Torres',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        position: 'Comensal',
        testimonial: ' "Me encantó el ambiente del restaurante y la comida es excelente. Volveré definitivamente."'
    }
];

const TestimonialsSection = () => {
    return (
        <Carousel className="testimonials-carousel">
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index}>
            <Card className='card-testimonial'>
              <Card.Body>
                <img className="testimonial-photo" src={testimonial.photo} alt={testimonial.name} />
                <Card.Title className='testimonial-name'>{testimonial.name}</Card.Title>
                <Card.Subtitle className='testimonial-subtitle'>{testimonial.position}</Card.Subtitle>
                <Card.Text className='testimonial-text'>{testimonial.testimonial}</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    );
};

export default TestimonialsSection;
