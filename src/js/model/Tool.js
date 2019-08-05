import {observable} from "mobx/lib/mobx";

export default class Tool {

  @observable name = "";
  @observable description = "";
  @observable rights = "";


  constructor(name, description, rights) {
    this.id = Date.now() + name;
    this.name = name;
    this.description = description;
    this.rights = rights;
  }

}