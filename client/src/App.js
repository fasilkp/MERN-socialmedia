import React,{useContext} from 'react';
import Home from './Pages/Home';
import Friends from './Pages/Friends';
import './App.css';
import AddPost from './Pages/AddPost';
import Chat from './Pages/Chat';
import Register from './Pages/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewPost from './Pages/ViewPost';
import axios from 'axios'
import AuthContext from './context/AuthContext'
import { useEffect } from 'react';
import NotFound from './Components/NotFound/NotFound';
import FriendsComp from './Components/friendsComp/FriendsComp';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080/api';

function App() {
  const {loggedIn, updateLogin}=useContext(AuthContext);
  useEffect(()=>{
    updateLogin();
  },[])
  return (
    
      <BrowserRouter>
          <div className="App">
            {loggedIn && 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/friends-comp" element={<FriendsComp />} />
                <Route path="/add-post" element={<AddPost />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user/:userName" element={<Profile />} />
                <Route path="/post/:postId" element={<ViewPost />} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
            }
            {loggedIn===false && 
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/friends" element={<Login />} />
                <Route path="/add-post" element={<Login />} />
                <Route path="/chat" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Login />} />
                <Route path="/post/:postId" element={<Login />} />
                <Route path="*" element={ <NotFound/> } />
            </Routes>
            }
          </div>
      </BrowserRouter>
  );
}

export default App;
