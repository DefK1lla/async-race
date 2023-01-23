import { IRace } from "./IRace";

export interface ICarFormProps {
  isEdit?: boolean;
  value?: {
    name: string;
    color: string;
  };
  onChange?(car: ICar): void;
  onSubmit?(car: ICar): void;
}

export interface ICarIconProps {
  color?: string;
  className?: string;
}

export interface IFlagProps {
  className?: string;
}

export interface ICar {
  color: string;
  id?: number;
  name: string;
  status?: "start" | "stop" | "reset";
  velocity?: number;
  distance?: number;
  isMove?: boolean;
  driveController?: AbortController;
}

export interface ICarProps extends ICar {
  onSelect(car: ICar): void;
  onRemove(id: number): void;
  onStart(id: number): void;
  onReset(id: number): void;
  isMove?: boolean;
}

export interface ICarListProps {
  cars: ICar[];
  onSelect(car: ICar): void;
  onRemove(id: number): void;
  onStart(id: number): void;
  onReset(id: number): void;
}

export interface IControlsProps {
  onSelect(): void;
  onRemove(): void;
  onStart(): void;
  onReset(): void;
  isMove?: boolean;
}

export interface IWinner {
  wins: number;
  time: number;
  id: number;
}

export interface IWinnerCar extends ICar {
  wins: number;
  time: number;
  id: number;
}

export interface ITableProps {
  winners: IWinnerCar[];
}
