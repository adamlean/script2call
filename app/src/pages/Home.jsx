import React, { useEffect } from "react";
import Workspace from "../components/Workspace";
import "./Home.css";

function Home() {
  useEffect(() => {
    document.title = "Script2Call | Менеджер скриптов";
  }, []);

  return (
    <Workspace />
  );
}

export default Home;