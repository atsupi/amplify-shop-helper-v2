import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import config from "./aws-exports";
import { Amplify } from "aws-amplify";
//Amplify.configure(config);
Amplify.configure({...config,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="Main_div"><App /></div>
);
