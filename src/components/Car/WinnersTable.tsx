import styles from "./style.module.scss";

import { FC, memo, ReactNode } from "react";
import { ITableProps, IWinnerCar } from "../../typings/ICar";
import { CarIcon } from "./CarIcon";

export const WinnersTable: FC<ITableProps> = memo(({ winners }) => {
  return (
    <table>
      <thead>
        <tr className={styles.tr}>
          <th>ID</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best time</th>
        </tr>
      </thead>
      <tbody>
        {winners.map(
          (winner: IWinnerCar): ReactNode => (
            <tr className={styles.tr} key={winner.id}>
              <td>{winner.id}</td>
              <td>
                <CarIcon className={styles.icon_sm} color={winner.color} />
              </td>
              <td>{winner.name}</td>
              <td>{winner.wins}</td>
              <td>{winner.time}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
});
