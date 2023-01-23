import styles from "./style.module.scss";

import { FC, MouseEventHandler } from "react";
import { IControlsProps } from "../../typings/ICar";

export const Controls: FC<IControlsProps> = ({
  onSelect,
  onRemove,
  onStart,
  onReset,
  isMove = false,
}) => {
  const handleSelect: MouseEventHandler<HTMLButtonElement> = (e) => {
    onSelect();
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    onRemove();
  };

  const handleStart: MouseEventHandler<HTMLButtonElement> = (e) => {
    onStart();
  };

  const handleReset: MouseEventHandler<HTMLButtonElement> = (e) => {
    onReset();
  };

  return (
    <div>
      <button
        className={styles.control}
        onClick={handleStart}
        disabled={isMove}
      >
        A
      </button>
      <button
        className={styles.control}
        onClick={handleReset}
        disabled={!isMove}
      >
        B
      </button>

      <button className={styles.control} onClick={handleSelect}>
        Select
      </button>
      <button className={styles.control} onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};
