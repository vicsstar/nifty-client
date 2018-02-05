import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './channels.component.css';

class Channels extends Component {
  render() {
    return (
      <div id="channel-list">
        <h4>Channels</h4>
        <ul className="items">
        {
          this.props.channels.map(channel => (
            <li key={channel.id}>
              <a href={`#/channel/${channel.name}`}>{channel.name}</a>
            </li>
          ))
        }
        </ul>
      </div>
    );
  }
}

Channels.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Channels;
