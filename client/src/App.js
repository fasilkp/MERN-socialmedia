import React from 'react';
import Home from './Pages/Home';
import Friends from './Pages/Friends';
import './App.css';
import AddPost from './Pages/AddPost';
import Chat from './Pages/Chat';
import Register from './Pages/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/register" element={<Register />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
