import React from "react";
import ToolsList from "./tools/ToolsList";
import {inject, observer} from "mobx-react";
import {LoadingStatus} from "../store/ToolsUiStore";
import Notifications from "./Notifications";
import toolsService from "../service/ToolsService";

@inject("toolsUiStore")
@observer
class MainView extends React.Component {

  componentWillMount() {
    // router or in my case MainComponent can handle it
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
  }

}

export default MainView;