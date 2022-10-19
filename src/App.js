import React from "react";
import { useSelector } from "react-redux";
import GlobalStyle from "./shared/GlobalStyle";
import Router from "./shared/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
