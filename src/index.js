import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Chat from './components/chat.component';

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
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/chat/:nickname" component={Chat} />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
