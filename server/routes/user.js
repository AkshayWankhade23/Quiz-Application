// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// // API endpoint to register a new user
// router.post('/signup', async (req, res) => {
//   // Implementation
//   try {
//     const { name, email, password } = req.body;

//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, error: 'Email already exists' });
//     }

//     // Save user data to the database
//     const newUser = await User.create({ name, email, password });

//     // Generate JWT token
//     const token = jwt.sign({ userId: newUser._id, email: newUser.email }, secretKey, { expiresIn: '1h' });

//     res.status(201).json({ success: true, userId: newUser._id, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// // API endpoint to authenticate a user and get a new JWT token
// router.post('/login', async (req, res) => {
//   // Implementation
//   try {
//     const { email, password } = req.body;

//     // Verify user credentials
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1d' });

//     res.status(200).json({ success: true, userId: user._id, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// // Protected API endpoint that requires authentication
// router.get('/protected', authenticateToken, (req, res) => {
//   // Implementation
//   res.json({ success: true, data: 'This is a protected route' });
// });

// // Middleware to verify JWT token
// function authenticateToken(req, res, next) {
//   // Implementation
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ success: false, error: 'Access Denied' });

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.status(403).json({ success: false, error: 'Invalid Token' });

//     req.user = user;
//     next();
//   });
// }

// module.exports = router;
