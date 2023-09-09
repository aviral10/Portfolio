import { createContext } from "react";
import { Hamburger } from "./interfaces";

const HamburgerContext = createContext<Hamburger>({});

export default HamburgerContext;
