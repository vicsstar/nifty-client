import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './users.component.css';

class Users extends Component {
  componentDidUpdate(state) {
    console.log(state);
  }

  isMe(nickname) {
    return nickname === this.props.nickname;
  }

  render() {
    return (
      <div id="user-list">
        <h4>Direct Messages</h4>
        <ul className="items">
        {
          this.props.users.map(user => (
            <li key={user.nickname} className={this.isMe(user.nickname) ? 'me': ''}>
              <a href={`#/user/${user.nickname}`}>
                {user.nickname} {this.isMe(user.nickname) ? ' (you)' : ''}
              </a>
            </li>
          ))
        }
        </ul>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Users;
