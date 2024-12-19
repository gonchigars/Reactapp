import React from "react";
import ButtonAppBar from "./component/Appbar";
import MovieiGrid from './component/MovieiGrid';
import "./App.css";
function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <main style={{ marginLeft: "240px", marginTop: "64px" }}>
      <MovieiGrid/>
      </main>
    </div>
  );
}

export default App;
