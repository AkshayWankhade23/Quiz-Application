import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

function LiveQuiz() {
  const {quizId} = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(200);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getquiz/${quizId}`);
        const data = await response.json();
        console.log(data.quiz);
        if (data) {
          setQuizData({ ...data.quiz, impressionofQuiz: data.quiz.impressionofQuiz + 1 });
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
    if (timer === 0) {
      handleNextClick();
    }
  }, [timer]);

  useEffect(() => {
    if (quizCompleted) {
      // Send quizData to the backend
      const sendQuizDataToBackend = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/updateQuiz', {
            quizData,
          });
  
          console.log(response.data); // Handle the response from the backend as needed
        } catch (error) {
          console.error('Error sending quiz data to backend:', error);
        }
      };
  
      sendQuizDataToBackend();
    }
  }, [quizCompleted, quizData]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = [...prevSelectedOptions];
      updatedOptions[currentQuestionIndex] = optionIndex;
      return updatedOptions;
    });
  };

  const handleNextClick = () => {
    if (currentQuestionIndex === quizData.numQuestions - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(quizData.questions[currentQuestionIndex + 1].timer);
    }
  };

  const calculateScore = () => {
    let score = 0;
  
    const updatedQuizData = { ...quizData };
  
    const updatedQuestions = updatedQuizData.questions.map((question, index) => {
      const selectedOptionIndex = selectedOptions[index];
      
      if (selectedOptionIndex !== undefined) {
        question.impressionofQuestion += 1;
        question.options[selectedOptionIndex].impressionofOption += 1;
      }
      if (selectedOptionIndex !== undefined && question.correctOption === selectedOptionIndex) {
        question.answeredCorrectly += 1;
        score += 1;
      }
      return question;
    });
  
    updatedQuizData.questions = updatedQuestions;
  
    // Check if there are actual changes before updating the state
    
    // console.log(JSON.stringify(quizData) === JSON.stringify(updatedQuizData));
    if (!JSON.stringify(quizData) === JSON.stringify(updatedQuizData)) {
      setQuizData(updatedQuizData);
    }
  
    return score;
  };
  

  const renderOptions = (options, optionType) => {
    return options.map((currentOption, optionIndex) => (
      <div
        key={optionIndex}
        onClick={() => handleOptionSelect(optionIndex)}
        style={{
          height: '45%',
          width: '45%',
          cursor: 'pointer',
          border: '1px solid',
          margin: '20px',
          backgroundColor:
            selectedOptions[currentQuestionIndex] === optionIndex
              ? 'rgba(96, 184, 75, 0.5)' // Highlight color for selected option
              : 'transparent', // Default background color
        }}
      >
        {optionType === 'text' && <div>{currentOption.option}</div>}
        {optionType === 'image' && <div>{currentOption.option}</div>}
        {optionType === 'both' && (
          <>
            <div>{currentOption.option.split('***')[0]}</div>
            <img src={currentOption.option.split('***')[1]} alt="Image" />
          </>
        )}
      </div>
    ));
  };

  const renderQuizContent = () => {
    if (!quizData) {
      return <div>Loading...</div>;
    }

    if (quizCompleted) {
      const score = calculateScore();
      return (
        <div>
          <div>Quiz completed. Your score: {score}/{quizData.numQuestions}</div>
          {console.log(quizData)}
        </div>
      );
    }

    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '113px', height: '60px', top: '131px', left: '151px', fontFamily: 'Poppins', fontSize: '40px', fontWeight: '700', lineHeight: '60px', letterSpacing: '0em', textAlign: 'left', color: 'rgba(71, 68, 68, 1)' }}>
            {`0${currentQuestionIndex + 1}/${quizData.numQuestions}`}
          </div>
          {timer > 0 && (
            <div style={{ width: '127px', height: '60px', top: '131px', left: '1001px', fontFamily: 'Poppins', fontSize: '40px', fontWeight: '700', lineHeight: '60px', letterSpacing: '0em', textAlign: 'left', color: 'rgba(214, 0, 0, 1)' }}>
              {timer}s
            </div>
          )}
        </div>
        <div>
          <div style={{ width: '996px', height: '60px', top: '231px', left: '133px', fontFamily: 'Poppins', fontSize: '40px', fontWeight: '700', lineHeight: '60px', letterSpacing: '0em', textAlign: 'left', color: 'rgba(71, 68, 68, 1)' }}>
            {currentQuestion.question}
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px 0',
            width: '75vw',
            height: '75vh',
            top: '308px',
            left: '236px',
            borderRadius: '10px',
            marginLeft: '50px',
          }}>
            {renderOptions(currentQuestion.options, currentQuestion.optionType)}
          </div>
        </div>
        <div>
          <button
            onClick={handleNextClick}
            style={{
              width: '320px',
              height: '56px',
              top: '649px',
              left: '487px',
              borderRadius: '10px',
              fontFamily: 'Poppins',
              fontSize: '30px',
              fontWeight: '600',
              lineHeight: '45px',
              letterSpacing: '0em',
              textAlign: 'left',
              background: 'rgba(96, 184, 75, 1)',
              cursor: 'pointer',
              position: 'absolute'
            }}
          >
            {currentQuestionIndex === quizData.numQuestions - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </>
    );
  };

  return <>{renderQuizContent()}</>;
}

export default LiveQuiz;
