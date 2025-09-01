import React, { useEffect } from "react";
import Workspace from "../components/Workspace";

function Workboard() {
  useEffect(() => {
    document.title = "Script2Call | Менеджер скриптов";
  }, []);

  return (
    <Workspace />
  );
}

export default Workboard;