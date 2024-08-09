import React from "react";
import ResponsiveDrawer from "./components/Sidebar";
import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";
import MovieGridRedux from "./components/MovieGridRedux";

function App() {
  return (
    <div>
      <Header />
      <ResponsiveDrawer />
      <main style={{ marginLeft: "240px", marginTop: "64px" }}>
        <MovieGridRedux />
      </main>
    </div>
  );
}

export default App;
