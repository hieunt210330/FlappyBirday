import React from "react";
import ReactDOM from "react-dom/client";

import {createStore} from "./store";

//import "./index.css";
import App from "./App";

const store = createStore();

const app = ReactDOM.createRoot(document.getElementById("app"));
app.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>
);

