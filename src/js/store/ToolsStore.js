import {action, observable} from "mobx";
import Tool from "../model/Tool";

class ToolsStore {

  constructor(rootStore) {
    this.rootStore = rootStore;
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

  @action replaceTool(replaced, replacer) {
    this.tools = this.tools.map(tool => tool === replaced ? replacer : tool)
  }


}

export default ToolsStore;