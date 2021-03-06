import _ from 'lodash';
import React from 'react';

export default class CreateTodo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: null
    };
  }

  renderError(){
    if(!this.state.error){return null;}
    return(<div style={{color: 'red'}}>{this.state.error}</div>);
  }

  render(){
    return(
      <form className="pure-form" onSubmit={this.handleCreate.bind(this)} >
        <input type="text" placeholder="Task to complete?" ref="createInput" />
        <button className="pure-button">Create</button>
        {this.renderError()}
      </form>
    );
  }

  handleCreate(event){
    event.preventDefault();

    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if(validateInput){
      this.setState({error: validateInput});
      return;
    }

    this.props.createTask(task);
    this.refs.createInput.value = "";
    this.setState({error: null});
  }

  validateInput(task){
    if(!task){
      return "Please Enter A Task.";
    }
    else if(_.find(this.props.todos, todo => todo.task === task)){
      return "Task Already Exists!";
    }else{
      return null;
    }
  }



}
