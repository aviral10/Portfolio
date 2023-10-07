import { createContext } from "react";
import { AppContextType } from "../../model/Interfaces";

const AppContext = createContext<AppContextType>({});

export default AppContext;
