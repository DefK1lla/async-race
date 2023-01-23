import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { CarForm, CarsCount, CarList } from "../components/Car";
import { Container } from "../components/layout/Container";
import { Pagination } from "../components/Pagination";
import { Race } from "../components/Race";

import { garageApi, winnersApi } from "../api";

import { ICar, IWinner } from "../typings/ICar";
import { IGarageProps } from "../typings/IGarage";
import { IRace } from "../typings/IRace";
import { IGetCars } from "../typings/IAPI";

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
    return handleRaceReset;
  }, [page, limit]);

  const getCars = (): void => {
    garageApi.getCars(limit, page).then((res: IGetCars) => {
      setCars(res.cars);
      setCount(res.count);
    });
  };

  const regWinner = useCallback(
    (winner: IWinner) => {
      winnersApi.getWinner(winner.id).then((exsistedWinner: IWinner | {}) => {
        if ("time" in exsistedWinner) {
          winnersApi.updateWinner(exsistedWinner);
        } else {
          winnersApi.createWinner(winner.id, winner.time);
        }
      });
    },
    [cars]
  );

  const handleUpdate = useCallback((car: ICar): void => {
    garageApi.updateCar(car).then(() => getCars());
  }, []);

  const handleCreate = useCallback((car: ICar): void => {
    garageApi.createCar(car).then(() => getCars());
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
      garageApi.removeCar(id).then(() => getCars());
      winnersApi.removeWinner(id);
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
      return garageApi.startCar(id).then((params: IRace) => {
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
          time: Math.ceil(params.distance / params.velocity / 1000),
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

      return garageApi.driveCar(car, driveController).then((res: boolean) => {
        if (res) {
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
    )
      .then(regWinner)
      .catch(() => console.log("all cars are broken"));
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
