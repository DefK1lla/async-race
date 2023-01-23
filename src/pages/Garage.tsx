import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { runInThisContext } from "vm";

import { CarForm, CarsCount, CarList } from "../components/Car";
import { Container } from "../components/layout/Container";
import { Pagination } from "../components/Pagination";
import { Race } from "../components/Race";

import { ICar, IWinner } from "../typings/ICar";
import { IGarageProps } from "../typings/IGarage";
import { IRace } from "../typings/IRace";

const Garage: FC<IGarageProps> = ({ context }) => {
  const {
    page,
    setPage,
    limit,
    setLimit,
    count,
    setCount,
    cars,
    setCars,
    selectedCar,
    setSelectedCar,
    newCar,
    setNewCar,
    isRace,
    setIsRace,
  } = context;

  useEffect(() => {
    getCars();
    // return handleRaceReset;
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

  const regWinner = useCallback(
    (winner: IWinner) => {
      fetch(`http://127.0.0.1:3000/winners/${winner.id}`).then(
        (res: Response) => {
          if (res.ok) {
            res.json().then(updateWinner);
          } else {
            const car = cars.find((car: ICar) => car.id === winner.id);
            createWinner(winner.id, winner.time);
          }
        }
      );
    },
    [cars]
  );

  const updateWinner = useCallback((winner: IWinner) => {
    fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...winner, wins: winner.wins + 1 }),
    });
  }, []);

  const createWinner = useCallback((id: number, time: number) => {
    const winner = {
      id,
      wins: 1,
      time,
    };
    fetch("http://127.0.0.1:3000/winners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(winner),
    });
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
    if (cars.every((car: ICar) => car.status !== "start")) setIsRace(false);
  }, []);

  const handleRemove = useCallback(
    (id: number): void => {
      const car = cars.find((car: ICar) => car.id === id);
      car?.driveController?.abort();
      fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => getCars());
    },
    [cars]
  );

  const handleCarStart = useCallback(
    (id: number) => {
      startCar(id);
    },
    [cars]
  );

  const handleNext = useCallback((): void => {
    setPage((prevState) => prevState + 1);
  }, []);

  const handlePrev = useCallback((): void => {
    setPage((prevState) => prevState - 1);
  }, []);

  const startCar = useCallback(
    async (id: number): Promise<IWinner> => {
      return fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
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
          return {
            id,
            time: params.distance / params.velocity / 1000,
          } as IWinner;
        });
    },
    [cars]
  );

  const driveCar = useCallback(
    async (car: IWinner): Promise<IWinner> => {
      const driveController = new AbortController();
      setCars((prevState) =>
        prevState.map((c: ICar) =>
          c.id === car.id ? { ...c, driveController } : c
        )
      );

      return fetch(`http://127.0.0.1:3000/engine?id=${car.id}&status=drive`, {
        method: "PATCH",
        signal: driveController.signal,
      }).then((res: Response) => {
        if (res.ok) {
          setCars((prevState): ICar[] => {
            return prevState.map((c: ICar) =>
              c.id === car.id ? { ...c, status: undefined } : c
            );
          });
          return car;
        } else {
          setCars((prevState): ICar[] => {
            return prevState.map((c: ICar) =>
              c.id === car.id ? { ...c, status: "stop" } : c
            );
          });
        }
        throw new Error("stop");
      });
    },
    [cars]
  );

  const handleRaceStart = useCallback(() => {
    setIsRace(true);
    Promise.any(
      cars.map((car: ICar) => startCar(car.id as number).then(driveCar))
    ).then(regWinner);
  }, [cars]);

  const handleRaceReset = useCallback(() => {
    cars.map((car: ICar) => handleReset(car.id as number));
    setIsRace(false);
  }, [cars]);

  return (
    <Container>
      <CarForm value={newCar} onChange={setNewCar} onSubmit={handleCreate} />
      <CarForm
        onChange={setSelectedCar}
        value={selectedCar}
        onSubmit={handleUpdate}
        isEdit
      />
      <Race
        onStart={handleRaceStart}
        onReset={handleRaceReset}
        isStarted={isRace}
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
        onSelect={handleSelect}
        onRemove={handleRemove}
        onStart={handleCarStart}
        onReset={handleReset}
      />
    </Container>
  );
};

export default Garage;
