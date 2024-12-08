import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Histories from "./pages/Histories";
import QuizList from "./pages/QuizList";
import QuizDetailList from "./pages/QuizDetailList";
import QuizQuestions from "./pages/QuizQuestions";
import HistoryDetails from "./pages/HistoryDetails";
import PartsDetails from "./pages/PartsDetails";
import CharacterPage from "./pages/CharacterPage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = "IHM - Indian History Mythologies";
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <section id="home">
                  <Home />
                </section>
                <section id="about">
                  <About />
                </section>
                <section id="histories">
                  <Histories />
                </section>
                <section id="quizlist">
                  <QuizList />
                </section>
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/histories" element={<Histories />} />
          <Route path="/histories/:id" element={<HistoryDetails />} />
          <Route
            path="/histories/:id/parts/:partTitle"
            element={<PartsDetails />}
          />
          <Route
            path="/histories/:id/characters/:characterName"
            element={<CharacterPage />}
          />
          <Route path="/quiz" element={<QuizList />} />
          <Route path="/quiz/:category" element={<QuizDetailList />} />
          <Route path="/quiz/:category/:quizName" element={<QuizQuestions />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
