import React from "react";
import {inject, observer} from "mobx-react";

@inject("notificationsStore")
@observer
export default class Notifications extends React.Component {

  render() {
    return <div className="Notifications">
      {this.props.notificationsStore.notifications.map(({level, message}) => {
        return <div key={message} className={`Notification Notification--${level}`}>{message}</div>
      })}
    </div>;
  }

}