export interface ICarFormProps {
  isEdit?: boolean,
  value?: {
    name: string,
    color: string
  },
  onChange?(car: ICar): void,
  onSubmit?(car: ICar): void
};

export interface ICarIconProps {
  color?: string,
  className?: string
};

export interface IFlagProps {
  className?: string
};

export interface ICar {
  color: string,
  id?: number,
  name: string,
  status?: "start" | "stop" | "drive" | "reset"
};

export interface ICarProps {
  color: string,
  id?: number,
  name: string,
  onSelect(car: ICar): void,
  onRemove(id: number): void
};

export interface ICarListProps {
  cars: ICar[],
  onSelect(car: ICar): void,
  onRemove(id: number): void
};

export interface IControlsProps {
  onSelect(): void,
  onRemove(): void
};