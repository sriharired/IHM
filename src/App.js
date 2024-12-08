import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../src/components/header";
import Home from "../src/pages/home";
import About from "../src/pages/about";
import Histories from "../src/pages/history";
import QuizDetailList from "../src/pages/quizdetail";
import QuizQuestions from "./pages/quizquestions";
import HistoryDetails from "./pages/historydetails";
import PartsDetails from "./pages/partsdetails";
import CharacterPage from "./pages/characterdetails";
import QuizList from "../src/pages/quiz";

const App = () => {
  useEffect(() => {
    document.title = "IHM - Indian History Mythologies";
  }, []);
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/histories" element={<Histories />} />
          <Route path="/histories/:id" element={<HistoryDetails />} />
          <Route path="/histories/:id/parts/:partTitle" element={<PartsDetails />} />
          <Route path="/histories/:id/characters/:characterName" element={<CharacterPage />} />
          <Route path="/quiz" element={<QuizList/>} />
          <Route path="/quiz/:category" element={<QuizDetailList />} />
          <Route path="/quiz/:category/:quizName" element={<QuizQuestions />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
