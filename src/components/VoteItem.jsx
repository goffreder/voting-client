import React from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';
import classNames from 'classnames';

export default class VoteItem extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        entry: React.PropTypes.string,
        hasVoted: React.PropTypes.string,
        vote: React.PropTypes.func
    }

    hasVotedFor = (entry) => {
        return this.props.hasVoted === entry;
    }

    _vote = () => {
        this.props.vote(this.props.entry);
    }

    render() {
        return (
            <button
                className={classNames({
                    voted: this.hasVotedFor(this.props.entry)
                })}
                onClick={this._vote}
            >
                <h1>{this.props.entry}</h1>
                {
                    this.hasVotedFor(this.props.entry)
                        ? <div className="label">{'Voted'}</div>
                        : null
                }
            </button>
        );
    }
}
