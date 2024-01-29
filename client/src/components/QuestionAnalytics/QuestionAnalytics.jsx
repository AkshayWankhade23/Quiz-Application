import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./Style.module.css";

const QuestionAnalytics = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiztype, setQuiztype] = useState(null);
  const [currentquiz, setCurrentquiz] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store userId in localStorage

        // Fetch quizzes with impressions
        const quiz = await axios.get(
          `http://localhost:3000/api/quiz/getquiz/${quizId}`
        );
        const fetchedquiz = quiz.data.quiz;
        console.log(fetchedquiz);
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
    <div className={style.container}>
      <h2>{currentquiz.quizName} Question Analysis</h2>
      <p className={style.red}>Created on: {currentquiz.date}</p>
      <br />
      <p className={style.red}>Impressions: {currentquiz.impressionofQuiz}</p>
      {quiztype === "poll" ? (
        <>
          <ul>
            {questions.map((questionInfo, index) => (
              <li key={index}>
                <p>
                  Q.{index + 1} : {questionInfo.question}
                </p>
                {questionInfo.options.map((opt, optIndex) => (
                  // Add a return statement here
                  <p key={optIndex}>
                    No of people opted for Option {optIndex + 1} is{" "}
                    {opt.impressionofOption}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {questions.map((questionInfo, index) => (
            <li key={index}>
              <p className={style.question_info}>
                Q.{index + 1}  {questionInfo.question}
              </p>
              <div className={style.cards_container}>
                <div className={style.cards}>
                  <h4 className={style.value}> {questionInfo.impressionofQuestion} </h4>
                  <p className={style.text}>People Attempted Question</p>
                </div>
                <div className={style.cards}>
                  <h4 className={style.value} >{questionInfo.answeredCorrectly}</h4>
                  <p className={style.text}> Answered Correctly </p>
                </div>
                <div className={style.cards}>
                  <h4 className={style.value}>
                    {questionInfo.impressionofQuestion -
                      questionInfo.answeredCorrectly}
                  </h4>
                  <p className={style.text}>Answered Incorrectly</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionAnalytics;
