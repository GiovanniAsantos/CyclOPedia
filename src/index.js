import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import CyclOPediaClassPage from "./CyclOPediaClassPage";
import CyclOPediaClassFuncPage from "./CyclOPediaClassFuncPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      {" "}
      <Header />
      <div className="row text-white">
        <div className="col-6">
          <span className="h1 text-warning text-center">Class Component</span>
          <CyclOPediaClassPage />
        </div>
        <div className="col-6">
          <span className="h1 text-warning text-center">Func Component</span>
          <CyclOPediaClassFuncPage />
        </div>
      </div>
    </div>
  </React.StrictMode>
);
