// QuizDataContext.js
import React, { createContext, useState, useContext } from 'react';

// Create context
const QuizDataContext = createContext();

// Create provider component
export const QuizDataProvider = ({ children }) => {
  const [quizData, setQuizData] = useState(null);

  return (
    <QuizDataContext.Provider value={{ quizData, setQuizData }}>
      {children}
    </QuizDataContext.Provider>
  );
};

// Custom hook to consume context
export const useQuizData = () => useContext(QuizDataContext);
