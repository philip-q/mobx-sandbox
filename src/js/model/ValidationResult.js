import {computed, observable} from "mobx";

export default class ValidationResult {
  @observable object;
  @observable violations;

  constructor(object, violations) {
    this.object = object;
    this.violations = violations;
  }

  @computed
  get isValid() {
    this.violations.size === 0;
  }
}