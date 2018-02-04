import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './member-list.component.css';

class MemberList extends Component {
  isMe(nickname) {
    return nickname === this.props.nickname;
  }

  render() {
    const items = this.props.users.map(user => {
      let body;

      if (this.isMe(user.nickname)) {
        body = <span>{user.nickname} (You)</span>;
      } else {
        body = (
          <a href={`/private-chat/${user.nickname}`} title="Tap to begin private chat.">
            {user.nickname}
          </a>
        );
      }
      return <li key={user.nickname}>{body}</li>
    });

    return (
      <div id="user-list">
        <ul className="items">{items}</ul>
      </div>
    );
  }
}

MemberList.propTypes = {
  nickname: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MemberList;
