import { FC, useEffect } from "react";

const Winners: FC = () => {
  useEffect(() => {
    fetch("http://127.0.0.1:3000/winners")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return <>This is winners page!</>;
};

export default Winners;
