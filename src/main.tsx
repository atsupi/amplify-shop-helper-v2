import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import config from "./aws-exports.ts";
import { Amplify } from "aws-amplify";
Amplify.configure(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="Main_div"><App /></div>
);
