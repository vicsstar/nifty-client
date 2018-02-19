import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
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

    // this.props.addUser(nickname);
    history.push(`/chat/${nickname}`);
  }

  componentDidMount() {
    if (this.nickname) {
      this.nickname.focus();
    }
  }

  render() {
    return (
      <Route render={({ history }) => (
        <div className="add-user">
          <label htmlFor="nickname" className="greeting">Hello.</label>
          <input type="text" ref={(input) => {this.nickname = input;}}
            className="nickname" placeholder="Choose a nickname"
            onKeyUp={e => {
              if (e.key === 'Enter') {
                this.doEnter(history);
              }
            }}/>
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
