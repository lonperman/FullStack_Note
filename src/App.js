import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { Routes, Route, Link } from "react-router-dom"
import { AddNotes } from './components/add-note.component'
import NotesList from './components/notes-list.component';
import Note from './components/note.component';

function App() {

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/notes" className="navbar-brand">
          Notes Project
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/notes"} className="nav-link">
              Notes
            </Link>
          </li>
          <li className='nav-item'>
            <Link to={"/add"} className='nav-link'>
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className='container mt-3'>
        <Routes>
          <Route exact path="/notes" element={<NotesList />} />
          <Route exact path="/add" element={<AddNotes />} />
          <Route path="/notes/:id" element={<Note/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
