import React from 'react';
import { useCart } from 'react-use-cart';

export const CartContext = React.createContext(); // Create the context

export const useCartContext = () => React.useContext(CartContext); // Custom hook to use the context

const CartProvider = ({ children }) => {
    const {
        isEmpty,
        totalUniqueItems,
        totalItems,
        cartTotal,
        items,
        addItem,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    return (
        <CartContext.Provider
            value={{
                isEmpty,
                totalUniqueItems,
                totalItems,
                cartTotal,
                items,
                addItem,
                updateItemQuantity,
                removeItem,
                emptyCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
