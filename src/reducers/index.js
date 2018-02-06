import { combineReducers } from 'redux';
import users from './users';
import channels from './channels';
import messages from './messages';

const chat = combineReducers({ users, channels, messages });

export default chat;
