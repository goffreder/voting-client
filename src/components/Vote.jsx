import React from 'react';
import classNames from 'classnames';

import shouldPureComponentUpdate from 'react-pure-render/function';

export default class Vote extends React.Component {
    constructor() {
        super()
    }

    shouldComponentUpdate = shouldPureComponentUpdate

    getPair() {
        return this.props.pair || [];
    }

    isDisabled() {
        return !!this.props.hasVoted;
    }

    hasVotedFor(entry) {
        return this.props.hasVoted === entry;
    }

    render() {
        return (
            <div className="voting">
                {
                    this.getPair().map(entry => {
                        return (
                            <button
                                key={entry}
                                className={classNames({
                                    voted: this.hasVotedFor(entry)
                                })}
                                disabled={this.isDisabled()}
                                onClick={() => this.props.vote(entry)}
                            >
                                <h1>{entry}</h1>
                                {
                                    this.hasVotedFor(entry)
                                        ? <div className="label">Voted</div>
                                        : null
                                }
                            </button>
                        )
                    })
                }
            </div>
        );
    }
}
