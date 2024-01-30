import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import Home from "./pages/Home/Home";
import LiveQuiz from "./components/LiveQuiz/LiveQuiz";
import QuizAnalysis from "./components/QuizAnalysis/QuizAnalysis";
import QuestionAnalytics from "./components/QuestionAnalytics/QuestionAnalytics";
import DashboardPage from "./pages/Dashboard page/DashboardPage";
import { Toaster } from "react-hot-toast";

export const server = "https://quizzie-qtot.onrender.com/";

const handleShareQuiz = (quizId) => {
  const quizLink = `http://localhost:3001/livequiz/${quizId}`;
  console.log(`Sharing quiz with ID: ${quizId} and link: ${quizLink}`);
  navigator.clipboard
    .writeText(quizLink)
    .then(() => {
      console.log("Quiz link copied to clipboard:", quizLink);
      // toast.success("Quiz link copied to clipboard!");
    })
    .catch((error) => {
      console.error("Failed to copy quiz link:", error);
      // alert("Failed to copy quiz link!");
    });
};

function App() {
  return (
    <>
      <Router>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard-page" element={<DashboardPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-quiz" element={<CreateQuiz handleShareQuiz={handleShareQuiz} />} />
            <Route path="/livequiz/:quizId" element={<LiveQuiz />} />
            <Route path="/quizanalysis" element={<QuizAnalysis />} />
            <Route
              path="/question-analysis/:quizId"
              element={<QuestionAnalytics />}
            />
          </Routes>
      </Router>
    </>
  );
}

export default App;
