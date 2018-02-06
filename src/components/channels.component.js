import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Channel from './channel.component';

import './channels.component.css';

class Channels extends Component {
  render() {
    return (
      <div id={`channel-list`}>
        <h4>Channels</h4>
        <ul className="items">
        {this.props.channels.map(channel => (
          <Channel
            classNames={this.props.activeChannel.id === channel.id ? 'selected': ''}
            key={channel.id}
            link={`#/channel/${channel.name}`}
            name={`# ${channel.name}`}
            channel={channel}
            onOpenChannel={data => this.props.onOpenChannel(data)}
          />
        ))}
        </ul>
      </div>
    );
  }
}

Channels.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  onOpenChannel: PropTypes.func.isRequired
};

export default Channels;
