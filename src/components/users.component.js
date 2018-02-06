import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Channel from './channel.component';

import './users.component.css';

class Users extends Component {
  isMe(otherUserNickname) {
    return otherUserNickname === this.props.nickname;
  }

  composeChannelId(otherUserNickname) {
    return [otherUserNickname, this.props.nickname].sort().join('|');
  }

  render() {
    return (
      <div id="user-list">
        <h4>Direct Messages</h4>
        <ul className="items">
        {this.props.users.map(user => (
          <Channel
            classNames={
              `${this.isMe(user.nickname) ? 'me': ''}
              ${this.props.activeChannel.id === this.composeChannelId(user.nickname) ? ' selected': ''}`
            }
            key={user.nickname}
            link={`#/user/${user.nickname}`}
            name={`@${user.nickname} ${this.isMe(user.nickname) ? ' (you)' : ''}`}
            onOpenChannel={data =>
              this.props.onOpenChannel({
                name: user.nickname,
                id: this.composeChannelId(user.nickname)
              })
            }
          />
        ))}
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
