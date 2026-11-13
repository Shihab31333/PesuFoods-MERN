# PESUFOODS

PESUFOODS is a MERN campus-canteen ordering application. The React client uses a modular Express/Mongoose API for authentication, catalog browsing, persistent carts, stock-safe orders, and simulated payment confirmation.

## Structure

- `backend/config`: database connection
- `backend/controllers`: HTTP request handlers
- `backend/models`: User, Canteen, Menu, Cart, and Order schemas
- `backend/routes`: REST resources under `/api`
- `backend/services`: catalog initialization and order business logic
- `backend/middleware`: JWT and centralized error handling
- `Client/src`: CRA frontend and API client

## Setup

1. Install MongoDB. A local MongoDB server is sufficient for catalog and cart development.
2. Copy `backend/.env.example` to `backend/.env` and set a private `JWT_SECRET`.
3. Copy `Client/.env.example` to `Client/.env` if the API is not at `http://localhost:5000/api`.
4. Install dependencies and start each application:

```powershell
cd backend
npm install
npm start

cd ..\Client
npm install
npm start
```

The backend seeds the three existing canteens and their menu items on startup. Menu prices and stock are always read from MongoDB; client-supplied totals are ignored.

## API

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | No | Create a user |
| POST | `/api/auth/login` | No | Return a JWT |
| GET | `/api/auth/account` | JWT | Return the current user |
| GET | `/api/canteens` | No | List canteens |
| GET | `/api/canteens/:id` | No | Get one canteen |
| GET | `/api/canteens/:canteenId/menu` | No | List available menu items |
| GET | `/api/menu/:id` | No | Get one menu item |
| GET | `/api/search?q=term` | No | Search available items |
| GET | `/api/cart` | JWT | Get the current cart |
| POST | `/api/cart/items` | JWT | Add an item |
| PATCH | `/api/cart/items/:menuItemId` | JWT | Change quantity |
| DELETE | `/api/cart/items/:menuItemId` | JWT | Remove an item |
| DELETE | `/api/cart` | JWT | Clear the cart |
| POST | `/api/orders` | JWT | Place a simulated-payment order |
| GET | `/api/orders` | JWT | List the user's orders |

All responses use `{ success, ... }`; failures use `{ success: false, error }`.

## Ordering guarantees

The cart stores a single canteen reference and rejects additions from other canteens until the cart is cleared. Order placement uses a MongoDB transaction and `findOneAndUpdate` with `stock >= quantity`, so concurrent requests cannot oversell stock. The order also uses an `Idempotency-Key` to make repeated submissions safe. Transactions require MongoDB replica-set or sharded deployment; configure a local replica set when testing order rollback/concurrency. A standalone MongoDB instance will reject the transaction rather than silently claim rollback support.

Payment is deliberately simulated. Checkout reserves stock and creates an order with `paymentStatus: SIMULATED`; no payment provider or real money movement is involved.

## Testing

```powershell
cd backend
npm test

cd ..\Client
npm test -- --watchAll=false
npm run build
```
