import styles from "./style.module.scss";

import { FC, useEffect, memo, useRef } from "react";

import { Container } from "../layout/Container";
import { CarIcon } from "./CarIcon";
import { Flag } from "./Flag";
import { Controls } from "./Controls";

import { ICarProps } from "../../typings/ICar";

export const Car: FC<ICarProps> = memo(
  ({
    name,
    id,
    color,
    onSelect,
    onRemove,
    onStart,
    onReset,
    isMove = false,
    status = "stop",
    velocity = 0,
    distance = 0,
  }) => {
    const animRef = useRef<Animation>();
    const carRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (status === "start") {
        animRef.current = carRef.current?.animate(
          {
            left: "100%",
          },
          {
            duration: distance / velocity,
            fill: "forwards",
          }
        );
      } else if (status === "stop") {
        animRef.current?.pause();
      } else {
        animRef.current = carRef.current?.animate(
          {
            left: "0",
          },
          {
            duration: 0,
            fill: "forwards",
          }
        );
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

    const handleReset = (): void => {
      onReset(id as number);
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
              onReset={handleReset}
              isMove={isMove}
            />
          </div>
          <div className={styles.carT}>
            <span className={styles.icon} ref={carRef}>
              <CarIcon color={color} />
            </span>
          </div>
          <Flag className={styles.flag} />
        </div>
      </Container>
    );
  }
);
