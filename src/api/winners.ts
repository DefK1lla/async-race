import { IGetWinners } from "../typings/IAPI";
import { ICar, IWinner } from "../typings/ICar";
import { WinnersSortOrder, WinnersSortValue } from "../typings/IWinners";

class WinnersAPI {
  getWinners = async (
    page: number,
    limit: number,
    sortValue: WinnersSortValue,
    order: WinnersSortOrder
  ): Promise<IGetWinners> => {
    const res = await fetch(
      `http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}&_sort=${sortValue}&_order=${order}`
    );
    const count: string | null = res.headers.get("X-Total-Count");
    const winners = await res.json();
    return { winners, count: Number(count) };
  };

  getWinner = async (id: number): Promise<IWinner | {}> => {
    return fetch(`http://127.0.0.1:3000/winners/${id}`).then(
      (res: Response): IWinner | {} => res.json()
    );
  };

  updateWinner = async (winner: IWinner): Promise<void> => {
    fetch(`http://127.0.0.1:3000/winners/${winner.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...winner, wins: winner.wins + 1 }),
    });
  };

  createWinner = async (id: number, time: number): Promise<void> => {
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
  };

  removeWinner = async (id: number): Promise<void> => {
    fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}

export default new WinnersAPI();
