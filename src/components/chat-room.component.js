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

  isPrivate() {
    return this.props.channel.id && this.props.channel.id.indexOf('|') !== -1;
  }

  isMe() {
    return this.props.channel.name === this.props.nickname;
  }

  hasDescription() {
    return this.isPrivate() || this.props.channel.description;
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
        <header>
          <h4>
            {this.isPrivate() ? '@':'#'}
            {this.props.channel.name}
          </h4>
          <p className={this.hasDescription() ? 'has-desc' : ''}>
            {this.isPrivate() ? (this.isMe() ? 'You can put down notes here.' :
              `Your conversation with ${this.props.channel.name}`) : this.props.channel.description}
          </p>
        </header>
        <ul className="messages-view" ref="messagesView">{messagesView}</ul>
        <MessageInput
          nickname={this.props.nickname}
          channel={this.props.channel}
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
  addMessage: PropTypes.func.isRequired,
  addOwnMessage: PropTypes.func.isRequired
}

export default ChatRoom;
