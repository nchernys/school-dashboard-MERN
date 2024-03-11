import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./App";
import "./index.css";
import { SchoolContextProvider } from "./context/schoolContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SchoolContextProvider>
      <MainApp />
    </SchoolContextProvider>
  </React.StrictMode>
);
