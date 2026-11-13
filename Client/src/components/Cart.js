import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from './CartProvider';
import './Cart.css';

const Cart = () => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const { items, totalItems, updateItemQuantity, removeItem, cartTotal, emptyCart } = useCartContext();
    const navigate = useNavigate();
    if (!items.length) return <h2>Your cart is empty</h2>;
    const handleCheckout = async () => {
        try {
            const { api } = await import('../api');
            const result = await api.order();
            setMessage(`Simulated payment successful. Order ${result.order._id} is confirmed.`);
            setShowModal(false);
            navigate('/myaccount');
        } catch (error) {
            setMessage(error.message);
        }
    };
    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <h3>Total Items: {totalItems}</h3>
            <div className="cart-items">{items.map((item) => (
                <div key={item.menuItem} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="item-details"><h4 className="item-title">{item.name}</h4><p className="item-price">Price: ₹{item.price}</p><p className="item-quantity">Quantity: {item.quantity}</p></div>
                    <div className="item-actions">
                        <button className="btn-increment" onClick={() => updateItemQuantity(item.menuItem, item.quantity + 1)}>+</button>
                        <button className="btn-decrement" onClick={() => item.quantity > 1 && updateItemQuantity(item.menuItem, item.quantity - 1)}>-</button>
                        <button className="btn-remove" onClick={() => removeItem(item.menuItem)}>Remove</button>
                    </div>
                </div>
            ))}</div>
            <h2 className="total">Total: ₹{cartTotal}</h2>
            <button className="clear-cart" onClick={emptyCart}>Clear Cart</button>
            <button className="checkout-button" onClick={() => setShowModal(true)}>Order Now</button>
            {message && <p className="error">{message}</p>}
            {showModal && <div className="modal"><div className="modal-content">
                <h3>Confirm simulated payment</h3><p>Total Amount: ₹{cartTotal}</p><p>No real payment will be processed.</p>
                <button className="modal-btn" onClick={handleCheckout}>Confirm</button>
                <button className="modal-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div></div>}
        </div>
    );
};

export default Cart;
