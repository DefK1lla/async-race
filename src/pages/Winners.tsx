import {
  FC,
  useCallback,
  useEffect,
  useState,
  ReactNode,
  ChangeEventHandler,
} from "react";
import { WinnersTable } from "../components/Car/WinnersTable";

import { Container } from "../components/layout/Container";
import { Pagination } from "../components/Pagination";

import { ICar, IWinner } from "../typings/ICar";
import {
  IWinnersProps,
  WinnersSortOrder,
  WinnersSortValue,
} from "../typings/IWinners";

const Winners: FC<IWinnersProps> = ({ context }) => {
  const {
    winners,
    setWinners,
    page,
    setPage,
    limit,
    setLimit,
    count,
    setCount,
    order,
    setOrder,
    sortValue,
    setSortValue,
  } = context;

  useEffect(() => {
    fetch(
      `http://127.0.0.1:3000/winners?_page=${page}&_limit=${limit}&_sort=${sortValue}&_order=${order}`
    )
      .then((res: Response) => {
        const count: string | null = res.headers.get("X-Total-Count");
        setCount(Number(count));
        return res.json();
      })
      .then((winners: IWinner[]) =>
        Promise.all(
          winners.map((winner: IWinner) =>
            getCar(winner.id).then((car: ICar) => ({ ...winner, ...car }))
          )
        )
      )
      .then(setWinners);
  }, [page, limit, order, sortValue]);

  const getCar = (id: number) => {
    return fetch(`http://127.0.0.1:3000/garage/${id}`).then((res: Response) =>
      res.json()
    );
  };

  const handlePrev = useCallback((): void => {
    setPage((prevState) => prevState - 1);
  }, []);

  const handleNext = useCallback((): void => {
    setPage((prevState) => prevState + 1);
  }, []);

  const handleOrderChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ): void => {
    setOrder(e.target.value as WinnersSortOrder);
  };

  const handleValueChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ): void => {
    setSortValue(e.target.value as WinnersSortValue);
  };

  return (
    <Container>
      Winners count: {count}
      <div>
        <select value={order} onChange={handleOrderChange}>
          <option value={"ASC"}>ASC</option>
          <option value={"DESC"}>DESC</option>
        </select>

        <select value={sortValue} onChange={handleValueChange}>
          <option value={"id"}>id</option>
          <option value={"name"}>name</option>
          <option value={"wins"}>wins</option>
          <option value={"time"}>time</option>
        </select>
      </div>
      <Pagination
        limit={Math.min(limit, winners.length)}
        max={count}
        currentPage={page}
        maxPage={Math.ceil(count / limit)}
        onChange={setLimit}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <WinnersTable winners={winners} />
    </Container>
  );
};

export default Winners;
