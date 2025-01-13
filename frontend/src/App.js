import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './Context/Notes/NoteState';
import ViewNote from './Components/ViewNote';
import AddNote from './Components/AddNote';
import Alert from './Components/Alert';
import Signup from './Components/Signup';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert/>
        <Routes>
          <Route exact path="/" element={<ViewNote/>}></Route>
          <Route exact path="/addNote" element={<AddNote/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
