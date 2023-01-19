import React from 'react';
import './styles/index.scss';

import ReactDOM from 'react-dom/client';

import App from './App';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Garage from "./pages/Garage";
import Winners from "./pages/Winners";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/winners" element={<Winners />} />
        <Route path="*" element={<Garage />} />
      </Routes>
    </App>
  </BrowserRouter>
);