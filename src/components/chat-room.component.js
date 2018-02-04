import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './message.component';
import MessageInput from './message-input.component';
import EmptyItem from './empty-item.component';

import './chat-room.component.css';

class ChatRoom extends Component {
  componentWillUpdate() {
    setTimeout(() => {
      if (this.refs.messagesView) {
        this.refs.messagesView.lastElementChild.scrollIntoView();
      }
    });
  }

  render() {
    let messagesView;

    if(!this.props.messages || this.props.messages.length === 0) {
      messagesView = <EmptyItem>Be the first to send a message.</EmptyItem>
    } else {
      messagesView = this.props.messages.map(message => (
        <Message key={message.id} message={message} myNickname={this.props.nickname}></Message>
      ));
    }

    return (
      <div className="chat-view">
        <ul className="messages-view" ref="messagesView">{messagesView}</ul>
        <MessageInput
          displayName={this.props.displayName}
          nickname={this.props.nickname}
          addMessage={data => this.props.addMessage(data)}
          addOwnMessage={data => this.props.addOwnMessage(data)} />
      </div>
    );
  }
}

ChatRoom.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      roomId: PropTypes.string,
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  displayName: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  addOwnMessage: PropTypes.func.isRequired
}

export default ChatRoom;
