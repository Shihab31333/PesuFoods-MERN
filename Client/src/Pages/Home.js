import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './Home.module.css';
import FoodCourt from '../images1/FoodCourt.jpg';
import Cantina from '../images1/Cantina.jpg';
import BengaluruKitchen from '../images1/BengalurKitchen.jpg';

const Home = () => {
  const canteens = [
    {
      id: 1,
      name: "Bengaluru Kitchen",
      img: BengaluruKitchen,
    },
    {
      id: 2,
      name: "Cantina",
      img: Cantina,
    },
    {
      id: 3,
      name: "FoodCourt",
      img: FoodCourt,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className={classes['hero-section']}>
        <div className={classes['hero-content']}>
          <h1>Welcome to Our Canteen Hub</h1>
          <p>Delicious food at your fingertips!</p>
          {/* <Button variant="primary" size="lg" className={classes['hero-button']}>
            Explore Now
          </Button> */}
        </div>
      </div>
      
      {/* Canteens Section */}
      <Container className="py-4">
        <Row className="justify-content-center">
          <h2 className={classes['canteen-heading']}>Select a Canteen</h2>
        </Row>
        <Row className={classes['canteen-images']}>
          {canteens.map((canteen) => (
            <Col key={canteen.id} xs={12} md={4} className={classes['canteen-container']}>
              <Link to={`/canteen/${canteen.id}`}>
                <img 
                  src={canteen.img} 
                  alt={canteen.name} 
                  className={classes['canteen-img']} 
                />
                <p className={classes['canteen-name']}>{canteen.name}</p>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
