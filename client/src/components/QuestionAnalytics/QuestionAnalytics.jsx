import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionAnalytics = () => {
    const {quizId} = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiztype,setQuiztype] = useState(null);
  const [currentquiz, setCurrentquiz] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store userId in localStorage

        // Fetch quizzes with impressions
        const quiz = await axios.get(`http://localhost:3000/api/getquiz/${quizId}`);
        const fetchedquiz = quiz.data.quiz;
        console.log(fetchedquiz)
        setQuiztype(fetchedquiz.quizType);
        setCurrentquiz(fetchedquiz);
        setQuestions(fetchedquiz.questions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      Created on {currentquiz.date}   has impressions  {currentquiz.impressionofQuiz}
      {quiztype === "poll" ?
      <>
        <ul>
        {questions.map((questionInfo, index) => (
        <li key={index}>
          <p>Q.{index + 1} : {questionInfo.question}</p>
          {questionInfo.options.map((opt, optIndex) => (
            // Add a return statement here
            <p key={optIndex}>No of people opted for Option {optIndex+1} is {opt.impressionofOption}</p>
          ))}
        </li>
      ))}

      </ul>
      </>
      :
      <ul>
        {questions.map((questionInfo,index) => (
          <li key={index}>
            <p>Q.{index+1} : {questionInfo.question}</p>
            <p>People Attempted Question : {questionInfo.impressionofQuestion}</p>
            <p>Answered Correctly : {questionInfo.answeredCorrectly}</p>
            <p>Answered Incorrectly : {questionInfo.impressionofQuestion-questionInfo.answeredCorrectly}</p>
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default QuestionAnalytics;
