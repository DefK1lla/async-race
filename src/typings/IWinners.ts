import { Dispatch, SetStateAction } from "react";

import { IWinnerCar } from "./ICar";

export interface IWinnersProps {
  context: IWinnersContext;
}

export interface IWinnersContext {
  page: number;
  limit: number;
  count: number;
  winners: IWinnerCar[];
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
  setCount: Dispatch<SetStateAction<number>>;
  setWinners: Dispatch<SetStateAction<IWinnerCar[]>>;
}
