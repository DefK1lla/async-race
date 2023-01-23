import { FC, useCallback, useEffect, useState, ReactNode } from "react";
import { WinnersTable } from "../components/Car/WinnersTable";

import { Container } from "../components/layout/Container";
import { Pagination } from "../components/Pagination";

import { ICar, IWinner, IWinnerCar } from "../typings/ICar";
import { IWinnersProps } from "../typings/IWinners";

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
  } = context;

  useEffect(() => {
    fetch(
      `http://127.0.0.1:3000/winners?_limit=${limit}&_page=${page}&_sort=id&_order=ASC`
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
  }, [page, limit]);

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

  return (
    <Container>
      Winners count: {count}
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
