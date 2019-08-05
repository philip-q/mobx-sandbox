import rootStore from "../store/RootStore";
import Tool from "../model/Tool";
import {autorun} from "mobx";
import {LoadingStatus} from "../store/ToolsUiStore";

class ToolsApi {

  constructor() {
    autorun(this.getAllTools)
  }

  getAllTools() {
    if (rootStore.toolsUiStore.loadingStatus === LoadingStatus.REQUIRED) {
      console.log("Loading tools");
      let tool1 = new Tool("tool#1", "descr#1", "r1, r2");
      let tool2 = new Tool("tool#2", "descr#2", "r2, r3");
      let tool3 = new Tool("tool#3", "descr#3", "r4, r5");

      setTimeout(() => {
        rootStore.toolsStore.receiveTools([tool1, tool2, tool3]);
        rootStore.toolsUiStore.loadingStatus = LoadingStatus.LOADED;
      }, 1000)
    }

  }

}

export default new ToolsApi();