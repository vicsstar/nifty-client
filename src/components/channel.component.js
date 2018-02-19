import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Channel extends Component {
  render() {
    return (
      <li className={`${this.props.classNames} ${this.props.channel && this.props.channel.hasNew ? 'has-new' : ''}`}>
        <a href={this.props.link}
          onClick={e => {
            e.preventDefault();
            this.props.onOpenChannel(this.props.channel);
          }}>
          {this.props.name}
        </a>
      </li>
    );
  }
}

Channel.propTypes = {
  classNames: PropTypes.string,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  channel: PropTypes.shape()
};

export default Channel;
