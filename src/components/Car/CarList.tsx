import { FC, memo } from "react";

import { ICar, ICarListProps } from "../../typings/ICar";
import { Container } from "../layout/Container";

import { Car } from "./Car";

export const CarList: FC<ICarListProps> = memo(
  ({ cars, onSelect, onRemove, onStart }) => {
    return (
      <Container>
        {cars.map((car) => (
          <Car
            key={car.id}
            id={car.id}
            name={car.name}
            color={car.color}
            status={car.status}
            onSelect={onSelect}
            onRemove={onRemove}
            onStart={onStart}
          />
        ))}
      </Container>
    );
  }
);
