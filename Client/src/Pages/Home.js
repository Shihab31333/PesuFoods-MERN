import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './Home.module.css';
import { api } from '../api';
import FoodCourt from '../images1/FoodCourt.jpg';
import Cantina from '../images1/Cantina.jpg';
import BengaluruKitchen from '../images1/BengalurKitchen.jpg';

const Home = () => {
  const [canteens, setCanteens] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { api.canteens().then(({ canteens: result }) => setCanteens(result)).catch((err) => setError(err.message)); }, []);
  return <div>
    <div className={classes['hero-section']}><div className={classes['hero-content']}><h1>Welcome to Our Canteen Hub</h1><p>Delicious food at your fingertips!</p></div></div>
    <Container className="py-4"><Row className="justify-content-center"><h2 className={classes['canteen-heading']}>Select a Canteen</h2></Row>
      {error && <p className="error">{error}</p>}
      <Row className={classes['canteen-images']}>{canteens.map((canteen) => {
        const images = { 'Bengaluru Kitchen': BengaluruKitchen, Cantina, 'Food Court': FoodCourt };
        return <Col key={canteen._id} xs={12} md={4} className={classes['canteen-container']}><Link to={`/canteen/${canteen._id}`}><img src={images[canteen.name] || '/images/palav.jpeg'} alt={canteen.name} className={classes['canteen-img']} /><p className={classes['canteen-name']}>{canteen.name}</p></Link></Col>;
      })}</Row>
    </Container>
  </div>;
};

export default Home;
