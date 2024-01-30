import React, { useState, useEffect } from "react";
import axios from "axios";
import eye_logo from "../../assets/eye.png";
import style from "./Style.module.css";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuizImpressions, setTotalQuizImpressions] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const quizResponse = await axios.get(
          `http://localhost:3000/api/quiz/quizzesWithImpressions/${userId}`
        );
        const fetchedQuizzes = quizResponse.data.quizzes;
        const totalQuizImpressions = fetchedQuizzes.reduce(
          (total, quiz) => total + quiz.impressionofQuiz,
          0
        );

        setTotalQuizImpressions(totalQuizImpressions);
        setQuizzes(fetchedQuizzes);

        const questionResponse = await axios.get(
          `http://localhost:3000/api/quiz/questionCount/${userId}`
        );
        setQuestionCount(questionResponse.data.questionCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className={style.dashboard_container}>
      <div className={style.dashboard_stats_container}>
        <div className={style.dashboard_stats_card}>
          <div className={style.quiz_created}>{quizzes.length}</div>
          <div className={style.quiz_created_text}>Quiz Created </div>
        </div>

        <div className={style.dashboard_stats_card}>
          <div className={style.questions_created}>{questionCount}</div>
          <div className={style.questions_created_text}>questions Created </div>
        </div>

        <div className={style.dashboard_stats_card}>
          <div className={style.quiz_impression_created}>
            {Math.round(totalQuizImpressions / 2)}
          </div>
          <div className={style.quiz_impression_created_text}>
            Total Impressions{" "}
          </div>
        </div>
      </div>
      <div className={style.dashboard_trending_quizzes_container}>
        <div className={style.dashboard_trending_quizzes_title}>
          Trending Quizs
        </div>

        <div className={style.dashboard_quiz_cards_container}>
          {quizzes.map((quiz) =>
            Math.round(quiz.impressionofQuiz) / 2 < 10 ? (
              <></>
            ) : (
              <div key={quiz._id} className={style.dashboard_quiz_card}>
                <div className={style.dashboard_quiz_card_text}>
                  {quiz.quizName}
                </div>
                <div className={style.dashboard_quiz_card_num}>
                  {Math.round(quiz.impressionofQuiz / 2)}
                  <img
                    className={style.eye_img}
                    src={eye_logo}
                    alt="eye-logo"
                  />
                </div>
                <p className={style.dashboard_quiz_stats_text}>
                  Created on: {formatDate(quiz.date)}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
