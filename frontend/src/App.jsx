import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Ai from './components/Ai'
import Chat from './components/Chat'
import Settings from './components/Settings'
import './App.css';
function App() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/ai' element={<Ai/>}></Route>
            <Route path='/chat' element={<Chat/>}></Route>
            <Route path='/settings' element={<Settings/>}></Route>
        </Routes>
    </Router>
  )
}

export default App
