import ReactDOM from "react-dom/client";
import App from "./view/App";

let rootElement: HTMLElement = document.getElementById("root")!;
let root = ReactDOM.createRoot(rootElement);
root.render(<App />);
