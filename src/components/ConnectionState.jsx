import React from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import { Map } from 'immutable';

export class ConnectionState extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        connected: React.PropTypes.bool,
        state: React.PropTypes.string
    }

    isVisible = () => {
        return !this.props.connected;
    }

    getMessage = () => {
        return `Not connected (${this.props.state})`;
    }

    render() {
        return (
            <div
                className="connectionState"
                style={{ display: this.isVisible() ? 'block' : 'none' }}
            >
                {this.getMessage()}
            </div>
        );
    }
}

export const ConnectionStateContainer = connect(
    state => state.get('connection', Map()).toJS()
)(ConnectionState);
