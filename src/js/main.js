import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";
import rootStore from "./store/RootStore"
import MainView from "./components/MainView";
import toolsApi from "./api/ToolsApi";
import toolValidator from "./service/ToolValidator";
import { configure } from "mobx";

configure({ enforceActions: "always" });

ReactDOM.render(
  <Provider {...rootStore}>
    <MainView/>
  </Provider>,
  document.getElementById('main')
);

// ReactDOM.render(<div>Works</div>, document.getElementById('main'));
// todo: 2 requests at start, disabled section till response on second request
//  table showing requested entities, ability to crud them. validation