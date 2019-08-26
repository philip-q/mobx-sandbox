import {action, autorun, observable, runInAction} from "mobx";

const NOTIFICATION_TTL = 3000;

export default class NotificationStore {
  @observable notifications = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  show(level, message) {
    this.notifications.push({level, message});
    setTimeout(() =>
      runInAction(() => {
        this.notifications.shift();
      }),
      NOTIFICATION_TTL
    );
  }

}

