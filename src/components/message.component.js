import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <div>
          <span className="author">{this.props.message.author}</span>
          <span className="time">{
            Intl.DateTimeFormat({}, { hour12: true, hour: 'numeric', minute: 'numeric' })
              .format(new Date(this.props.message.time))
          }</span>
        </div>
        <div className="content">
          <span className="message" dangerouslySetInnerHTML={
            {__html: this.stripTags(this.props.message.message).replace(/\n/g, '<br/>')}
          }></span>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    author: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired,
  myNickname: PropTypes.string.isRequired
};

export default Message;
