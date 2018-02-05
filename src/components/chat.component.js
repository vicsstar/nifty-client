import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ChatRoom from './chat-room.component';
import Sidebar from './sidebar.component';

import './chat.component.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  render() {
    return (
      <section id="chat">
        <Sidebar
          nickname={this.props.match.params.nickname}
          channels={[]}
          users={[]}
        />
        <section className="room">
        </section>
      </section>
    );
  }
}

export default withRouter(Chat);
