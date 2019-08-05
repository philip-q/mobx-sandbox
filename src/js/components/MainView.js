import React from "react";
import ToolsList from "./tools/ToolsList";
import {inject, observer} from "mobx-react";
import {LoadingStatus} from "../store/ToolsUiStore";

@inject("toolsUiStore")
@observer
class MainView extends React.Component {

  render() {
    return <div>
      <ToolsList/>
      <button onClick={this.handleClick}>Load</button>
    </div>;
  }

  handleClick = () => {
    console.log("click");
    this.props.toolsUiStore.setLoadingStatus(LoadingStatus.REQUIRED)
  }

}

export default MainView;