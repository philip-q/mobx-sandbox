import {action, autorun, computed, observable} from "mobx";

export const LoadingStatus = {
  REQUIRED: "REQUIRED",
  IN_PROGRESS: "IN_PROGRESS",
  LOADED: "LOADED",
  ERROR: "ERROR"
};

class ToolsUiStore {

  @observable editedTools = [];
  @observable loadingStatus = LoadingStatus.REQUIRED;

  constructor(rootStore) {
    this.rootStore = rootStore;
    autorun(() => console.log("Loading status ", this.loadingStatus));
  }

  @action
  toggleEditMode = (tool) => {
    if (this.editedTools.indexOf(tool) > -1) {
      this.editedTools = this.editedTools.filter(t => t !== tool);
    } else {
      this.editedTools.push(tool);
    }

  };

  @action
  setLoadingStatus(status) {
    console.log("asd");
    this.loadingStatus = status
  }

  // todo why so ?
  //@computed
  // isEdited = (tool) => {
  //     return this.editedTools.indexOf(tool) > -1;
  // };

  isEdited = (tool) => {
    return computed(() => this.editedTools.indexOf(tool) > -1).get();
  };

}

export default ToolsUiStore;