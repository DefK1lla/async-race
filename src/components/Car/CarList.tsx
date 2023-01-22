import { FC, memo } from "react";

import { ICar, ICarListProps } from "../../typings/ICar";
import { Container } from "../layout/Container";

import { Car } from "./Car";

export const CarList: FC<ICarListProps> = memo(
  ({ cars, onSelect, onRemove, onStart, onReset }) => {
    return (
      <Container>
        {cars.map((car) => (
          <Car
            key={car.id}
            id={car.id}
            name={car.name}
            color={car.color}
            status={car.status}
            velocity={car.velocity}
            distance={car.distance}
            isMove={car.isMove}
            onSelect={onSelect}
            onRemove={onRemove}
            onStart={onStart}
            onReset={onReset}
          />
        ))}
      </Container>
    );
  }
);
