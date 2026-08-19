import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login'; // Importing your new component

function App() {
  return (
    <Router>
      <Routes>
        {/* Make the Login page the default home route */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;