import { FC } from "react";

import { ICar, ICarListProps } from "../../typings/ICar";
import { Container } from "../layout/Container";

import { Car } from "./Car";

export const CarList: FC<ICarListProps> = ({ cars, onSelect, onRemove }) => {
  return (
    <Container>
      {cars.map((car) => (
        <Car
          key={car.id}
          id={car.id}
          name={car.name}
          color={car.color}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      ))}
    </Container>
  );
};
