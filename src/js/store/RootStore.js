import ToolsStore from "./ToolsStore";
import ToolsUiStore from "./ToolsUiStore";


class RootStore {
  constructor() {
    this.toolsStore = new ToolsStore(this);
    this.toolsUiStore = new ToolsUiStore(this);
  }
}

export default new RootStore();
