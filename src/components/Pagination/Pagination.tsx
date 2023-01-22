import styles from "./style.module.scss";

import { FC, ChangeEventHandler, memo } from "react";

import { IPaginationProps } from "../../typings/IPagination";

export const Pagination: FC<IPaginationProps> = memo(
  ({ limit, max, min = 1, currentPage, maxPage, onChange, onNext, onPrev }) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (+e.target.value > max || +e.target.value < min) return;
      onChange(+e.target.value);
    };

    const handlePrev = (): void => {
      onPrev();
    };

    const handleNext = (): void => {
      onNext();
    };

    return (
      <div className={styles.wrapper}>
        <input type="number" value={limit} onChange={handleChange} />
        <button
          className={styles.btn}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={styles.btn}
          onClick={handleNext}
          disabled={currentPage === maxPage}
        >
          Next
        </button>
        Page: {currentPage}
      </div>
    );
  }
);
