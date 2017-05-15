import React, { Component } from 'react';
import { ListView } from 'react-native';
import styles from './styles';
import RenderItems from './RenderItems';

export default class ResultComponent extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            hits: dataSource.cloneWithRows(props.hits)
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ hits: this.state.hits.cloneWithRows(props.hits)});
    }

    render() {
        return (
            <ListView
                style={styles.resultStyle}
                dataSource={this.state.hits}
                renderRow={ (hit) => <RenderItems 
                                        id={hit.id} 
                                        type={this.props.type}
                                        route={this.props.route}
                                     /> }
            />
        )
    }
}
