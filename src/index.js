import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import RoomList from './components/room-list.component';
import PublicChat from './components/public-chat.component';
import PrivateChat from './components/private-chat.component';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import setupWebSocket from './sockets';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

const socket = setupWebSocket(store.dispatch);

sagaMiddleware.run(sagas, { socket });

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div id="container">
        <header><h3>Nifty</h3></header>
        <section id="main">
          <Route exact path="/" component={App} />
          <Route exact path="/rooms" component={RoomList} />
          <Route exact path="/rooms/:roomId/:roomName" component={PublicChat} />
          <Route path="/private-chat/:nickname" component={PrivateChat} />
          </section>
        <footer></footer>
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
