import React from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import Winner from './Winner';
import Management from './Management';
import Vote from './Vote';

import * as actionCreators from '../action_creators';

export class Voting extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        winner: React.PropTypes.string,
        restart: React.PropTypes.func
    }

    render() {
        return (
            <div className="voting">
                {
                    this.props.winner
                        ? <div className="results">
                            <Winner
                                ref={c => { this.winner = c; }}
                                winner={this.props.winner}
                            />
                            <Management
                                ref={c => { this.management = c; }}
                                restart={this.props.restart}
                                hasWinner
                            />
                        </div>
                        : <Vote {...this.props} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        hasVoted: state.getIn(['myVote', 'entry']),
        winner: state.get('winner')
    };
}

export const VotingContainer = connect(
    mapStateToProps,
    actionCreators
)(Voting);
