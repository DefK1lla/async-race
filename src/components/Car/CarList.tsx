import { FC } from "react";

import { ICarList } from "../../typings/ICar";
import { Container } from "../layout/Container";

import { Car } from "./Car";

export const CarList: FC<ICarList> = ({ cars }) => {
  return (
    <Container>
      {
        cars.map((car) => <Car key={car.id} id={car.id} name={car.name} color={car.color} />)
      }
    </Container>
  )
};