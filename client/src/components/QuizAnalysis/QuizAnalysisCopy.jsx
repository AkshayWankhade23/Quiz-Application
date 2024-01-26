import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Style.module.css";
import edit_logo from "../../assets/edit.png";
import delete_logo from "../../assets/delete.png";
import share_logo from "../../assets/share.png";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
// import { useQuizData } from "../../Context/QuizDataContext"

const QuizAnalysis = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuizImpressions, setTotalQuizImpressions] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [showCreateQuizPopup, setShowCreateQuizPopup] = useState(false);
  // const icons = "⭐️⭐️⭐️";

  useEffect(() => {
    // Fetch quizzes with respective impressions when the component mounts
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage

        // Fetch quizzes with impressions
        const quizResponse = await axios.get(
          `http://localhost:3000/api/quizzesWithImpressions/${userId}`
        );
        const fetchedQuizzes = quizResponse.data.quizzes;

        // Calculate total quiz impressions
        const totalQuizImpressions = fetchedQuizzes.reduce(
          (total, quiz) => total + quiz.impressionofQuiz,
          0
        );
        setTotalQuizImpressions(totalQuizImpressions);

        setQuizzes(fetchedQuizzes);

        const questionResponse = await axios.get(
          `http://localhost:3000/api/questionCount/${userId}`
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

  const handleEditQuiz = async (quizId, updatedData) => {
    // Set the state to show the create quiz pop-up
    setShowCreateQuizPopup(true);
    try {
      // Make a PATCH request to update the quiz
      const response = await axios.patch(`http://localhost:3000/api/editQuiz/${quizId}`, updatedData);
      
      // Handle the response from the server
      if (response.data.success) {
        // Quiz successfully updated
        console.log('Quiz updated successfully:', response.data.updatedQuiz);
      } else {
        // Handle error response from the server
        console.error('Error updating quiz:', response.data.error);
      }
    } catch (error) {
      // Handle network or server errors
      console.error('Error updating quiz:', error);
    }
  };
  

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deleteQuiz/${quizId}`);

      if (response.status === 200) {
        console.log(response.data.message); // Quiz deleted successfully
        setDeleted(true); // Set state to indicate quiz is deleted
      } else {
        console.error(response.data.error); // Quiz not found or Internal Server Error
        // Optionally, handle the error appropriately
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle any network or unexpected errors
    }
  };

  const handleShareQuiz = (quizId) => {
    // Logic to handle sharing quiz with the given quizId
    
    console.log(`Sharing quiz with ID: ${quizId}`);
  };

  return (
    <div>
      <div className={style.header}>Quiz Analysis</div>

      <div className={style.quizTable}>
        <table className={style.tableHeader}>
          <thead>
            <tr className={style.header_table_row}>
              <th>S.No</th>
              <th>Quiz Name</th>
              <th>Created On</th>
              <th>Impression</th>
              <th>Icons</th>
              <th>Question-wise Analysis</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr
                key={index}
                className={`${style.myStyledElement} ${
                  index % 2 === 0 ? "" : style.odd
                }`}
              >
                <td>{index + 1}</td>
                <td>{quiz.quizName}</td>
                <td>{formatDate(quiz.date)}</td>
                <td>{quiz.impressionofQuiz}</td>
                <td>
                  {/* {icons} */}

                  {/* Edit button */}
                  <button onClick={() => handleEditQuiz(quiz._id)}>
                    <img src={edit_logo} alt="edit_logo" />
                  </button>

                  {/* Delete button */}
                  <button onClick={() => handleDeleteQuiz(quiz._id)}>
                    <img src={delete_logo} alt="delete_logo" />
                  </button>

                  {/* Share button (you can use a link or a custom share function) */}
                  <button onClick={() => handleShareQuiz(quiz._id)}>
                    <img src={share_logo} alt="share_logo" />
                  </button>
                </td>
                <td>
                  {
                    <a href={`/question-analysis/${quiz._id}`}>
                      Question Analytics
                    </a>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>




      {showCreateQuizPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Render the Createquiz component in the pop-up */}
            <CreateQuiz />

            {/* <button onClick={handleClosePopup}>Close</button> */}
          </div>
        </div>
      )}

    </div>
  );
};

export default QuizAnalysis;


