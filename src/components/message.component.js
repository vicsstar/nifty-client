import React, { Component } from 'react';

import './message.component.css';

class Message extends Component {
  stripTags(text) {
    return text.replace(/>/g, '&gt;').replace(/</g, '&lt;');
  }

  fromMe() {
    return this.props.myNickname === this.props.message.author;
  }

  render() {
    return (
      <div className={`message-view ${this.fromMe() ? 'me' : ''}`}>
        <span className="author">{this.props.message.author}</span>
        <div className="content">
          <span className="message" dangerouslySetInnerHTML={
            {__html: this.stripTags(this.props.message.message).replace(/\n/g, '<br>')}
          }></span>
          <span className="time">2:00 AM</span>
        </div>
      </div>
    );
  }
}

export default Message;
