import { Dispatch, SetStateAction } from "react";

import { IWinner, IWinnerCar } from "./ICar";

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
  order: WinnersSortOrder;
  setOrder: Dispatch<SetStateAction<WinnersSortOrder>>;
  sortValue: WinnersSortValue;
  setSortValue: Dispatch<SetStateAction<WinnersSortValue>>;
}

export type WinnersSortOrder = "ASC" | "DESC";

export type WinnersSortValue = keyof IWinner;
