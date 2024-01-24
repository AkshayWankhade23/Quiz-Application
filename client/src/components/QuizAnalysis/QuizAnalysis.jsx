import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quizanalysis = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuizImpressions, setTotalQuizImpressions] = useState(0);
  const icons = '⭐️⭐️⭐️';

  useEffect(() => {
    // Fetch quizzes with respective impressions when the component mounts
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage

        // Fetch quizzes with impressions
        const quizResponse = await axios.get(`http://localhost:3000/api/quizzesWithImpressions/${userId}`);
        const fetchedQuizzes = quizResponse.data.quizzes;
        
        // Calculate total quiz impressions
        const totalQuizImpressions = fetchedQuizzes.reduce((total, quiz) => total + quiz.impressionofQuiz, 0);
        setTotalQuizImpressions(totalQuizImpressions);

        setQuizzes(fetchedQuizzes);

        const questionResponse = await axios.get(`http://localhost:3000/api/questionCount/${userId}`);
        setQuestionCount(questionResponse.data.questionCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    // <div>
    //   <ul>
    //     {quizzes.map((quiz,index) => (
    //       <li key={quiz._id}>
    //         <strong>{quiz.quizName}</strong> - Impressions: {quiz.impressionofQuiz}
    //         <p>- created on: {quiz.date}</p> 
    //     <p>
    //         <a href={`/question-analysis/${quiz._id}`}>Question Analytics</a>
    //     </p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div>

      <div style={{ color: '#5076FF', fontFamily: 'Poppins', fontSize: '50px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal' ,marginTop:'60px',marginLeft:'374px'}}>
          Quiz Analysis
      </div>


      <div style={{width:'75vw',marginLeft:'83px',marginTop:'53px'}}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
        <tr style={{
          backgroundColor: 'rgba(80, 118, 255, 1)',
          color: '#fff',
          height: '35px',
          flexShrink: 0,
          textAlign: 'center',
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '40px', /* 250% */
          border:'1px',
          borderRadius: '10px',
}}>
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
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'none' : 'rgba(179, 196, 255, 1)' ,textAlign: 'center',}}>
              <td>{index + 1}</td>
              <td>{quiz.quizName}</td>
              <td>{formatDate(quiz.date)}</td>
              <td>{quiz.impressionofQuiz}</td>
              <td>{icons}</td>
              <td>{<a href={`/question-analysis/${quiz._id}`}>Question Analytics</a>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Quizanalysis;
