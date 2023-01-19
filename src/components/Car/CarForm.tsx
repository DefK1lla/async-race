import styles from "./style.module.scss";

import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

import { Container } from "../layout/Container";

export const CarForm: FC<{ isEdit?: boolean, name?: string, color?: string }> = ({
  isEdit = false,
  color = "#00000",
  name = ""
}) => {
  const [nameValue, setNameValue] = useState<string>(name);
  const [colorValue, setColorValue] = useState<string>(color);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNameValue(e.target.value);
  };

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setColorValue(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(colorValue, nameValue)
  }

  return (
    <Container>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={nameValue}
          placeholder="Car name"
          onChange={handleNameChange}
        />
        <input
          type="color"
          value={colorValue}
          onChange={handleColorChange}
        />
        <button
          type="submit"
        >
          {isEdit ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
      </form>
    </Container>
  );
}