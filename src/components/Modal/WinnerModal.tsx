import styles from "./style.module.scss";

import { FC, useRef, useEffect } from "react";

export const WinnerModal: FC<{
  isOpen: boolean;
  onClose(): void;
  winner: string;
}> = ({ isOpen, onClose, winner }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClose);

    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  const handleClose = (e: Event) => {
    if (e.currentTarget !== modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${isOpen ? styles.open : null}`}
      ref={modalRef}
    >
      <button className={styles.close}>X</button>
      {winner} wins!
    </div>
  );
};
