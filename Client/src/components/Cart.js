import React, { useState } from 'react'; 
import { useCart } from 'react-use-cart';
import './Cart.css';
import { generateUPILink } from './upiIntegration';

const isValidUPI = (upiId) => {
    const upiPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
    return upiPattern.test(upiId);
};

const Cart = () => {
    const [upiID, setUpiID] = useState('');
    const [showModal, setShowModal] = useState(false);
    const {
        isEmpty,
        totalUniqueItems,
        totalItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        emptyCart,
    } = useCart();

    if (isEmpty) return <h2>Your cart is empty</h2>;

    const handleCheckout = () => {
        if (!isValidUPI(upiID)) {
            alert("Please enter a valid UPI ID");
            return;
        }
        
        const upiLink = generateUPILink(upiID, cartTotal, 'Food Order Payment');
        window.location.href = upiLink;
        emptyCart();
    };

    const confirmCheckout = () => {
        setShowModal(true);
    };

    const handleModalClose = (confirm) => {
        if (confirm) {
            handleCheckout();
        }
        setShowModal(false);
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <h3>Total Items: {totalItems}</h3>
            <h3>Total Unique Items: {totalUniqueItems}</h3>
            <div className="cart-items">
                {items.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.img} alt={item.name} className="cart-item-image" />
                        <div className="item-details">
                            <h4 className="item-title">{item.name}</h4>
                            <p className="item-price">Price: ₹{item.price}</p>
                            <p className="item-quantity">Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-actions">
                            <button className="btn-increment" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                            <button className="btn-decrement" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                            <button className="btn-remove" onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="total">Total: ₹{cartTotal}</h2>
            <button className="clear-cart" onClick={emptyCart}>Clear Cart</button>
            
            <input 
                type="text" 
                className="upi-input" 
                placeholder="Enter UPI ID" 
                value={upiID} 
                onChange={(e) => setUpiID(e.target.value)} 
                required 
            />
            <button className="checkout-button" onClick={confirmCheckout}>Order Now</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Payment</h3>
                        <p>Total Amount: ₹{cartTotal}</p>
                        <p>UPI ID: {upiID}</p>
                        <button className="modal-btn" onClick={() => handleModalClose(true)}>Confirm</button>
                        <button className="modal-btn" onClick={() => handleModalClose(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
