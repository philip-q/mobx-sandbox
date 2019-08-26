import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";
import {configure, observable, reaction} from "mobx";
// import Devtools from "mobx-react-devtools";
import rootStore from "./store/RootStore"
import MainView from "./components/MainView";

configure({ enforceActions: "always" });

ReactDOM.render(
  <Provider {...rootStore}>
    <MainView/>
  </Provider>,
  document.getElementById('main')
);
