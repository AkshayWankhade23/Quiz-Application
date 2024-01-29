import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import trophy_logo from "../../assets/trophy.png";
import style from "./Style.module.css";

function LiveQuiz() {
  const { quizId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(null);  
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/quiz/getquiz/${quizId}`
        );
        const data = await response.json();
        console.log(data.quiz);
        if (data) {
          setQuizData({
            ...data.quiz,
            impressionofQuiz: data.quiz.impressionofQuiz + 1,
          });
          // Set the timer from the fetched data
          console.log(data.quiz.questions[0].timer, "Timer");
          const initialTimer = data.quiz.questions[0].timer;
          setTimer(initialTimer === "OFF" ? null : parseInt(initialTimer));
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  useEffect(() => {
    if (timer !== null && timer !== "OFF" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
  
      // Clear interval when timer reaches 0
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (quizData && timer === null) {
      // Set the timer from the fetched data if it's not set yet
      const initialTimer = quizData.questions[0].timer;
      setTimer(initialTimer === "OFF" ? null : parseInt(initialTimer));
    }
  }, [quizData, timer]);

  useEffect(() => {
    if (timer === 0 && !quizCompleted) {
      handleNextClick();
    }
  }, [timer, quizCompleted]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[currentQuestionIndex] = optionIndex;
      return updatedOptions;
    });
  };

  const handleNextClick = () => {
    if (quizData && currentQuestionIndex < quizData.numQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      // Update timer for the next question
      setTimer(parseInt(quizData.questions[currentQuestionIndex + 1].timer));
    } else {
      // If there are no more questions, mark quiz as completed
      setQuizCompleted(true);
    }
  };
  

  const calculateScore = () => {
    let score = 0;

    const updatedQuizData = { ...quizData };

    const updatedQuestions = updatedQuizData.questions.map(
      (question, index) => {
        const selectedOptionIndex = selectedOptions[index];

        if (selectedOptionIndex !== undefined) {
          question.impressionofQuestion += 1;
          question.options[selectedOptionIndex].impressionofOption += 1;
        }
        if (
          selectedOptionIndex !== undefined &&
          question.correctOption === selectedOptionIndex
        ) {
          question.answeredCorrectly += 1;
          score += 1;
        }
        return question;
      }
    );

    updatedQuizData.questions = updatedQuestions;

    // Check if there are actual changes before updating the state
    if (!JSON.stringify(quizData) === JSON.stringify(updatedQuizData)) {
      setQuizData(updatedQuizData);
    }

    return score;
  };

  const renderOptions = (options, optionType) => {
    return options.map((currentOption, optionIndex) => (
      <div
        className={`${style.options_card} ${
          selectedOptions[currentQuestionIndex] === optionIndex
            ? style.selected
            : ""
        }`}
        key={optionIndex}
        onClick={() => handleOptionSelect(optionIndex)}
      >
        {optionType === "text" && <div>{currentOption.option}</div>}
        {optionType === "image" && <div>{currentOption.option}</div>}
        {optionType === "both" && (
          <>
            <div>{currentOption.option.split("***")[0]}</div>
            <img
              src={currentOption.option.split("***")[1]}
              alt="option_image"
            />
          </>
        )}
      </div>
    ));
  };

  const renderQuizContent = () => {
    if (!quizData) {
      return <div>Loading...</div>;
    }

    if (quizCompleted && quizData.quizType === "qa") {
      const score = calculateScore();
      return (
        <div className={style.container}>
          <div className={style.main}>
            <p>Congrats Quiz is completed</p>
            <div>
              <img src={trophy_logo} alt="trophy_logo" />
            </div>
            <p>
              Your Score is {score}/{quizData.numQuestions}
            </p>
          </div>
          {console.log(quizData)}
        </div>
      );
    }
    if (quizCompleted && quizData.quizType === "poll") {
      return (
        <div className={style.container}>
          <div className={style.main}>
            <p className={style.poll_msg}>
              Thank you for participating in the Poll
            </p>
          </div>
          {console.log(quizData)}
        </div>
      );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
      <div className={style.container}>
        <div className={style.main}>
          <div className={style.question_index}>{`0${
            currentQuestionIndex + 1
          }/${quizData.numQuestions}`}</div>
          {timer !== null && quizData.quizType === "qa" && (  
            <div className={style.timer}>{timer}s</div>
          )}

          <div className={style.question_text}>{currentQuestion.question}</div>
          <div className={style.options_container}>
            {renderOptions(currentQuestion.options, currentQuestion.optionType)}
          </div>
          <div>
            <button className={style.submit_btn} onClick={handleNextClick}>
              {currentQuestionIndex === quizData.numQuestions - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <>{renderQuizContent()}</>;
}

export default LiveQuiz;
