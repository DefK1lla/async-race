import styles from "./style.module.scss";

import { FC } from "react";

import { Container } from "../layout/Container";
import { CarIcon } from "./CarIcon";
import { Flag } from "./Flag";
import { Controls } from "./Controls";

export const Car: FC = () => {
  return (
    <Container>
      <div
        className={styles.track}
      >
        <Controls />
        <CarIcon className={styles.icon} />
        <Flag className={styles.flag} />
      </div>
    </Container>
  );
}