import React from 'react';
import {inject, observer} from "mobx-react";

@inject("toolsUiStore", "toolsStore")
@observer
class Tool extends React.Component {

  render() {
    console.log("tool render");
    return <div className="Tool">
      {this.renderName()}
      {this.renderDescription()}
      {this.renderRights()}
      {this.renderEditCheckbox()}
    </div>
  }

  renderName() {
    const {name} = this.props.tool;

    if (this.isEditMode()) {
      return <input className="Tool__name" onChange={this.handleNameChange} value={name}/>
    }

    return <span className="Tool__name">{name}</span>;
  }

  renderDescription() {
    const {description} = this.props.tool;

    if (this.isEditMode()) {
      return <input className="Tool__description" onChange={this.handleDescriptionChange} value={description}/>
    }

    return <span className="Tool__description">{description}</span>;
  }

  renderRights() {
    const {rights} = this.props.tool;

    if (this.isEditMode()) {
      return <input className="Tool__rights" onChange={this.handleRightsChange} value={rights}/>
    }

    return <span className="Tool__rights">{rights}</span>;
  }

  renderEditCheckbox() {
    return <input type="checkbox" onChange={this.handleEditToggle} checked={this.isEditMode()}/>;
  }

  handleNameChange = (event) => {
    this.props.tool.name = event.target.value;
  };

  handleDescriptionChange = (event) => {
    this.props.tool.description = event.target.value
  };

  handleRightsChange = (event) => {
    this.props.tool.rights = event.target.value
  };

  handleEditToggle = () => {
    this.props.toolsUiStore.toggleEditMode(this.props.tool);
  };

  isEditMode = () => {
    //return true;
    return this.props.toolsUiStore.isEdited(this.props.tool);
  }

}

export default Tool;