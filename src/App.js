import './App.css';
import PrimarySearchAppBar from './COMPONENTS/appbar';
import PersistentDrawerLeft from './COMPONENTS/SIDEBAR';
import MovieGrid from "./COMPONENTS/MovieGrid";
function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar/>
     <PersistentDrawerLeft/>
     <MovieGrid/>
    </div>
  );
}

export default App;
