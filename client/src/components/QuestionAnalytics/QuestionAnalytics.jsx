
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./Style.module.css";
import { server } from "../../App";

const QuestionAnalytics = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiztype, setQuiztype] = useState(null);
  const [currentquiz, setCurrentquiz] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const quiz = await axios.get(
          `${server}api/quiz/getquiz/${quizId}`
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
      <p className={style.red}>
        Impressions: {currentquiz.impressionofQuiz / 2}
      </p>
      {quiztype === "poll" ? (
        <>
          <ul>
            {questions.map((questionInfo, index) => (
              <li key={index}>
                <p className={style.question_info}>
                  Q.{index + 1} : {questionInfo.question}
                </p>
                <div className={style.cards_container}>
                  {questionInfo.options.map((opt, optIndex) => (
                    <div className={style.cards} key={optIndex}>
                      <h4 className={style.value}>{opt.impressionofOption}</h4>
                      <p className={style.text}>Option {optIndex + 1}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {questions.map((questionInfo, index) => (
            <li key={index}>
              <p className={style.question_info}>
                Q.{index + 1} {questionInfo.question}
              </p>
              <div className={style.cards_container}>
                <div className={style.cards}>
                  <h4 className={style.value}>
                    {" "}
                    {questionInfo.impressionofQuestion / 2}{" "}
                  </h4>
                  <p className={style.text}>People Attempted Question</p>
                </div>
                <div className={style.cards}>
                  <h4 className={style.value}>
                    {questionInfo.answeredCorrectly / 2}
                  </h4>
                  <p className={style.text}> Answered Correctly </p>
                </div>
                <div className={style.cards}>
                  <h4 className={style.value}>
                    {(questionInfo.impressionofQuestion -
                      questionInfo.answeredCorrectly) /
                      2}
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
