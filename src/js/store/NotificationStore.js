import {action, observable, runInAction} from "mobx";

const NOTIFICATION_TTL = 3000;

export default class NotificationStore {
  @observable notifications = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  show(level, message) {
    this.notifications.push({level, message});
    setTimeout(
      runInAction(() => {
        console.log("removing notification");
        this.notifications.slice(1);
      }),
      NOTIFICATION_TTL
    );
  }

}

