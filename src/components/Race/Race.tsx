import styles from "./style.module.scss";

import { FC } from "react";
import { IRaceProps } from "../../typings/IRace";

export const Race: FC<IRaceProps> = ({ isStarted, onStart, onReset }) => {
  const handleStart = (): void => {
    onStart();
  };

  const handleReset = (): void => {
    onReset();
  };

  return (
    <div>
      <button className={styles.btn} onClick={handleStart} disabled={isStarted}>
        Start
      </button>
      <button className={styles.btn} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};
