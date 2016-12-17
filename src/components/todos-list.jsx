import _ from 'lodash';
import React from 'react';
import TodosListHeader from './todos-list-header.jsx';
import TodosListItem from './todos-list-item.jsx';
export default class TodosList extends React.Component{

  renderItems(){
    const props = _.omit(this.props, 'todos');
    return _.map(this.props.todos, (todo, index) => <TodosListItem key={index} {...todo} {...props} />);
    // {...todo} is equivalent to: task={todo.task} isCompleted={todo.isCompleted}
  }

  render(){
    return(
      <table className="pure-table">
        <TodosListHeader/>
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }

}
