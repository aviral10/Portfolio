import { createContext } from "react";
import { Hamburger } from "../../model/interfaces";

const GlobalStateContext = createContext<any>({});

export default GlobalStateContext;
