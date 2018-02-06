import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './message-input.component.css';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
  }

  onSend() {
    const messageInputBox = this.refs.message;
    const message = messageInputBox.value;

    if (message) {
      const _msg = this.props.addMessage({
        nickname: this.props.nickname,
        channelId: this.props.channelId,
        time: new Date().getTime(),
        isPrivate: this.props.channelId.indexOf('|') === -1,
        message
      });
      this.props.addOwnMessage(_msg);

      messageInputBox.value = '';
      messageInputBox.focus();
    }
  }

  componentDidMount() {
    if (this.refs.message) {
      this.refs.message.focus();
    }
  }

  render() {
    return (
      <div className="message-input-view">
        <textarea className="message-input" ref="message"
          placeholder={`Message ${this.props.displayName}. Press Shift+Enter to goto next line.`}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
            }
          }}
          onKeyUp={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              this.onSend();
            }
          }}></textarea>
      </div>
    );
  }
}

MessageInput.propTypes = {
  nickname: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  addOwnMessage: PropTypes.func.isRequired
};

export default MessageInput;
