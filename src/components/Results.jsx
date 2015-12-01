import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import * as actionCreators from '../action_creators';

import Winner from './Winner';

export const VOTE_WIDTH_PERCENT = 8;

export class Results extends React.Component {
    constructor() {
        super()
    }

    shouldComponentUpdate = shouldPureComponentUpdate

    getPair() {
        return this.props.pair || [];
    }

    getVotes(entry) {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }

        return 0;
    }

    getVotesBlockWidth(entry) {
        return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
    }

    render() {
        return this.props.winner
            ? <Winner ref="winner" winner={this.props.winner} />
            :  (
                <div className="results">
                    <div className="tally">
                        {
                            this.getPair().map(entry => (
                                <div key={entry} className="entry">
                                    <h1>{entry}</h1>
                                    <div className="voteVisualization">
                                        <div className="votesBlock" style={{
                                            width: this.getVotesBlockWidth(entry)
                                        }}></div>
                                    </div>
                                    <div className="voteCount">
                                        {this.getVotes(entry)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="management">
                        <button ref="next" className="next" onClick={this.props.next}>Next</button>
                    </div>
                </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    };
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
