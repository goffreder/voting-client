import { Map } from 'immutable';

function setState(state, newState) {
    const clientId = state.get('clientId');

    if (clientId) {
        newState.clientId = clientId;
    }

    return state.clear().merge(newState);
}

function setConnectionState(state, connectionState, connected) {
    return state.set('connection', Map({
        state: connectionState,
        connected
    }));
}

function vote(state, entry) {
    const currentPair = state.getIn(['vote', 'pair']);

    if (currentPair && currentPair.includes(entry)) {
        return state.set('myVote', Map({
            round: state.getIn(['vote', 'round']),
            entry
        }));
    }

    return state;
}

function resetVote(state) {
    const votedInRound = state.getIn(['myVote', 'round']);
    const currentRound = state.getIn(['vote', 'round']);
    const clientId = state.get('clientId');

    if (!votedInRound) {
        const remoteVote = state.getIn(['vote', 'votes', String(clientId)]);

        if (remoteVote) {
            return state.set('myVote', Map({
                round: currentRound,
                entry: remoteVote
            }));
        }

        return state;
    }
    if (votedInRound !== currentRound) {
        return state.remove('myVote');
    }

    return state;
}

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_CLIENT_ID':
            return state.set('clientId', action.clientId);
        case 'SET_CONNECTION_STATE':
            return setConnectionState(state, action.state, action.connected);
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
        case 'VOTE':
            return vote(state, action.entry);
        default:
            return state;
    }
}
