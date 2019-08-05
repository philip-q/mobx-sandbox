import {observable, computed, action, autorun} from "mobx";
import Tool from "../model/Tool";

class ToolsStore {

  constructor(rootStore) {
    this.rootStore = rootStore;
    autorun(() => {
      console.log(this.tools);
    })
  }

  @observable tools = [];

  @action addTool = () => {
    let tool = new Tool("enter tool name", "enter tool description", "enter tool rights");

    this.tools.push(tool);
    this.rootStore.toolsUiStore.toggleEditMode(tool);
  };

  @action receiveTools = (tools) => {
    this.tools.replace(tools);
  };

  @action changeToolName = (name) => {
    this.tools[0].name = name
  }


}

export default ToolsStore;