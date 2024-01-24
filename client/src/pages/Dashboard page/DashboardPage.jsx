import React, { useState, useEffect } from 'react';

import Dashboard from '../../components/Dashboard/Dashboard';
import CreateQuiz from '../../components/CreateQuiz/CreateQuiz';
import QuizAnalysis from "../../components/QuizAnalysis/QuizAnalysis"


const DashboardPage = () => {
  const savedActiveTab = localStorage.getItem('activeTab');
  const [activeTab, setActiveTab] = useState(savedActiveTab ? parseInt(savedActiveTab) : 1);
  const [showCreateQuizPopup, setShowCreateQuizPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab.toString());
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
    <div style={{ display: 'flex' }}>
      <div style={{
        margin: '0',
        padding: '0',
        height: '98vh',
        width: '15vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 1)',
        boxShadow: activeTab === 1 ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
        flexShrink: 0,
      }}>
        <div style={{
          color: 'rgba(71, 68, 68, 1)',
          fontFamily: 'Jomhuria',
          fontSize: '50px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 1.2,
        }}>
          QUIZZIE
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <button
            onClick={() => setActiveTab(1)}
            style={{
              width: '11rem',
              height: '2.375rem',
              marginBottom: '18%',
              flexShrink: 0,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              border: 'none',
              borderRadius: '10px',
              boxShadow: activeTab === 1 ? '0px 0px 14px 0px rgba(0, 0, 0, 0.12)' : 'none',
              color: 'rgba(71, 68, 68, 1)',
              fontFamily: 'Poppins',
              fontSize: '1.25rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal',
            }}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab(2)}
            style={{
              width: '11rem',
              height: '2.375rem',
              marginBottom: '18%',
              flexShrink: 0,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              border: 'none',
              borderRadius: '10px',
              boxShadow: activeTab === 2 ? '0px 0px 14px 0px rgba(0, 0, 0, 0.12)' : 'none',
              color: 'rgba(71, 68, 68, 1)',
              fontFamily: 'Poppins',
              fontSize: '1.25rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal',
            }}
          >
            Analytics
          </button>

          <button
            onClick={handleCreateQuizClick}
            style={{
              width: '11rem',
              height: '2.375rem',
              marginBottom: '18%',
              flexShrink: 0,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              border: 'none',
              borderRadius: '10px',
              boxShadow: activeTab === 3 ? '0px 0px 14px 0px rgba(0, 0, 0, 0.12)' : 'none',
              color: 'rgba(71, 68, 68, 1)',
              fontFamily: 'Poppins',
              fontSize: '1.25rem',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal',
            }}
          >
            Create Quiz
          </button>
        </div>

        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="124" height="2" viewBox="0 0 124 2" fill="none">
            <path d="M0 1H124" stroke="black" />
          </svg>
          <div style={{
            color: 'rgba(71, 68, 68, 1)',
            fontFamily: 'Poppins',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            textTransform: 'uppercase',
          }}>
            Logout
          </div>
        </div>
      </div>

      <div>
        {activeTab === 1 && <Dashboard />}
        {activeTab === 2 && <QuizAnalysis />}
        {activeTab === 3 && <CreateQuiz />}
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

            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
