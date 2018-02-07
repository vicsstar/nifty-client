import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AddUser from './components/add-user.component';

import './App.css';

class App extends Component {
  render() {
    const nickname = localStorage.getItem('nickname');
    if (nickname) {
      return <Redirect to={`/chat/${nickname}`} />;
    }

    return (
      <div id="container">
        <section id="main">
          <header className="header-main">
            <h2>Nifty PRO</h2>
          </header>
          <AddUser />
        </section>
      </div>
    );
  }
}

export default App;
