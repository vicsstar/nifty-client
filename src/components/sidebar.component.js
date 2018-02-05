import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Channels from './channels.component';
import Users from './users.component';

import './sidebar.component.css';

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <header>
          <h3>Nifty PRO</h3>
          <p>nickname</p>
        </header>
        <Channels channels={[]} />
        <Users users={[]} nickname={this.props.nickname} />
      </div>
    );
  }
}

Sidebar.propTypes = {
  nickname: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Sidebar;
