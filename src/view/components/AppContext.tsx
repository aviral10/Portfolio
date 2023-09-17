import { createContext } from "react";
import { AppContextType } from "../../model/interfaces";

const AppContext = createContext<AppContextType>({});

export default AppContext;
