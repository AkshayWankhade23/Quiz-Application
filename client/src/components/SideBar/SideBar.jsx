// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Dashboard from "../../components/Dashboard/Dashboard";
// import CreateQuiz from "../../components/CreateQuiz/CreateQuiz";
// import QuizAnalysis from "../../components/QuizAnalysis/QuizAnalysis";
// // import style from "./Style.module.css";
// import style from "./Style.module.css"

// const SideBar = () => {
//   const navigate = useNavigate();
//   const savedActiveTab = localStorage.getItem("activeTab");
//   const [activeTab, setActiveTab] = useState(
//     savedActiveTab ? parseInt(savedActiveTab) : 1
//   );
//   const [showCreateQuiz, setShowCreateQuiz] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("name");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   useEffect(() => {
//     localStorage.setItem("activeTab", activeTab.toString());
//   }, [activeTab]);

//   const handleCreateQuizClick = () => {
//     setActiveTab(3);
//     setShowCreateQuiz(true);
//   };

//   return (
//     <div className={style.main}>
//       <div className={style.dashboard_sidebar}>
//         <h3>QUIZZIE</h3>
//         <button
//           onClick={() => setActiveTab(1)}
//           className={`${style.btn} ${
//             activeTab === 1 && style.active
//           }`}
//         >
//           Dashboard
//         </button>{" "}
//         <br />
//         <button
//           onClick={() => setActiveTab(2)}
//           className={`${style.btn} ${
//             activeTab === 2 && style.active
//           }`}
//         >
//           Analytics
//         </button>{" "}
//         <br />
//         <button
//           onClick={() => setActiveTab(3)}
//           className={`${style.btn} ${
//             activeTab === 3 && style.active
//           }`}
//         >
//           Create Quiz
//         </button>{" "}
//         <br />
//         <div className={style.line}></div>
//         <button onClick={handleLogout} className={style.logout_btn}>Logout</button>
//       </div>

//       <div>
//         {activeTab === 1 && <Dashboard />}
//         {activeTab === 2 && <QuizAnalysis />}
//         {activeTab === 3 && showCreateQuiz && <CreateQuiz />}
//       </div>
//     </div>
//   );
// };

// export default SideBar;