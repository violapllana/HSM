import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

// Sigurohuni që eksportoni `App` si `default`
export default App;
