import React from "react";
import ToolsList from "./tools/ToolsList";
import {inject, observer} from "mobx-react";
import {LoadingStatus} from "../store/ToolsUiStore";
import Notifications from "./Notifications";
import toolsService from "../service/ToolsService";
import Devtools from "mobx-react-devtools";

@inject("toolsUiStore")
@observer
class MainView extends React.Component {

  componentDidMount() {
    // router or in my case MainComponent can handle it
    console.log("MainView:componentDidMount: toolsService.loadTools()");
    toolsService.loadTools();
  }

  render() {
    return <div>
      <Notifications/>
      <ToolsList/>
      <button onClick={this.handleClick}>Load</button>
    </div>;
  }

  handleClick = () => {
    toolsService.loadTools();
  }

}

export default MainView;