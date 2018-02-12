import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

// App component - represents the whole app
 class App extends Component {
  renderTasks() {
    return this.props.tasks2.map(/* cast to a task*/(task) => (
      //map to a Task component key and its associated task prop.
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

 export default withTracker(() => {
  return {
    //tasks prop??
    tasks2: Tasks.find({}).fetch()
  };
})(App);
