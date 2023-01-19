export interface ICarForm {
  isEdit?: boolean,
  name?: string,
  color?: string
};

export interface ICarIcon {
  color?: string,
  className?: string
};

export interface IFlag {
  className?: string
};

export interface ICar {
  color: string,
  id: number,
  name: string
};

export interface ICarList {
  cars: ICar[]
};