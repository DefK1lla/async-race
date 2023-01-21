import styles from "./style.module.scss";

import { FC } from "react";

import { Container } from "../layout/Container";
import { CarIcon } from "./CarIcon";
import { Flag } from "./Flag";
import { Controls } from "./Controls";

import { ICarProps } from "../../typings/ICar";

export const Car: FC<ICarProps> = ({ name, id, color, onSelect, onRemove }) => {
  const handleSelect = (): void => {
    onSelect({ name, id, color });
  };

  const handleRemove = (): void => {
    onRemove(id as number);
  };

  return (
    <Container>
      <div className={styles.track}>
        <div className={styles.header}>
          {name}
          <Controls onSelect={handleSelect} onRemove={handleRemove} />
        </div>
        <CarIcon className={styles.icon} color={color} />
        <Flag className={styles.flag} />
      </div>
    </Container>
  );
};
