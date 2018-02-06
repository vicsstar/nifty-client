import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import App from './App';
import Chat from './components/chat.component';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import setupWebSocket from './sockets';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import sagas from './sagas';

import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

const socket = setupWebSocket(store.dispatch);

sagaMiddleware.run(sagas, { socket });

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/chat/:nickname" component={Chat} />
      </div>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();
