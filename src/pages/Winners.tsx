import { FC, useCallback, useEffect, ChangeEventHandler } from "react";
import { garageApi, winnersApi } from "../api";
import { WinnersTable } from "../components/Car/WinnersTable";

import { Container } from "../components/layout/Container";
import { Pagination } from "../components/Pagination";
import { IGetWinners } from "../typings/IAPI";

import { ICar, IWinner, IWinnerCar } from "../typings/ICar";
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
    winnersApi
      .getWinners(page, limit, sortValue, order)
      .then((res: IGetWinners) => {
        setCount(res.count);
        return Promise.all(
          res.winners.map((winner: IWinner) =>
            garageApi
              .getCarById(winner.id)
              .then((car: ICar) => ({ ...winner, ...car }))
          )
        );
      })
      .then(setWinners);
  }, [page, limit, order, sortValue]);

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
        maxPage={Math.ceil(count ? count / limit : 1)}
        onChange={setLimit}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <WinnersTable winners={winners} />
    </Container>
  );
};

export default Winners;
