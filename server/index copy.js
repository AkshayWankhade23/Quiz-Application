// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');

// const app = express();
// const PORT = process.env.PORT || 3000;
// const secretKey = 'your_secret_key'; // Replace with a strong secret key for JWT

// const quizSchema = new mongoose.Schema({
//   quizName: String,
//   quizType: String,
//   numQuestions: Number,
//   questions: [{
//     question: String,
//     options: [String],
//     correctOption: Number,
//     optionType: String,
//     timer: String,
//   }],
// });

// const Quiz = mongoose.model('Quiz', quizSchema);

// // Connect to MongoDB (make sure MongoDB is running)
// mongoose.connect("mongodb+srv://admin:admin123@cluster0.bfvjyny.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'quizzzeeee' });
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define a schema for user data
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model('User', userSchema);

// // Middleware to parse JSON in request body
// app.use(bodyParser.json());
// app.use(cors());

// // API endpoint to register a new user
// app.post('/api/signup', async (req, res) => {
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
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Verify user credentials
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });

//     res.status(200).json({ success: true, userId: user._id, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// // Protected API endpoint that requires authentication
// app.get('/api/protected', authenticateToken, (req, res) => {
//   res.json({ success: true, data: 'This is a protected route' });
// });

// // Middleware to verify JWT token
// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ success: false, error: 'Access Denied' });

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.status(403).json({ success: false, error: 'Invalid Token' });

//     req.user = user;
//     next();
//   });
// }

// app.post('/api/saveQuiz', async (req, res) => {
//   try {
//     const quizData = req.body;

//     // Save quiz data to the database
//     const savedQuiz = await Quiz.create(quizData);
//     res.status(201).json({ success: true, quizId: savedQuiz._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
