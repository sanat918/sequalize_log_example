import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './components/Login';
import HomePage from './components/Homepage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<SessionTimeoutHandler><HomePage /></SessionTimeoutHandler>} />
      </Routes>
    </Router>
  );
};

// Higher-order component to handle session timeout
const SessionTimeoutHandler = ({ children }) => {
  const [isSessionActive, setIsSessionActive] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    const startSessionTimeout = () => {
      timeoutId = setTimeout(() => {
        setIsSessionActive(false);
        navigate('/');
      }, 10000); // 1 minute timeout
    };

    const resetSessionTimeout = () => {
      clearTimeout(timeoutId);
      startSessionTimeout();
    };

    const events = ['mousemove', 'keydown', 'click'];

    events.forEach(event => window.addEventListener(event, resetSessionTimeout));

    startSessionTimeout();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetSessionTimeout));
    };
  }, [navigate]);

  return isSessionActive ? children : null;
};

export default App;
