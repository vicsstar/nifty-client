import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatRoom from './chat-room.component';
import mapDispatchToProps from './mappings';

import './private-chat.component.css';

class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      filteredMessages: [],
      roomId: ''
    };
  }

  componentWillUpdate(nextState) {
    const roomId = this.state.roomId;

    if (nextState.messages !== this.state.messages) {
      const filteredMessages =
        nextState.messages.filter(msg => {
          return msg.isPrivate && msg.roomId === roomId;
        });

      this.setState({
        messages: nextState.messages,
        filteredMessages
      });
    }
  }

  componentDidMount() {
    const otherUserNickname = this.props.match.params.nickname;
    const myNickname = localStorage.getItem('nickname');

    const roomId = Array.of(otherUserNickname, myNickname).sort().join('|');
    this.setState({ roomId });
  }

  render() {
    return (
      <section id="private-chat">
        <h2 className="heading">Chat with {this.props.match.params.nickname} &bull; {` `}
          <a href="#go-back" onClick={(e) => {
            e.preventDefault();
            this.props.history.goBack();
          }}>
          Go Back
          </a>
        </h2>
        <ChatRoom
          nickname={localStorage.getItem('nickname')}
          displayName={this.props.match.params.nickname}
          messages={this.state.filteredMessages}
          addMessage={data => this.props.addMessage({
            ...data, isPrivate: true, roomId: this.state.roomId
          })}
          addOwnMessage={data => this.props.addOwnMessage({
            ...data, isPrivate: true, roomId: this.state.roomId
          })}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateChat));
