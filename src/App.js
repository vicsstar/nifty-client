import React, { Component } from 'react';
import AddUser from './components/add-user.component';

import './App.css';

class App extends Component {
  render() {
    return (
      <div id="container">
        <section id="main">
          <AddUser />
        </section>
      </div>
    );
  }
}

export default App;
