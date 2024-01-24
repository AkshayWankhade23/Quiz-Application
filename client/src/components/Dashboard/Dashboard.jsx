import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [totalQuizImpressions, setTotalQuizImpressions] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const quizResponse = await axios.get(`http://localhost:3000/api/quizzesWithImpressions/${userId}`);
        const fetchedQuizzes = quizResponse.data.quizzes;
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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', width: '85vw', height: '98vh', flexShrink: 0, background: '#EDEDED' }}>
      <div style={{ display: 'inline-flex', flexDirection: 'row', gap: '100px', width: '80vw', height: '49vh', marginLeft: '5vw', marginRight: '5vw', marginTop: '10vh', flexWrap: 'wrap' }}>
        <div style={{ width: '295px', height: '145px', flexShrink: 0, borderRadius: '10px', background: 'rgba(255, 255, 255, 1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '66px', height: '66px', flexShrink: 0, color: '#FF5D01', fontFamily: 'Poppins', fontSize: '60px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal' }}>
            {quizzes.length}&nbsp;
          </div>
          <div style={{ color: '#FF5D01', fontFamily: 'Poppins', fontSize: '30px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal' }}>
            Quiz&nbsp;
          </div>
          <div style={{ color: '#FF5D01', fontFamily: 'Poppins', fontSize: '30px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal' }}>
            Created&nbsp;
          </div>
        </div>

        <div style={{ display: 'flex', width: '295px', height: '145px', flexShrink: 0, borderRadius: '10px', background: '#FFF', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            color: '#60B84B',
            fontFamily: 'Poppins',
            fontSize: '60px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal'
          }}>
            {questionCount}&nbsp;
          </div>
          <div style={{
            color: '#60B84B',
            fontFamily: 'Poppins',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal'
          }}>
            Questions&nbsp;
          </div>
          <div style={{
            color: '#60B84B',
            fontFamily: 'Poppins',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal'
          }}>
            Created&nbsp;
          </div>
        </div>

        <div style={{ width: '295px', height: '145px', flexShrink: 0, borderRadius: '10px', background: '#FFF', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            color: '#5076FF',
            fontFamily: 'Poppins',
            fontSize: '60px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal'
          }}>
            {totalQuizImpressions}&nbsp;
          </div>
          <div style={{
            color: '#5076FF',
            fontFamily: 'Poppins',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal'
          }}>
            Total&nbsp;
          </div>
          <div style={{
            color: '#5076FF',
            fontFamily: 'Poppins',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal'
          }}>
            Impressions&nbsp;
          </div>
        </div>
      </div>
      <div style={{ height: '49vh', width: '85vw', marginLeft: '5vw' }}>
        <div style={{ color: '#474444', fontFamily: 'Poppins', fontSize: '35px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', margin: '18px' }}>
          Trending Quizzes
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '85vw' }}>
          {quizzes.map((quiz) => (
            <div key={quiz._id} style={{ width: '181px', height: '62px', borderRadius: '5px', background: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', flexShrink: 0, margin: '18px', marginLeft: '50px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#474444', fontFamily: 'Poppins', fontSize: '23px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal' }}>
                  {quiz.quizName}
                </div>
                <div style={{ color: '#FF5D01', fontFamily: 'Poppins', fontSize: '15px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal' }}>
                  {quiz.impressionofQuiz}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 15.375C12.7279 15.375 15.75 12.2542 15.75 10.125C15.75 7.99575 12.7279 4.875 9 4.875C5.27213 4.875 2.25 7.998 2.25 10.125C2.25 12.252 5.27213 15.375 9 15.375Z" stroke="#FF5D01" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 12.375C9.59674 12.375 10.169 12.1379 10.591 11.716C11.0129 11.294 11.25 10.7217 11.25 10.125C11.25 9.52826 11.0129 8.95597 10.591 8.53401C10.169 8.11205 9.59674 7.875 9 7.875C8.40326 7.875 7.83097 8.11205 7.40901 8.53401C6.98705 8.95597 6.75 9.52826 6.75 10.125C6.75 10.7217 6.98705 11.294 7.40901 11.716C7.83097 12.1379 8.40326 12.375 9 12.375Z" stroke="#FF5D01" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M4.974 4.22475L5.94675 5.58225M13.3594 4.39125L12.3862 5.74875M9.00337 2.625V4.875" stroke="#FF5D01" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div style={{ color: '#60B84B', fontFamily: 'Poppins', fontSize: '11px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal' }}>
                Created on: {formatDate(quiz.date)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
