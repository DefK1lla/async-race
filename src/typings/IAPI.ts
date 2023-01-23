import { ICar, IWinner } from "./ICar";

export interface IGetCars {
  cars: ICar[];
  count: number;
}

export interface IGetWinners {
  winners: IWinner[];
  count: number;
}
