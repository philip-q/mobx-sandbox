import React from 'react';
import {inject, observer} from "mobx-react";
import {action, observable} from "mobx";

@inject("toolsUiStore", "toolsStore")
@observer
class Tool extends React.Component {

  @observable isEdited = false;

  render() {
    console.log("tool render");
    return <div className="Tool">
      {this.renderName()}
      {this.renderDescription()}
      {this.renderRights()}
      {this.renderEditButton()}
      {this.renderSaveButton()}
      {this.renderDeleteButton()}
    </div>
  }

  renderName() {
    const {tool, tool: {name}} = this.props;

    if (this.isEdited) {
      return <span className="Tool__name">
        <input onChange={this.handleNameChange} value={name}/>
        {tool.nameViolationsFull.map(violation => <div key={violation}>{violation}</div>)}
      </span>

    }

    return <span className="Tool__name">{name}</span>;
  }

  renderDescription() {
    const {description} = this.props.tool;

    if (this.isEdited) {
      return <input className="Tool__description" onChange={this.handleDescriptionChange} value={description}/>
    }

    return <span className="Tool__description">{description}</span>;
  }

  renderRights() {
    const {rights} = this.props.tool;

    if (this.isEdited) {
      return <input className="Tool__rights" onChange={this.handleRightsChange} value={rights}/>
    }

    return <span className="Tool__rights">{rights}</span>;
  }

  renderEditButton() {
    let text = this.isEdited ? "Cancel" : "Edit";
    return <button onClick={this.handleEditToggle}>{text}</button>;
  }

  renderSaveButton() {
    if (this.isEdited && this.isValidTool()) {
      return <button onClick={this.handleSave}>Save</button>
    }
  }

  renderDeleteButton() {
    if (this.isEdited) {
      return <button onClick={this.handleDelete}>Delete</button>
    }
  }

  handleNameChange = (event) => {
    this.props.tool.setName(event.target.value);
  };

  handleDescriptionChange = (event) => {
    this.props.tool.setDescription(event.target.value);
  };

  handleRightsChange = (event) => {
    this.props.tool.setRights(event.target.value);
  };

  @action
  handleEditToggle = () => {
    this.isEdited = !this.isEdited;
  };

  handleSave = () => {
    this.props.onSave(this.props.tool).then(this.handleEditToggle);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.tool);
  };

  isValidTool = () => {
    return this.props.toolsUiStore.isValidTool(this.props.tool);
  }

}

export default Tool;