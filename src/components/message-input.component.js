import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';

import './message-input.component.css';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.handleEmoji = this.handleEmoji.bind(this);
    this.state = {
      emojiOpen: false,
      messageText: ''
    };

    this.jsemoji = new JSEMOJI();
    // set the style to emojione (default - apple)
    this.jsemoji.img_set = 'emojione';
  }

  isPrivate() {
    return this.props.channel.id && this.props.channel.id.indexOf('|') !== -1;
  }

  handleEmoji(_, emoji) {
    const emojiPic = this.jsemoji.replace_colons(`:${emoji.name}:`);

    const messageBox = this.refs.message;
    const message = messageBox.value;
    const selectionStart = messageBox.selectionStart;

    messageBox.value = [
      message.slice(0, selectionStart),
      emojiPic,
      message.slice(messageBox.selectionEnd)
    ].join('');

    messageBox.selectionStart = messageBox.selectionEnd = selectionStart + emojiPic.length;
  }

  onSend() {
    const messageInputBox = this.refs.message;
    const message = messageInputBox.value;

    if (message) {
      const _msg = this.props.addMessage({
        nickname: this.props.nickname,
        channelId: this.props.channel.id,
        time: new Date().getTime(),
        isPrivate: this.props.channel.id.indexOf('|') !== -1,
        message
      });
      this.props.addOwnMessage(_msg);

      messageInputBox.value = '';
      messageInputBox.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channel !== this.props.channel) {
      if (this.refs.message) {
        this.refs.message.focus();
      }
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
        <textarea
          ref="message"
          className="message-input"
          disabled={this.props.channel.id === undefined}
          placeholder={
            `Message ${this.isPrivate() ? '@':'#'}${this.props.channel.name}. Press Shift+Enter to goto next line.`
          }
          onFocus={() => this.setState({ emojiOpen: false })}
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
          {this.state.emojiOpen ? (
            <div className="nifty-emoji-picker">
              <EmojiPicker onEmojiClick={this.handleEmoji} emojiResolution={64}/>
            </div>
          ) : ''}
          <button onClick={() => this.setState({ emojiOpen: !this.state.emojiOpen })}>
            <span role="img" aria-label="pick emoji">&#x1F600;</span>
          </button>
      </div>
    );
  }
}

MessageInput.propTypes = {
  channel: PropTypes.shape(),
  nickname: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  addOwnMessage: PropTypes.func.isRequired
};

export default MessageInput;
