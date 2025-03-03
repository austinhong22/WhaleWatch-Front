import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:postId" element={<PostDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;