import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUser } from '../actions';

import './room-list.component.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] };
  }

  componentWillUpdate(nextState) {
    if (nextState.rooms !== this.state.rooms) {
      this.setState({ rooms: nextState.rooms });
    }
  }

  componentWillMount() {
    const nickname = localStorage.getItem('nickname');

    if (nickname) {
      this.props.dispatch(
        addUser(nickname)
      );
    }
  }

  render() {
    if (!localStorage.getItem('nickname')) {
      return <Redirect to="/"/>;
    }

    return (
      <div id="room-list">
        <h2>Tap a room to join</h2>
        <ul className="rooms">
        {this.state.rooms.map(room => (
          <li key={room.id}>
            <Link to={`/rooms/${room.id}/${room.name}`}>{room.name}</Link>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

const mapStateToProps = state => ({
  rooms: state.rooms
});

export default connect(mapStateToProps)(RoomList);
