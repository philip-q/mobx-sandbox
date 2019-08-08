import rootStore from "../store/RootStore";
import {autorun} from "mobx";

class ToolValidator {

  constructor() {
    autorun(this.validate)
  }


  validate() {
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

}

export default new ToolValidator();