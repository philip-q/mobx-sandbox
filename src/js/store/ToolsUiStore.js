import {action, autorun, computed, observable} from "mobx";

export const LoadingStatus = {
  REQUIRED: "REQUIRED",
  IN_PROGRESS: "IN_PROGRESS",
  LOADED: "LOADED",
  ERROR: "ERROR"
};

export const SavingStatus = {
  NONE: "NONE",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "LOADED",
  ERROR: "ERROR"
};

class ToolsUiStore {

  @observable loadingStatus = false;
  @observable invalidTools = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
    autorun(() => console.log("Loading status ", this.loadingStatus));
  }

  @action
  setLoadingStatus(status) {
    this.loadingStatus = status
  }

  @action
  addInvalidTool(tool, violations) {
    let value = this.invalidTools.get(tool) || new Map();
    let nextValue = new Map([...value, ...violations]);
    this.invalidTools.set(tool, nextValue);
  }

  @action
  removeInvalidTool(tool) {
    this.invalidTools.delete(tool);
  }

  getViolations = (tool, field) => {
    return computed(() => {
      let violations = this.invalidTools.get(tool);
      if (violations) {
        return violations.get(field) || [];
      }
      return [];
    }).get();
  };

  isValidTool = (tool) => {
    return computed(() => {
      return !this.invalidTools.has(tool);
    }).get()
  }

}

export default ToolsUiStore;