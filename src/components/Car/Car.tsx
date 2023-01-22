import styles from "./style.module.scss";

import { FC, useEffect, memo } from "react";

import { Container } from "../layout/Container";
import { CarIcon } from "./CarIcon";
import { Flag } from "./Flag";
import { Controls } from "./Controls";

import { ICarProps } from "../../typings/ICar";

export const Car: FC<ICarProps> = memo(
  ({ name, id, color, status = "stop", onSelect, onRemove, onStart }) => {
    useEffect(() => {
      if (status === "stop") {
        console.log("stopped");
      } else if (status === "start") {
        console.log("started");
      } else if (status === "reset") {
        console.log("reset");
      }
    }, [status]);

    const handleSelect = (): void => {
      onSelect({ name, id, color });
    };

    const handleRemove = (): void => {
      onRemove(id as number);
    };

    const handleStart = (): void => {
      onStart(id as number);
    };

    return (
      <Container>
        <div className={styles.track}>
          <div className={styles.header}>
            {name}
            <Controls
              onSelect={handleSelect}
              onRemove={handleRemove}
              onStart={handleStart}
            />
          </div>
          <CarIcon className={styles.icon} color={color} />
          <Flag className={styles.flag} />
        </div>
      </Container>
    );
  }
);
