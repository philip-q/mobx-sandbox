import rootStore from "../store/RootStore";
import {autorun} from "mobx";

class ToolValidator {

  constructor() {
    // autorun(this.validateV1)
  }

  /*
  * Doesn't work with current version (computed) due to a cyclomatic dependency: validator - store - tool - validator
  * */
  validateV1() {
    rootStore.toolsStore.tools.forEach(tool => {

      console.log("Validating ", tool.name);

      let nameViolations = [];

      if (tool.name.indexOf("bad") > -1) {
        nameViolations.push("Contains bad word");
      }

      if (tool.name.length > 10) {
        nameViolations.push("Too long");
      }

      if (nameViolations.length > 0) {
        rootStore.toolsUiStore.addInvalidTool(tool, new Map().set("name", nameViolations))
      } else {
        rootStore.toolsUiStore.removeInvalidTool(tool);
      }

    });
  }

  validateName = (name) => {
    console.log("Validating ", name);

    let nameViolations = [];

    if (name.indexOf("bad") > -1) {
      nameViolations.push("Contains bad word");
    }

    if (name.length > 10) {
      nameViolations.push("Too long");
    }

    return nameViolations;
  }

}

export default new ToolValidator();