// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="overlay">
        <h1>Script2Call <span>Менеджер</span> скриптов</h1>
        <p>ПО с открытым исходным кодом, разрабатываемое чтобы облегчить работу операторов колл центров</p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/workboard")} className="btn primary">
            Начать использовать
          </button>
          <button onClick={() => navigate("/workboard")} className="btn primary">
            Документация
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;