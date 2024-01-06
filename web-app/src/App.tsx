// src/components/App.tsx
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainPage from './components/MainPage';



const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;