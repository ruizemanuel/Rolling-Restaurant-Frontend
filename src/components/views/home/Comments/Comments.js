import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './comments.css';

function Comments() {
  return (
    <Carousel className="comments-carousel">
      <Carousel.Item className='box'>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="First slide"
        />
        <div className="comment-container">
          <img
            className="comment-avatar"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="First comment avatar"
          />
          <p className="comment-text">"Me encantó la comida y el servicio del restaurante. Lo recomiendo al 100%."</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1819669/pexels-photo-1819669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Second slide"
        />
        <div className="comment-container">
          <img
            className="comment-avatar"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Second comment avatar"
          />
          <p className="comment-text">"Un lugar muy acogedor y con una carta variada y deliciosa."</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Third slide"
        />
        <div className="comment-container">
          <img
            className="comment-avatar"
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Third comment avatar"
          />
          <p className="comment-text">"No me arrepiento de haber probado este restaurante. Todo estaba exquisito y el ambiente era muy agradable."</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Comments;