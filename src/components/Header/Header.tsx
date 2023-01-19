import styles from "./style.module.scss";

import { FC } from "react";
import { Link } from "react-router-dom";
import { Container } from "../layout/Container";

export const Header: FC<{}> = () => {
  return (
    <header>
      <Container>
        <Link
          to="/"
          className={styles.link}
        >
          Garage
        </Link>

        <Link
          to="/winners"
          className={styles.link}
        >
          Winners
        </Link>
      </Container>
    </header>
  )
};