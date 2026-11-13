import React, { useState } from 'react';
import { useCartContext } from './CartProvider';
import './MenuItem.css';

const MenuItem = ({ item }) => {
    const { addItem, error } = useCartContext();
    const [isAdded, setIsAdded] = useState(false);
    const handleAddToCart = () => {
        if (!localStorage.getItem('token')) {
            setIsAdded(false);
            return;
        }
        addItem(item).then(() => setIsAdded(true)).catch(() => {});
        setTimeout(() => setIsAdded(false), 2000);
    };
    return (
        <div className="menu-item">
            <img src={item.image || item.img || '/images/palav.jpeg'} alt={item.name} className="menu-item-image" />
            <h5 className="menu-item-name">{item.name}</h5>
            <p className="menu-item-price">₹{item.price}</p>
            <div className="add-to-cart-container">
                <button onClick={handleAddToCart} className="add-to-cart-button">{isAdded ? 'Added!' : 'Add to Cart'}</button>
                {isAdded && <p className="success-message">Item added to cart!</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default MenuItem;
