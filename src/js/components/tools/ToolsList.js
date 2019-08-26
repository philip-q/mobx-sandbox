import React from "react";
import {inject, observer} from "mobx-react";
import Tool from "./Tool"
import {LoadingStatus} from "../../store/ToolsUiStore";
import toolsService from "../../service/ToolsService";

@inject("toolsStore", "toolsUiStore", "notificationsStore")
@observer
class ToolsList extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log("list render");
    return <div className="ToolsList">
      {this.renderLoader()}
      {this.renderList()}
      <button className="ToolsList__add" onClick={this.props.toolsStore.addTool}>Add Tool</button>
    </div>;
  }

  renderLoader() {
    const {loadingStatus} = this.props.toolsUiStore;

    if (loadingStatus) {
      return "Loading"
    }

    return null;
  }

  renderList() {
    return this.props.toolsStore.tools.map(tool => {
      return <Tool
        key={tool.id}
        tool={tool}
        onSave={toolsService.saveTool}
        onDelete={toolsService.removeTool}
      />
    });
  }


}

export default ToolsList;
