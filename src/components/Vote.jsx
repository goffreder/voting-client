import React from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';

import { List } from 'immutable';

import VoteItem from './VoteItem';

export default class Vote extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        pair: React.PropTypes.instanceOf(List)
    }

    getPair = () => {
        return this.props.pair || [];
    }

    render() {
        return (
            <div className="voting">
                {
                    this.getPair().map(entry =>
                        <VoteItem key={entry} entry={entry} {...this.props} />
                    )
                }
            </div>
        );
    }
}
