import './App.css';
import React, { useEffect } from 'react';
import router from './router';
import { useRoutes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const content = useRoutes(router);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return <div className="flex flex-col justify-between App ">{content}</div>;
}

export default App;
