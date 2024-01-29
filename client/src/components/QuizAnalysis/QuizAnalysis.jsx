import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Style.module.css";
import edit_logo from "../../assets/edit.png";
import delete_logo from "../../assets/delete.png";
import share_logo from "../../assets/share.png";
import EditQuiz from "../EditQuiz/EditQuiz";
import { toast } from "react-hot-toast";

const QuizAnalysis = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuizImpressions, setTotalQuizImpressions] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [showCreateQuizPopup, setShowCreateQuizPopup] = useState(false);
  const [selectedQuizData, setSelectedQuizData] = useState(null);
  const [showDeleteQuizPopup, setShowDeleteQuizPopup] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  useEffect(() => {
    // Fetch quizzes with respective impressions when the component mounts
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage

        // Fetch quizzes with impressions
        const quizResponse = await axios.get(
          `http://localhost:3000/api/quiz/quizzesWithImpressions/${userId}`
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
          `http://localhost:3000/api/quiz/questionCount/${userId}`
        );
        setQuestionCount(questionResponse.data.questionCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, [deleted]);

  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleEditQuiz = async (quizId, updatedData) => {
    try {
      // Make a GET request to fetch the quiz data
      const response = await axios.get(
        `http://localhost:3000/api/quiz/getquiz/${quizId}`
      );

      // Handle the response from the server
      if (response.data.quiz) {
        // Quiz data successfully retrieved
        const quizData = response.data.quiz;
        setSelectedQuizData(quizData);
        setShowCreateQuizPopup(true);
        console.log("Quiz data retrieved:", quizData);
      } else {
        // Handle error response from the server if quiz data not found
        console.error("Quiz not found with ID:", quizId);
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error updating quiz:", error);
    }
  };

  // const handleShowDeletePopUp = () => {
  //   setShowDeleteQuizPopup(true);
  // };

  const handleDeleteQuiz = async (quizId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/quiz/deleteQuiz/${quizId}`
      );

      if (response.status === 200) {
        console.log(response.data.message); // Quiz deleted successfully
        setDeleted(true);
        setShowDeleteQuizPopup(false);
      } else {
        console.error(response.data.error); // Quiz not found or Internal Server Error
        // Optionally, handle the error appropriately
      }
    } catch (error) {
      console.error("Error:", error);
      // Optionally, handle any network or unexpected errors
    }
  };

  const handleShareQuiz = (quizId) => {
    // Logic to handle sharing quiz with the given quizId and link
    const quizLink = `http://localhost:3001/livequiz/${quizId}`;
    console.log(`Sharing quiz with ID: ${quizId} and link: ${quizLink}`);

    // Copy the quiz link to the clipboard
    navigator.clipboard
      .writeText(quizLink)
      .then(() => {
        console.log("Quiz link copied to clipboard:", quizLink);
        // Optionally, you can show a success message or perform any other action
        toast.success("Quiz link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy quiz link:", error);
        // Optionally, you can show an error message or perform any other action
        toast.error("Failed to copy quiz link!");
      });
  };
  // Pass handleShareQuiz function to CreateQuiz component
  // <CreateQuiz shareQuizLink={handleShareQuiz} />;

  const handleClosePopup = () => {
    // Set the state to hide the create quiz pop-up
    setShowCreateQuizPopup(false);
  };

  return (
    <div className={style.main}>
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
                  <button className={style.btn} onClick={() => handleEditQuiz(quiz._id)}>
                    <img src={edit_logo} alt="edit_logo" />
                  </button>

                  {/* Delete button */}

                  <button
                    className={style.btn}
                    onClick={() => {
                      setShowDeleteQuizPopup(true);
                      setQuizToDelete(quiz);
                    }}
                  >
                    <img src={delete_logo} alt="delete_logo" />
                  </button>
                  {showDeleteQuizPopup && quiz === quizToDelete && (
                    <div className={style.delete_popup}>
                      <h3>Are you sure you want to delete this quiz?</h3>
                      <button onClick={() => handleDeleteQuiz(quiz._id)}
                      className={style.confirm_btn}
                      >
                        Confirm Delete
                      </button>
                      <button onClick={() => setShowDeleteQuizPopup(false)}
                      className={style.cancel_btn}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {/* Share button (you can use a link or a custom share function) */}
                  <button className={style.btn} onClick={() => handleShareQuiz(quiz._id)}>
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
          className={style.edit_popup}
        >
          <div
            className={style.popup_container}
          >
            {/* Render the Createquiz component in the pop-up */}
            <EditQuiz quizData={selectedQuizData} handleClosePopup={handleClosePopup} />

            {/* <button onClick={handleClosePopup}>Close</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAnalysis;
