import { start } from "repl";
import { IGetCars } from "../typings/IAPI";
import { ICar, IWinner } from "../typings/ICar";
import { IRace } from "../typings/IRace";

class GarageAPI {
  getCars = async (limit: number, page: number): Promise<IGetCars> => {
    const res = await fetch(
      `http://127.0.0.1:3000/garage?_limit=${limit}&_page=${page}`
    );
    const count: string | null = res.headers.get("X-Total-Count");
    const cars: ICar[] = await res.json();
    return { cars, count: Number(count) };
  };

  getCarById = async (id: number): Promise<ICar> => {
    return fetch(`http://127.0.0.1:3000/garage/${id}`).then((res: Response) =>
      res.json()
    );
  };

  createCar = async (car: ICar): Promise<void> => {
    fetch("http://127.0.0.1:3000/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
  };

  updateCar = async (car: ICar): Promise<void> => {
    fetch(`http://127.0.0.1:3000/garage/${car.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });
  };

  removeCar = async (id: number): Promise<void> => {
    fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  startCar = async (
    id: number,
    startController: AbortController
  ): Promise<IRace> => {
    return fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
      method: "PATCH",
      signal: startController.signal,
    }).then((res: Response) => res.json());
  };

  driveCar = async (
    car: IWinner,
    driveController: AbortController
  ): Promise<boolean> => {
    return fetch(`http://127.0.0.1:3000/engine?id=${car.id}&status=drive`, {
      method: "PATCH",
      signal: driveController.signal,
    }).then((res: Response) => res.ok);
  };
}

export default new GarageAPI();
