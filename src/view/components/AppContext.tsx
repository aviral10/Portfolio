import { createContext } from "react";
import { AppContext } from "./interfaces";

const AppContext = createContext<AppContext>({});

export default AppContext;
