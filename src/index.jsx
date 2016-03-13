import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { batchActions, enableBatching } from 'redux-batched-actions';
import io from 'socket.io-client';
import reducer from './reducer';
import { setClientId, setState, setConnectionState } from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App';
import { VotingContainer } from './components/Voting';
import { ResultsContainer } from './components/Results';

require('./normalize.min.css');
require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

let connectionStatus = null;
let connectionEvents = [
    'connect',
    'connect_error',
    'connect_timeout',
    'reconnect',
    'reconnecting',
    'reconnect_error',
    'reconnect_failed'
];

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(enableBatching(reducer));

socket.on('state', state => {
    store.dispatch(batchActions([
        setState(state),
        setConnectionState(connectionStatus, socket.connected)
    ]));
});

connectionEvents.forEach(ev =>
    socket.on(ev, () => {
        connectionStatus = ev;
        store.dispatch(setConnectionState(connectionStatus, socket.connected));
    })
);

store.dispatch(setClientId(getClientId()));

const routes = (<Route component={App}>
    <Route path="/" component={VotingContainer} />
    <Route path="/results" component={ResultsContainer} />
</Route>);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
