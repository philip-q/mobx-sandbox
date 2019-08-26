import {action, computed, observable, reaction, when} from "mobx";
import toolValidator from "../../service/ToolValidator";
import {intercept} from "mobx-decorators";

export default class Tool {

  /*
    tool validator v1 - current : autorun of method validating tools in forEach. As appears
    validation is triggered for each tool per change in a single tool. Need improvements
  */

  /*
    tool validator v2 - intercept field change. Doesn't work with multiple tools (in a good way).
    Intercept is applied in a way that Tool's "this" is not passed
  */

  /*
    tool validator v3 - service with reaction/autorun on tools.length. Once changed - update
    <Tool,Disposer> map respectively and register/dispose reactions on name/description/... changes
    Lots of dispose management.
  */

  // @intercept((change) => toolValidator.validateName(change, this))
  @observable name;

  @observable description;
  @observable rights;
  @observable serverValidationResult = new Map();

  constructor(id, name, description, rights) {
    this.id = id;
    this.setName(name);
    this.setDescription(description);
    this.setRights(rights);

    // this.disposers = {
    //   serverErrorsAutoClean: this.clearServerErrorOnChange()
    // }
    // this requires #dispose() method to be implemented => force clients to take more responsibility without any benefit
  }

  // @action
  // setName = (value) => {
  //   this.name = value;
  // };

  @action
  setDescription = (value) => {
    this.description = value;
  };

  @action
  setRights = (value) => {
    this.rights = value;
  };

  @computed
  get nameViolations() {
    return toolValidator.validateName(this.name)
  }

  @computed
  get nameViolationsFull() {
    let uiValidation = toolValidator.validateName(this.name);
    let serverValidation = this.serverValidationResult.get("name") || [];
    return uiValidation.concat(serverValidation);
  }


  @action
  setServerValidationResult = (serverValidationResult) => {
    console.log("Tool: setting server validation result");
    this.serverValidationResult = serverValidationResult;
    // removes server validation on any change of violated field
    let disposer = reaction(
      () => this.name,
      (result) => {
        console.log("Tool:reaction: ", result);
        this.serverValidationResult.delete("name");
        disposer();
      }
    )
  };

  @action
  setName = (value) => {
    this.name = value;
    // if (this.serverValidationResult.size > 0) {
    //   this.serverValidationResult = new Map();
    // }
  };

  clearServerErrorOnChange = () => {
    return reaction(
      () => this.serverValidationResult.size > 0 && this.name,
      () => this.setServerValidationResult(new Map())
    )
  };


}