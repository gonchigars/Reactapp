import React from "react";
import ResponsiveDrawer from "./components/Sidebar";
import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";

function App() {
  return (
    <div>
      <Header />
      <ResponsiveDrawer />
      <main style={{ marginLeft: "240px", marginTop: "64px" }}>
        <MovieGrid />
      </main>
    </div>
  );
}

export default App;
