import { FC, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Garage from "./pages/Garage";
import Winners from "./pages/Winners";

import { Header } from "./components/Header";

import { ICar, IWinner } from "./typings/ICar";
import { IGarageContext } from "./typings/IGarage";

const App: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(7);
  const [count, setCount] = useState<number>(0);
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar>({ name: "", color: "" });
  const [newCar, setNewCar] = useState<ICar>({ name: "", color: "#000000" });
  const [isRace, setIsRace] = useState<boolean>(false);

  const GarageContext: IGarageContext = {
    page,
    setPage,
    limit,
    setLimit,
    count,
    setCount,
    cars,
    setCars,
    selectedCar,
    setSelectedCar,
    newCar,
    setNewCar,
    isRace,
    setIsRace,
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/winners" element={<Winners />} />
        <Route path="*" element={<Garage context={GarageContext} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
