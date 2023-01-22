import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { runInThisContext } from "vm";

import { CarForm, CarsCount } from "../components/Car";
import { CarList } from "../components/Car";
import { Container } from "../components/layout/Container";
import { Pagination } from "../components/Pagination";

import { ICar } from "../typings/ICar";
import { IRace } from "../typings/IRace";

const Garage: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(7);
  const [count, setCount] = useState<number>(0);
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar>({ name: "", color: "" });
  const [newCar, setNewCar] = useState<ICar>({ name: "", color: "" });
  const [isAborted, setIsAborted] = useState<boolean>(false);

  useEffect(() => {
    getCars();
  }, [page, limit]);

  const getCars = useCallback((): void => {
    fetch(`http://127.0.0.1:3000/garage?_limit=${limit}&_page=${page}`)
      .then((res: Response) => {
        const count: string | null = res.headers.get("X-Total-Count");
        setCount(Number(count));
        return res.json();
      })
      .then((cars: ICar[]) => setCars(cars));
  }, []);

  const handleUpdate = useCallback((car: ICar): void => {
    fetch(`http://127.0.0.1:3000/garage/${car.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    }).then(() => getCars());
  }, []);

  const handleCreate = useCallback((car: ICar): void => {
    fetch("http://127.0.0.1:3000/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    }).then(() => getCars());
  }, []);

  const handleSelect = useCallback((car: ICar): void => {
    setSelectedCar(car);
  }, []);

  const handleReset = useCallback((id: number): void => {
    setCars((prevState) => {
      const car = prevState.find((car: ICar) => car.id === id);
      car?.driveController?.abort();
      return prevState.map((car: ICar) =>
        car.id === id ? { ...car, status: "reset", isMove: false } : car
      );
    });
  }, []);

  const handleRemove = useCallback((id: number): void => {
    const car = cars.find((car: ICar) => car.id === id);
    car?.driveController?.abort();
    fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getCars());
  }, []);

  const handleNext = useCallback((): void => {
    setPage((prevState) => prevState + 1);
  }, []);

  const handlePrev = useCallback((): void => {
    setPage((prevState) => prevState - 1);
  }, []);

  const handleCarStart = useCallback((id: number): void => {
    fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
      method: "PATCH",
    })
      .then((res: Response) => res.json())
      .then((params: IRace) => {
        setCars((prevState): ICar[] => {
          return prevState.map((car: ICar) =>
            car.id === id
              ? {
                  ...car,
                  ...params,
                  status: "start",
                  isMove: true,
                }
              : car
          );
        });
        return id;
      })
      .then(handleCarDrive);
  }, []);

  const handleCarDrive = useCallback((id: number): void => {
    const driveController = new AbortController();
    setCars((prevState) =>
      prevState.map((car: ICar) =>
        car.id === id ? { ...car, driveController } : car
      )
    );
    fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
      method: "PATCH",
      signal: driveController.signal,
    })
      .then((res: Response) => {
        if (res.ok) {
          setCars((prevState): ICar[] => {
            return prevState.map((car: ICar) =>
              car.id === id ? { ...car, status: undefined } : car
            );
          });
        } else {
          throw new Error("stop");
        }
      })
      .catch(() => {
        setCars((prevState): ICar[] => {
          return prevState.map((car: ICar) =>
            car.id === id ? { ...car, status: "stop" } : car
          );
        });
      });
  }, []);

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
        limit={Math.min(limit, cars.length)}
        max={count}
        currentPage={page}
        maxPage={Math.ceil(count / limit)}
        onChange={setLimit}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <CarList
        cars={cars}
        onSelect={handleSelect}
        onRemove={handleRemove}
        onStart={handleCarStart}
        onReset={handleReset}
      />
    </Container>
  );
};

export default Garage;
