import React from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import { List, Map } from 'immutable';

import * as actionCreators from '../action_creators';

import Winner from './Winner';
import Management from './Management';

export const VOTE_WIDTH_PERCENT = 8;

export class Results extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        pair: React.PropTypes.instanceOf(List),
        tally: React.PropTypes.instanceOf(Map),
        winner: React.PropTypes.string,
        next: React.PropTypes.func,
        restart: React.PropTypes.func
    }

    getPair = () => {
        return this.props.pair || [];
    }

    getVotes = (entry) => {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }

        return 0;
    }

    getVotesBlockWidth = (entry) => {
        return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
    }

    render() {
        const content = this.props.winner
            ? <Winner
                ref={c => { this.winner = c; }}
                winner={this.props.winner}
            />
            : <div className="tally">
                {this.getPair().map(entry =>
                    <div key={entry} className="entry">
                        <h1>{entry}</h1>
                        <div className="voteVisualization">
                            <div className="votesBlock"
                                style={{width: this.getVotesBlockWidth(entry)}}
                            >
                            </div>
                        </div>
                        <div className="voteCount">
                            {this.getVotes(entry)}
                        </div>
                    </div>
                )}
            </div>;

        return (
            <div className="results">
                {content}
                <Management
                    ref={c => { this.management = c; }}
                    next={this.props.next}
                    restart={this.props.restart}
                    hasWinner={Boolean(this.props.winner)}
                />
            </div>
        );
    }
}

// export const Results = React.createClass({
//     mixins: [PureRenderMixin],
//
//     getPair: function() {
//         return this.props.pair || [];
//     },
//
//     getVotes: function(entry) {
//         if (this.props.tally && this.props.tally.has(entry)) {
//             return this.props.tally.get(entry);
//         }
//
//         return 0;
//     },
//
//     getVotesBlockWidth: function(entry) {
//        return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
//     },
//
//     render: function() {
//
//     }
// });

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get('winner')
    };
}

export const ResultsContainer = connect(
    mapStateToProps,
    actionCreators
)(Results);
