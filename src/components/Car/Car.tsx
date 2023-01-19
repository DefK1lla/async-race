import styles from "./style.module.scss";

import { FC } from "react";

import { Container } from "../layout/Container";
import { CarIcon } from "./CarIcon";
import { Flag } from "./Flag";
import { Controls } from "./Controls";

import { ICar } from "../../typings/ICar";

export const Car: FC<ICar> = ({ name, id, color }) => {
  return (
    <Container>
      <div
        className={styles.track}
      >
        <div className={styles.header}>
          {name}
          <Controls />
        </div>
        <CarIcon className={styles.icon} color={color} />
        <Flag className={styles.flag} />
      </div>
    </Container>
  );
}