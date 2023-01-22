import { FC, ReactNode } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Garage from "./pages/Garage";
import Winners from "./pages/Winners";

import { Header } from "./components/Header";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/winners" element={<Winners />} />
        <Route path="*" element={<Garage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
