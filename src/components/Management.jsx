import React from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';

export default class Management extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        restart: React.PropTypes.func,
        next: React.PropTypes.func,
        hasWinner: React.PropTypes.bool
    }

    render() {
        const restartButton = this.props.restart
            ? <button
                ref={c => { this.restart = c; }}
                className="restart"
                disabled={!this.props.hasWinner}
                onClick={this.props.restart}
            >
                {'Restart'}
            </button>
            : null;
        const nextButton = this.props.next
            ? <button
                ref={c => { this.next = c; }}
                className="next"
                disabled={this.props.hasWinner}
                onClick={this.props.next}
            >
                {'Next'}
            </button>
            : null;

        return (
            <div className="management">
                {restartButton}
                {nextButton}
            </div>
        );
    }
}
