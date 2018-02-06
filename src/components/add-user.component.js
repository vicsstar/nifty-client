import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUser } from '../actions';
import mapDispatchToProps from './mappings';

import './add-user.component.css';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.doEnter = this.doEnter.bind(this);
  }

  doEnter(history) {
    const nickname = this.nickname.value.toLowerCase();

    if (!nickname) return;

    this.props.addUser(nickname);
    history.push(`/chat/${nickname}`);
  }

  render() {
    const nickname = localStorage.getItem('nickname');
    if (nickname) {
      return <Redirect to={`/chat/${nickname}`} />;
    }

    return (
      <Route render={({ history }) => (
        <div className="add-user">
          <label htmlFor="nickname" className="greeting">Hello.</label>
          <input type="text" ref={(input) => {this.nickname = input;}}
            className="nickname" placeholder="Choose a nickname" required/>
          <button className="btn-default" onClick={() => this.doEnter(history)}>ENTER</button>
        </div>
      )} />
    );
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired
}

export default connect(() => ({}), mapDispatchToProps)(AddUser);
