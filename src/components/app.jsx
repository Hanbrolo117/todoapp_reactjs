import React from 'react';
import TodosList from './todos-list.jsx';
import CreateTodo from './create-todo.jsx';

const todos = [
  {
    task: 'make React tutorial',
    isCompleted: false
  },
  {
    task: 'Eat Dinner',
    isCompleted: false
  },
  {
    task: 'Eat Lunch',
    isCompleted: true
  }
];



export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      todos
    };

  }

  render(){
    return(
      <div>
        <h1>React Todo App</h1>
        <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
        <TodosList
        todos={this.state.todos}
        toggleCompleteHandler={this.toggleCompleteHandler.bind(this)}
        saveTask={this.saveTask.bind(this)}
        deleteTask={this.deleteTask.bind(this)}
        />
      </div>
    );
  }


    createTask(task){
      //push new [task] into todo array in the current state:
      this.state.todos.push({
        task,
        isCompleted: false
      });
      //Update State with edited todolist:
      this.setState({todos: this.state.todos});
    }


    toggleCompleteHandler(task){
      //Find clicked Task using lodash and some es6 shorhand:
      const foundTodo = _.find(this.state.todos, todo => todo.task === task);
      foundTodo.isCompleted = !foundTodo.isCompleted;
      this.setState({todos: this.state.todos});
    }

    //Use [oldTask] to find clicked task, and then replace it with
    //[newTask]
    saveTask(oldTask, newTask){
      const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
      foundTodo.task = newTask;
      this.setState({todos: this.state.todos});
    }

    deleteTask(taskToDelete){
      _.remove(this.state.todos, todo => todo.task === taskToDelete);
      this.setState({todos: this.state.todos});
    }

}
