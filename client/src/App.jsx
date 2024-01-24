
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import Home from "./pages/Home/Home"
import LiveQuiz from './components/LiveQuiz/LiveQuiz';
import QuizAnalysis from "./components/QuizAnalysis/QuizAnalysis"
import QuestionAnalytics from './components/QuestionAnalytics/QuestionAnalytics';
import DashboardPage from './pages/Dashboard page/DashboardPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/dashboard-page' element={<DashboardPage/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-quiz' element={<CreateQuiz />} />
          <Route path='/livequiz/:quizId' element={<LiveQuiz />} />
          <Route path='/quizanalysis' element={<QuizAnalysis />} />
          <Route path='/question-analysis/:quizId' element={<QuestionAnalytics />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
