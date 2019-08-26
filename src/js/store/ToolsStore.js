import {action, observable} from "mobx";
import Tool from "../model/tool/Tool";

class ToolsStore {

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable tools = [];

  @action addTool = () => {
    let tempId = - new Date().getTime();
    let tool = new Tool(tempId, "name", "description", "rights");
    this.tools.push(tool);
  };

  @action receiveTools = (tools) => {
    console.log("Store: receiving tools");
    this.tools.replace(tools);
  };

  @action replaceTool(replaced, replacer) {
    this.tools = this.tools.map(tool => tool === replaced ? replacer : tool)
  }

  @action removeTool(tool) {
    this.tools.splice(this.tools.indexOf(tool), 1);
  }


}

export default ToolsStore;