import styles from "./style.module.scss";

import { FC } from "react";

export const Controls: FC = () => {
  return (
    <div>
      <button
        className={styles.control}
      >
        A
      </button>
      <button
        className={styles.control}
      >
        B
      </button>
    </div>
  );
}