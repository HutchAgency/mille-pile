import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MillePileGame from './components/MillePileGame';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MillePileGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;