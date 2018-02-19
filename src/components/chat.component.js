import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import ChatRoom from './chat-room.component';
import Sidebar from './sidebar.component';
import mapDispatchToProps from './mappings';

import './chat.component.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      messages: [],
      filteredMessages: [],
      users: [],
      activeChannel: {}
    };
  }

  componentWillUpdate(nextState) {
    if (nextState.channels && nextState.channels !== this.state.channels) {
      let activeChannel = this.state.activeChannel;

      if (!this.state.activeChannel.id && nextState.channels.length !== 0) {
        activeChannel = nextState.channels[0];
      }

      this.setState({
        channels: nextState.channels,
        activeChannel
      });
    }

    if (nextState.messages && nextState.messages !== this.state.messages) {
      const filteredMessages = this.filterMessages(nextState.messages);

      this.setState(() => {
        return {
          messages: nextState.messages,
          filteredMessages
        }
      });
      this.markUnreadChannel(nextState.messages);
    }

    if (nextState.users && nextState.users !== this.state.users) {
      this.setState(() => {
        return { users: nextState.users };
      });
    }
  }

  componentDidMount() {
    const nickname = this.props.match.params.nickname;
    if (nickname) {
      this.props.addUser(nickname);
    }
  }

  componentWillUnmount() {
    const nickname = this.props.match.params.nickname;
    if (nickname) {
      this.props.removeUser(nickname);
    }
  }

  filterMessages(messages, channel) {
    return messages.filter(message => (
      message.channelId === (channel || this.state.activeChannel).id
    ));
  }

  openChannel(channel) {
    const filteredMessages = this.filterMessages(this.state.messages, channel);
    filteredMessages.forEach(message => {
      if (message.isNew) {
        message.isNew = false;
      }
    });

    channel.hasNew = false;

    this.setState(() => ({
      activeChannel: channel,
      filteredMessages
    }));
  }

  markUnreadChannel(messages) {
    const recentMessage = messages.reverse().find(message => message.isNew === true);

    if (recentMessage) {
      const unreadChannel = this.state.channels.find(channel => (
        channel.id !== this.state.activeChannel.id && channel.id === recentMessage.channelId)
      );

      if (unreadChannel) {
        unreadChannel.hasNew = true;
      }
    }
  }

  render() {
    const nickname = this.props.match.params.nickname;
    if (!nickname) {
      return <Redirect to="/" />;
    }

    return (
      <section id="chat">
        <Sidebar
          nickname={this.props.match.params.nickname}
          channels={this.state.channels}
          users={this.state.users}
          activeChannel={this.state.activeChannel}
          onOpenChannel={data => this.openChannel(data)}
        />
        <ChatRoom
          messages={this.state.filteredMessages}
          nickname={this.props.match.params.nickname}
          channel={this.state.activeChannel}
          addMessage={data => this.props.addMessage(data)}
          addOwnMessage={data => this.props.addOwnMessage(data)}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
  messages: state.messages,
  users: state.users
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
