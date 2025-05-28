const express = require('express');
const cors = require('cors');
const mongoose = require('./config'); // Import mongoose connection
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // User model

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'mySuperSecretKey'; // Hardcoded secret key

app.use(cors());
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
    const { name, usermail, password } = req.body;

    try {
        const existingUser = await User.findOne({ usermail });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, usermail, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { usermail, password } = req.body;

    try {
        const user = await User.findOne({ usermail });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch user account details
app.get('/account', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ error: 'User not logged in' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
