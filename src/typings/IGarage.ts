import { Dispatch, SetStateAction } from "react";

import { ICar, IWinner } from "./ICar";

export interface IGarageProps {
  context: IGarageContext;
}

export interface IGarageContext {
  page: number;
  limit: number;
  count: number;
  isRace: boolean;
  newCar: ICar;
  selectedCar: ICar;
  cars: ICar[];
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  setCount: Dispatch<SetStateAction<number>>;
  setCars: Dispatch<SetStateAction<ICar[]>>;
  setSelectedCar: Dispatch<SetStateAction<ICar>>;
  setNewCar: Dispatch<SetStateAction<ICar>>;
  setIsRace: Dispatch<SetStateAction<boolean>>;
}
