import { List, Map } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_CLIENT_ID', () => {
        const initialState = Map();
        const action = {
            type: 'SET_CLIENT_ID',
            clientId: 1234
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(Map({
            clientId: 1234
        }));
    });

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({ Trainspotting: 1 })
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({ Trainspotting: 1 })
            })
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: { Trainspotting: 1 }
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({ Trainspotting: 1 })
            })
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: { Trainspotting: 1 }
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({ Trainspotting: 1 })
            })
        }));
    });

    it('handles VOTE by setting myVote', () => {
        const state = Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                round: 3,
                tally: Map({
                    Trainspotting: 1
                })
            })
        });
        const action = { type: 'VOTE', entry: 'Trainspotting' };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                round: 3,
                tally: Map({ Trainspotting: 1 })
            }),
            myVote: Map({
                entry: 'Trainspotting',
                round: 3
            })
        }));
    });

    it('does not set hasVoted for VOTE on invalid entry', () => {
        const state = Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    Trainspotting: 1
                })
            })
        });
        const action = { type: 'VOTE', entry: 'Sunshine' };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({ Trainspotting: 1 })
            })
        }));
    });

    it('removes myVote on SET_STATE if round has changed', () => {
        const initialState = Map({
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                round: 1,
                tally: Map({ Trainspotting: 1 })
            }),
            myVote: Map({
                entry: 'Trainspotting',
                round: 1
            })
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Sunshine', 'Slumdog Millionaire'],
                    round: 2
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(Map({
            vote: Map({
                pair: List.of('Sunshine', 'Slumdog Millionaire'),
                round: 2
            })
        }));
    });

    it('handles SET_STATE with my vote already in', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                clientId: 1234,
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    round: 1,
                    tally: {
                        Trainspotting: 1
                    },
                    votes: {
                        1234: 'Trainspotting'
                    }
                }
            }
        };
        const nextState = reducer(Map(), action);

        expect(nextState).to.equal(Map({
            clientId: 1234,
            vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                round: 1,
                tally: Map({
                    Trainspotting: 1
                }),
                votes: Map({
                    1234: 'Trainspotting'
                })
            }),
            myVote: Map({
                round: 1,
                entry: 'Trainspotting'
            })
        }));
    });
});
