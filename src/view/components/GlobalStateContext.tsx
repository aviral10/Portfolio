import { createContext } from "react";
import { Hamburger } from "./interfaces";

const GlobalStateContext = createContext<any>({});

export default GlobalStateContext;
