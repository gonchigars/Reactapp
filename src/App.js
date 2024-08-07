import './App.css';
import React from 'react';
import CombinedComponent from './components/Sidebar';
import MovieGrid from './components/MovieGrid';
import RatingMeter from './components/RatingMeter';

function App() {
  return (
    <div className="App">
            <CombinedComponent/>
            <MovieGrid/>
            <RatingMeter/>
       
    </div>
  );
}

export default App;

