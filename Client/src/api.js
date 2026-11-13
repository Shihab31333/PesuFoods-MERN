const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const request = async (path, options = {}) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
};

export const api = {
    request,
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
    account: () => request('/auth/account'),
    canteens: () => request('/canteens'),
    menu: (id, search = '') => request(`/canteens/${id}/menu${search ? `?search=${encodeURIComponent(search)}` : ''}`),
    search: (term) => request(`/search?q=${encodeURIComponent(term)}`),
    cart: () => request('/cart'),
    addToCart: (menuItemId, quantity = 1) => request('/cart/items', { method: 'POST', body: JSON.stringify({ menuItemId, quantity }) }),
    updateCartItem: (id, quantity) => request(`/cart/items/${id}`, { method: 'PATCH', body: JSON.stringify({ quantity }) }),
    removeCartItem: (id) => request(`/cart/items/${id}`, { method: 'DELETE' }),
    clearCart: () => request('/cart', { method: 'DELETE' }),
    order: () => request('/orders', { method: 'POST', headers: { 'Idempotency-Key': `${Date.now()}-${Math.random()}` } }),
};
