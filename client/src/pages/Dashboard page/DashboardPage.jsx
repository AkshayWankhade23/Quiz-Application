import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import CreateQuiz from "../../components/CreateQuiz/CreateQuiz";
import QuizAnalysis from "../../components/QuizAnalysis/QuizAnalysis";
import style from "./Style.module.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const savedActiveTab = localStorage.getItem("activeTab");
  const [showCreateQuizPopup, setShowCreateQuizPopup] = useState(false);
  const [activeTab, setActiveTab] = useState(
    savedActiveTab ? parseInt(savedActiveTab) : 1
  );

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab.toString());
  }, [activeTab]);

  const handleCreateQuizClick = () => {
    // Set the state to show the create quiz pop-up
    setShowCreateQuizPopup(true);
  };


  const handleClosePopup = () => {
    // Set the state to hide the create quiz pop-up
    setShowCreateQuizPopup(false);
  };


  return (
    <div className={style.main}>
      <div className={style.dashboard_sidebar}>
        <h3>QUIZZIE</h3>
        <button
          onClick={() => setActiveTab(1)}
          className={`${style.button} ${
            activeTab === 1 && style.active
          }`}
        >
          Dashboard
        </button>{" "}
        <br />
        <button
          onClick={() => setActiveTab(2)}
          className={`${style.button} ${
            activeTab === 2 && style.active
          }`}
        >
          Analytics
        </button>{" "}
        <br />
        <button
          onClick={handleCreateQuizClick}
          className={`${style.button} ${
            activeTab === 3 && style.active
          }`}
        >
          Create Quiz
        </button>{" "}
        <br />
        <div className={style.line}></div>
        <button onClick={handleLogout} className={style.logout_btn}>Logout</button>
      </div>

      <div className={style.dashboard_content}>
        {activeTab === 1 && <Dashboard />}
        {activeTab === 2 && <QuizAnalysis />}
        {activeTab === 3 && <CreateQuiz />}
      </div>
      {showCreateQuizPopup && (
        <div
          className={style.createquiz_popup}
        >
          <div
            className={style.create_quiz}
          >
            {/* Render the Createquiz component in the pop-up */}
            <CreateQuiz handleClosePopup={handleClosePopup} />

            {/* <button onClick={handleClosePopup} className={style.cancle_btn} >Canc</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

