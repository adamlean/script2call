import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';

// Pages
import Home from "./pages/Home";


// Layouts
// import DefaultLayout from "./layouts/DefaultLayout";
// import HomeLayout from "./layouts/HomeLayout";

import './App.css';

function App() {
  useEffect(() => {
      document.title = 'Script2Call | Менеджер скриптов';
  }, []);
  
  return (
    <Router>
      <NavBar />
      <Routes>
         <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;