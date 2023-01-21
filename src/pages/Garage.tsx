import { FC, useEffect, useState } from "react";

import { CarForm, CarsCount } from "../components/Car";
import { CarList } from "../components/Car";
import { Container } from "../components/layout/Container";
import { Pagination } from "../components/Pagination";

import { ICar } from "../typings/ICar";

const Garage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(7);
  const [count, setCount] = useState<number>(0);
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar>({ name: "", color: "" });
  const [newCar, setNewCar] = useState<ICar>({ name: "", color: "" });

  useEffect(() => {
    getCars();
  }, [page, limit]);

  const getCars = (): void => {
    fetch(`http://127.0.0.1:3000/garage?_limit=${limit}&_page=${page}`)
      .then((res: Response) => {
        const count: string | null = res.headers.get("X-Total-Count");
        setCount(Number(count));
        return res.json();
      })
      .then((cars: ICar[]) => setCars(cars));
  };

  const handleUpdate = (car: ICar): void => {
    fetch(`http://127.0.0.1:3000/garage/${car.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    }).then(() => getCars());
  };

  const handleCreate = (car: ICar): void => {
    fetch("http://127.0.0.1:3000/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    }).then(() => getCars());
  };

  const handleSelect = (car: ICar): void => {
    setSelectedCar(car);
  };

  const handleRemove = (id: number): void => {
    fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getCars());
  };

  const handleNext = (): void => {
    setPage((prevState) => prevState + 1);
  };

  const handlePrev = (): void => {
    setPage((prevState) => prevState - 1);
  };

  return (
    <Container>
      <CarForm value={newCar} onChange={setNewCar} onSubmit={handleCreate} />
      <CarForm
        onChange={setSelectedCar}
        value={selectedCar}
        onSubmit={handleUpdate}
        isEdit
      />
      <CarsCount count={count} />
      <Pagination
        limit={limit}
        max={count}
        currentPage={page}
        maxPage={Math.ceil(count / limit)}
        onChange={setLimit}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <CarList
        cars={cars}
        page={page}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
    </Container>
  );
};

export default Garage;
