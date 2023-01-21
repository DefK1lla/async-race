import styles from "./style.module.scss";

import { FC } from "react";

export const CarsCount: FC<{ count: number }> = ({ count }) => {
  return (
    <div className={styles.count}>Cars in garage: {count}</div>
  );
};