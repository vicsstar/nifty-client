import React, { Component } from 'react';

import './empty-item.component.css';

export default class EmptyItem extends Component {
  render() {
    return <li className="empty-item">{this.props.children}</li>
  }
}
