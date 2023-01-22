import styles from "./style.module.scss";

import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Container } from "../layout/Container";

export const Header: FC = memo(() => {
  return (
    <header className={styles.header}>
      <Container>
        <Link to="/" className={styles.link}>
          Garage
        </Link>

        <Link to="/winners" className={styles.link}>
          Winners
        </Link>
      </Container>
    </header>
  );
});
