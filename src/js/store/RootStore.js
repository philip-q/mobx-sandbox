import ToolsStore from "./ToolsStore";
import ToolsUiStore from "./ToolsUiStore";
import NotificationsStore from "./NotificationStore";


class RootStore {
  constructor() {
    this.toolsStore = new ToolsStore(this);
    this.toolsUiStore = new ToolsUiStore(this);
    this.notificationsStore = new NotificationsStore(this);
  }
}

export default new RootStore();
