import { combineReducers } from 'redux';
import users from './users';
import rooms from './rooms';
import messages from './messages';

const chat = combineReducers({ users, rooms, messages });

export default chat;
