import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import DataStore from './Components/utility/react-redux/dataStore'
ReactDOM.render(
  <React.StrictMode>
    
    <DataStore>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </DataStore>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
