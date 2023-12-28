// App.js
//============

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home";
import About from "./About";
import Form from "./Form";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/form' element={<Form />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
