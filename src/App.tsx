import { FC, ReactNode } from "react";

import { Header } from "./components/Header";

const App: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default App;
