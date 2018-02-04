import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import MemberList from './member-list.component';
import ChatRoom from './chat-room.component';
import mapDispatchToProps from './mappings';

import './public-chat.component.css';

class PublicChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      filteredMessages: [],
      users: [],
      chatMode: true
    };
  }

  componentWillUpdate(nextState) {
    const roomId = this.props.match.params.roomId;

    if (nextState.messages !== this.state.messages) {
      const filteredMessages =
        nextState.messages.filter(msg => {
          return !msg.isPrivate && msg.roomId === roomId;
        });

      this.setState({
        messages: nextState.messages,
        filteredMessages
      });
    }

    if (nextState.users !== this.state.users) {
      // finds users specific to this room (Members).
      // const user = nextState.users.find(u => u.roomId === roomId);

      // for the sake of being "like Slack".
      // if (user) {
      this.setState({ users: nextState.users });
      // }
    }
  }

  componentDidMount() {
    const nickname = localStorage.getItem('nickname');

    if (nickname) {
      this.setState({ nickname });
      this.props.joinRoom(this.props.match.params.roomId, nickname);
    }
  }

  componentWillUnmount() {
    this.setState({
      filteredMessages: [],
      messages: [],
      users: []
    });
    this.props.leaveRoom(localStorage.getItem('nickname'));
  }

  render() {
    if (!localStorage.getItem('nickname')) {
      return <Redirect to="/"/>;
    }

    let viewToRender;

    if (this.state.chatMode) {
      viewToRender = (
        <ChatRoom
          nickname={localStorage.getItem('nickname')}
          displayName={this.props.match.params.roomName}
          messages={this.state.filteredMessages}
          addMessage={data => this.props.addMessage({
            ...data, roomId: this.props.match.params.roomId,
            isPrivate: false
          })}
          addOwnMessage={data => this.props.addOwnMessage({...data, isPrivate: false})}
        />
      );
    } else {
      viewToRender = (
        <MemberList users={this.state.users} nickname={localStorage.getItem('nickname')}/>
      );
    }

    return (
      <section id="public-chat">
        <h2 className="heading">
          {this.props.match.params.roomName} &bull; {` `}
          <a href="#switch-mode" onClick={(e) => {
            e.preventDefault();
            this.setState({chatMode: !this.state.chatMode})
          }}>
          {this.state.chatMode ? 'Users' : 'Back to Chat'}
          </a>
        </h2>
        {viewToRender}
      </section>
    );
  }
}

PublicChat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      roomId: PropTypes.string,
      isPrivate: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired
    })
  )
}

const mapStateToProps = state => ({
  messages: state.messages,
  users: state.users
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PublicChat)
);
