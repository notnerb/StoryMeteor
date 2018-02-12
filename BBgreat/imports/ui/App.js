import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

// App component - represents the whole app
 class App extends Component {
   handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form. wow
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
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

          <form className= "new-task" onSubmit= {this.handleSubmit.bind(this)}>
            <input
              type = "text"
              //reference to be stored in this.refs.name for later use
              ref= "textInput"
              placeholder = "Type to add new tasks"
              />
            </form>
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
    //tasks prop, indeed the prop is named here, also the find function
    //seems to have brackets to represent bins for Mongo tuples.
    tasks2: Tasks.find({}, {sort: { createdAt: -1} }).fetch()
  };
})(App);
