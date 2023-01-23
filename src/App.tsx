import { FC, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Garage from "./pages/Garage";
import Winners from "./pages/Winners";

import { Header } from "./components/Header";

import { ICar, IWinnerCar } from "./typings/ICar";
import { IGarageContext } from "./typings/IGarage";
import {
  IWinnersContext,
  WinnersSortOrder,
  WinnersSortValue,
} from "./typings/IWinners";

const App: FC = () => {
  const [garagePage, setGaragePage] = useState<number>(1);
  const [garageLimit, setGarageLimit] = useState<number>(7);
  const [garageCount, setGarageCount] = useState<number>(0);
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar>({ name: "", color: "" });
  const [newCar, setNewCar] = useState<ICar>({ name: "", color: "#000000" });
  const [isRace, setIsRace] = useState<boolean>(false);

  const [winners, setWinners] = useState<IWinnerCar[]>([]);
  const [winnersPage, setWinnersPage] = useState<number>(1);
  const [winnersLimit, setWinnersLimit] = useState<number>(10);
  const [winnersCount, setWinnersCount] = useState<number>(0);
  const [winnersSortValue, setWinnersSortValue] =
    useState<WinnersSortValue>("id");
  const [winnersSortOrder, setWinnersSortOrder] =
    useState<WinnersSortOrder>("ASC");

  const GarageContext: IGarageContext = {
    page: garagePage,
    setPage: setGaragePage,
    limit: garageLimit,
    setLimit: setGarageLimit,
    count: garageCount,
    setCount: setGarageCount,
    cars,
    setCars,
    selectedCar,
    setSelectedCar,
    newCar,
    setNewCar,
    isRace,
    setIsRace,
  };

  const WinnersContext: IWinnersContext = {
    winners,
    setWinners,
    page: winnersPage,
    setPage: setWinnersPage,
    limit: winnersLimit,
    setLimit: setWinnersLimit,
    count: winnersCount,
    setCount: setWinnersCount,
    order: winnersSortOrder,
    setOrder: setWinnersSortOrder,
    sortValue: winnersSortValue,
    setSortValue: setWinnersSortValue,
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/winners" element={<Winners context={WinnersContext} />} />
        <Route path="*" element={<Garage context={GarageContext} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
