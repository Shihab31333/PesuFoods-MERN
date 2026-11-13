import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import styles from './CanteenDetails.module.css';
import { api } from '../api';

const CanteenDetails = () => {
    const { canteenId } = useParams();
    const [canteen, setCanteen] = useState(null);
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        Promise.all([api.request(`/canteens/${canteenId}`), api.menu(canteenId)])
            .then(([canteenResponse, menuResponse]) => { setCanteen(canteenResponse.canteen); setItems(menuResponse.items); })
            .catch((err) => setError(err.message));
    }, [canteenId]);
    if (error) return <div className="error">{error}</div>;
    if (!canteen) return <div>Loading menu...</div>;
    return (
        <div className={styles['canteen-details']}>
            <h2>{canteen.name} Menu</h2>
            <div className={styles['menu-items']}>{items.map((item) => <MenuItem key={item._id} item={item} />)}</div>
        </div>
    );
};

export default CanteenDetails;
