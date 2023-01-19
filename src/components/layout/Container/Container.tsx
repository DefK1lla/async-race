import styles from "./style.module.scss";

import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}