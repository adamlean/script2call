import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import NavBar from './components/NavBar';

// Pages
import Home from "./pages/Home";
import Auth from './pages/Auth';
import WorkBoard from './pages/WorkBoard';

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
        <Route path="/auth" element={<Auth />} />
         <Route path="/workboard" element={<WorkBoard />} />
      </Routes>
    </Router>
  );
}

export default App;