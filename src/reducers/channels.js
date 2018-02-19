import * as types from '../actions/constants/action-types';

const channels = (state = [], data) => {
  switch(data.type) {
    case types.CHANNEL_LIST:
      return data.channels;
    default:
      return state;
  }
};

export default channels;
