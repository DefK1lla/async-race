import { FC, useEffect, useState } from "react";

import { CarForm, CarsCount } from "../components/Car";
import { CarList } from "../components/Car";
import { Container } from "../components/layout/Container";

import { ICar } from "../typings/ICar";

const Garage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [count, setCount] = useState<number>(0);
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/garage?_limit=${limit}&_page=${page}`)
      .then((res: Response) => {
        const count: string | null = res.headers.get("X-Total-Count");
        setCount(Number(count));
        return res.json();
      })
      .then((cars: ICar[]) => setCars(cars));
  }, []);

  return (
    <Container>
      <CarForm />
      <CarForm
        name={selectedCar?.name}
        color={selectedCar?.color}
        isEdit
      />
      <CarsCount count={count} />
      <CarList cars={cars} />
    </Container>
  );
}

export default Garage;