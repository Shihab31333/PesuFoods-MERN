import React from 'react';
import { useParams } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import styles from './CanteenDetails.module.css';

const CanteenDetails = ({ data }) => {
    const { canteenId } = useParams();
    const canteen = data.canteens.find(c => c.id === parseInt(canteenId));

    // Fallback if canteen is not found
    if (!canteen) {
        return <div>Canteen not found.</div>;
    }

    return (
        <div className={styles['canteen-details']}>
            <h2>{canteen.name} Menu</h2>
            <div className={styles['menu-items']}>
                {canteen.menuItems.map(item => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CanteenDetails;
