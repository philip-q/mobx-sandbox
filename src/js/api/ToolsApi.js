import rootStore from "../store/RootStore";
import Tool from "../model/tool/Tool";
import {autorun, toJS} from "mobx";
import {LoadingStatus} from "../store/ToolsUiStore";

class ToolsApi {

  constructor() {
    // autorun(this.getAllTools)
  }

  getAllTools() {

    return new Promise((resolve) => {
      console.log("Api: Loading tools");
      setTimeout(() => {
        resolve(DB.loadTools());
      }, 1000)
    });
  }
422
  saveTool(tool) {
    return new Promise((resolve, reject) => {
      console.log("Api: Saving tool");

      setTimeout(() => {
        if (tool.name.indexOf("") > -1) {
          reject();
        } else {
          resolve(DB.saveTool(tool));
        }
      }, 1000)

    });
  }

}

class Db {

  seq_tool_id = 0;

  loadTools() {
    let storageTools = this._getStoredToolsObj();

    if (!storageTools) {
      storageTools = createInitialTools();
      let toolMap = storageTools.reduce((result, t) => {
        result[t.id] = toJS(t);
        return result;
      }, {});
      this.storeTools(toolMap);
    } else {
      storageTools = convertTools(storageTools);
    }

    let maxId = storageTools.reduce((max, {id}) => {
      return max > id ? max : id;
    }, 0);

    this.seq_tool_id = maxId + 1;
    return storageTools;
  }

  saveTool(tool) {
    tool = toJS(tool);

    let storedToolsMap = this._getStoredToolsObj();
    let existingIds = Object.keys(storedToolsMap);

    if (existingIds.indexOf(String(tool.id)) < 0) {
      tool.id = this.seq_tool_id++;
    }

    storedToolsMap[tool.id] = tool;
    this.storeTools(storedToolsMap);
    return new Tool(tool.id, tool.name, tool.description, tool.rights);
  }

  storeTools(toolMap) {
    localStorage.setItem("tools", JSON.stringify(toolMap))
  }

  _getStoredToolsObj() {
    let stored = localStorage.getItem("tools");
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  }

}

const DB = new Db();

function createInitialTools() {
  let tool1 = new Tool(1, "tool#1", "descr#1", "r1, r2");
  let tool2 = new Tool(2, "tool#2", "descr#2", "r2, r3");
  let tool3 = new Tool(3, "tool#3", "descr#3", "r4, r5");
  return [tool1, tool2, tool3];
}

function convertTools(toolsObj) {
  return Object.values(toolsObj)
    .map(({id, name, description, rights}) => new Tool(id, name, description, rights));
}

export default new ToolsApi();