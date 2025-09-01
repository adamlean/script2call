import React, { useEffect } from "react";
import "./Home.css";
import Hero from "../components/Hero";

function Home() {
  useEffect(() => {
    document.title = "Script2Call | Менеджер скриптов";
  }, []);

  return (
    <Hero />
  );
}

export default Home;