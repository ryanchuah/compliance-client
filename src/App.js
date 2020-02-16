import React, { Component, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Route
        exact
        path="/"
        render={props => {
          return <Index />;
        }}
      />

      <Route
        exact
        path="/login"
        render={props => {
          return <Login />;
        }}
      />

      <Route
        exact
        path="/register"
        render={props => {
          return <Register />;
        }}
      />
    </Router>
  );
}

export default App;
