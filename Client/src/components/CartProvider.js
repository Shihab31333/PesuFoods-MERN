import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api';

const CartContext = React.createContext(null);
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState('');
    const refresh = useCallback(async () => {
        if (!localStorage.getItem('token')) {
            setCart(null);
            return;
        }
        try { setCart((await api.cart()).cart); } catch (err) { setError(err.message); }
    }, []);
    useEffect(() => { refresh(); }, [refresh]);

    const run = async (operation) => {
        setError('');
        try { const result = await operation(); setCart(result.cart); return result; } catch (err) { setError(err.message); throw err; }
    };
    const value = useMemo(() => ({
        cart, error, refresh,
        items: cart?.items || [],
        totalItems: (cart?.items || []).reduce((sum, item) => sum + item.quantity, 0),
        cartTotal: (cart?.items || []).reduce((sum, item) => sum + item.price * item.quantity, 0),
        addItem: (item) => run(() => api.addToCart(item._id || item.id)),
        updateItemQuantity: (id, quantity) => run(() => api.updateCartItem(id, quantity)),
        removeItem: (id) => run(() => api.removeCartItem(id)),
        emptyCart: () => run(() => api.clearCart()),
    }), [cart, error, refresh]);
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
