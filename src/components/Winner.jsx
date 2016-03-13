import React from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';

export default class Winner extends React.Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    static propTypes = {
        winner: React.PropTypes.string
    }

    render() {
        return (
            <div className="winner">{`Winner is ${this.props.winner}!`}</div>
        );
    }
}
