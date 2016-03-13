import React from 'react';

import { ConnectionStateContainer } from './ConnectionState';

export default class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    render() {
        return (<div>
            <ConnectionStateContainer />
            {this.props.children}
        </div>);
    }
}
