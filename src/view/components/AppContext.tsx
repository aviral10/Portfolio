import { createContext } from "react";
import { AppContextType } from "./interfaces";

const AppContext = createContext<AppContextType>({});

export default AppContext;
