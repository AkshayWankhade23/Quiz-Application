const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz");
const requireAuth = require("../middlewares/requireAuth");

router.post("/saveQuiz", async (req, res) => {
  try {
    const quizData = req.body;

    // Ensure that userId is properly set to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizData.userId)) {
      return res.status(400).json({ success: false, error: "Invalid userId" });
    }

    // Save quiz data to the database
    const savedQuiz = await Quiz.create(quizData);
    res.status(201).json({ success: true, quizId: savedQuiz._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/quizCount/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure that userId is properly set to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: "Invalid userId" });
    }

    const quizCount = await Quiz.countDocuments({ userId });
    res.json({ success: true, quizCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/questionCount/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure that userId is properly set to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: "Invalid userId" });
    }

    const userQuizzes = await Quiz.find({ userId });
    const questionCount = userQuizzes.reduce(
      (total, quiz) => total + quiz.numQuestions,
      0
    );
    res.json({ success: true, questionCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/quizzesWithImpressions/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Ensure that userId is properly set to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: "Invalid userId" });
    }

    // Fetch quizzes with impressions
    const quizzes = await Quiz.find({ userId }).select("-questions.options"); // Exclude options for brevity

    res.json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getquiz/:quizId", async (req, res) => {
  try {
    const _id = req.params.quizId;

    // Ensure that _id is properly set to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ success: false, error: "Invalid quizId" });
    }

    // Fetch quizzes with impressions
    const quiz = await Quiz.findOne({ _id });
    res.json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/updateQuiz", async (req, res) => {
  try {
    const quiz = req.body.quizData;
    if (!quiz._id) {
      return res.status(400).json({ error: "Quiz ID is required" });
    }

    // Ensure that quiz._id is properly set to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quiz._id)) {
      return res.status(400).json({ success: false, error: "Invalid quizId" });
    }

    const result = await Quiz.findByIdAndUpdate(
      quiz._id,
      { $set: quiz },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete a quiz by its ID
router.delete("/deleteQuiz/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Ensure that quizId is properly set to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ success: false, error: "Invalid quizId" });
    }

    // Find the quiz by ID and delete it
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH endpoint for updating a quiz
router.patch("/editQuiz/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { questions } = req.body;

    // Ensure that quizId is properly set to a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ success: false, error: "Invalid quizId" });
    }

    // Find the quiz by quizId in the database
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    // Update only the questions and options values
    quiz.questions = questions;

    // Save the updated quiz
    const updatedQuiz = await quiz.save();

    // Send success response with updated quiz data
    res.status(200).json({ success: true, updatedQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

