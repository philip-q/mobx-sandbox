import {observable} from "mobx/lib/mobx";
import {action} from "mobx";

export default class Tool {

  @observable name = "";
  @observable description = "";
  @observable rights = "";
  id = null;


  constructor(id, name, description, rights) {
    this.id = id;
    this.setName(name);
    this.setDescription(description);
    this.setRights(rights);
  }

  @action
  setName(value) {
    this.name = value;
  }

  @action
  setDescription(value) {
    this.description = value;
  }

  @action
  setRights(value) {
    this.rights = value;
  }
}