// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./components/Sidebar";
import Header from "./components/Header";
import MovieGridRedux from "./components/MovieGridRedux";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <ResponsiveDrawer />
        <main
          style={{ marginLeft: "240px", marginTop: "64px", padding: "20px" }}
        >
          <Routes>
            <Route path="/" element={<MovieGridRedux category="popular" />} />
            <Route
              path="/action"
              element={<MovieGridRedux category="action" />}
            />
            <Route
              path="/adventure"
              element={<MovieGridRedux category="adventure" />}
            />
            <Route
              path="/comedy"
              element={<MovieGridRedux category="comedy" />}
            />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
