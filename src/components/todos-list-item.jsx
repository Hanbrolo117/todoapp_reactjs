import _ from 'lodash';
import React from 'react';


export default class TodosListItem extends React.Component{

  constructor(props){
    super(props);
    //Not Best Practice, should use a top-level component (the redux architecture way).
    this.state = {
      isEditing: false
    };
  }


  renderActionSection(){
    if(this.state.isEditing){
      return(
        <td>
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.toggleEditClick.bind(this)}>Cancel</button>
        </td>
      );
    }

    return(
      <td>
        <button onClick={this.toggleEditClick.bind(this)}>Edit</button>
        <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
      </td>
    );

  }

  renderTaskSection(){
    //Recall Values where passed in to this component from the triple dot notation: {...todo}
    const {task, isCompleted} = this.props;
    const taskStyle = {
      color: isCompleted ? 'green' : 'red',
      cursor: 'pointer'
    };


    if(this.state.isEditing){
      return(
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="editInput"/>
          </form>
        </td>
      );
    }

    return(
      <td style={taskStyle} onClick={this.props.toggleCompleteHandler.bind(this, task)}>{task}</td>
    );
  }

  render(){
    return(
      <tr>
        {this.renderTaskSection()}
        {this.renderActionSection()}
      </tr>
    );
  }


  toggleEditClick(){
    this.setState({isEditing: !this.state.isEditing});
  }

  onSaveClick(event){
    event.preventDefault();

    const oldTask = this.props.task;
    const newTask = this.refs.editInput.value;
    this.props.saveTask(oldTask, newTask);

    this.setState({isEditing: false});
  }



}
