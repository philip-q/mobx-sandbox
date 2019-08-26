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

const rootStore = new RootStore(); // !important, otherwise on each import you get a new store
export default rootStore;
