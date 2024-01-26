// const mongoose = require('mongoose');

// const quizSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   quizName: String,
//   quizType: String,
//   numQuestions: Number,
//   questions: [
//     {
//       question: String,
//       options: [String],
//       correctOption: Number,
//       optionType: String,
//       timer: String,
//       impressionofQuestion: {
//         type: Number,
//         default: 0,
//       },
//       answeredCorrectly: {
//         type: Number,
//         default: 0,
//       },
//     },
//   ],
//   impressionofQuiz: Number,
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Quiz = mongoose.model('Quiz', quizSchema);

// module.exports = Quiz;
