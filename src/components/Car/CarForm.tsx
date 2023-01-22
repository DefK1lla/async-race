import styles from "./style.module.scss";

import { ChangeEventHandler, FC, FormEventHandler } from "react";

import { Container } from "../layout/Container";

import { ICarFormProps } from "../../typings/ICar";

export const CarForm: FC<ICarFormProps> = ({
  isEdit = false,
  value = {
    color: "#00000",
    name: "",
  },
  onChange,
  onSubmit,
}) => {
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.({ ...value, name: e.target.value });
  };

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.({ ...value, color: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={value.name}
          placeholder="Car name"
          onChange={handleNameChange}
        />
        <input type="color" value={value.color} onChange={handleColorChange} />
        <button type="submit">{isEdit ? "Update" : "Create"}</button>
      </form>
    </Container>
  );
};
