import styles from "./style.module.scss";

import { FC, MouseEventHandler } from "react";
import { IControlsProps } from "../../typings/ICar";

export const Controls: FC<IControlsProps> = ({ onSelect, onRemove }) => {
  const handleSelect: MouseEventHandler<HTMLButtonElement> = (e) => {
    onSelect();
  };

  const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
    onRemove();
  };

  return (
    <div>
      <button className={styles.control}>A</button>
      <button className={styles.control}>B</button>

      <button className={styles.control} onClick={handleSelect}>
        Select
      </button>
      <button className={styles.control} onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
};
