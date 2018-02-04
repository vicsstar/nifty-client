import React, { Component } from 'react';

import './member-list.component.css';

class MemberList extends Component {
  componentWillUpdate(ns) {
    console.log(ns.users);
  }

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

export default MemberList;
