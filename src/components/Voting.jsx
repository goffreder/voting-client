import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';

import Winner from './Winner';
import Vote from './Vote';

export class Voting extends React.Component {
    constructor() {
        super()
    }

    shouldComponentUpdate = shouldPureComponentUpdate

    render() {
        return (
            <div className="voting">
                {
                    this.props.winner
                        ? <Winner ref="winner" winner={this.props.winner} />
                        : <Vote {...this.props} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        hasVoted: state.get('hasVoted'),
        winner: state.get('winner')
    };
}

export const VotingContainer = connect(
    mapStateToProps,
    actionCreators
)(Voting);
