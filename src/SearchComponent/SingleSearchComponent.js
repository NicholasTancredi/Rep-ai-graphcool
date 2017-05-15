import React, { Component } from 'react';
import { View } from 'react-native';

import AlgoliaSearchHelper from 'algoliasearch-helper';
import SearchBar from './SearchBar';
import ResultComponent from './ResultComponent';
import ActivityIndicatorComponent from '../ActivityIndicatorComponent';
import styles from './styles';

export default class SingleSearchComponent extends Component {
    constructor(props){
        super(props);

        this.algoliasearch = require(
            'algoliasearch/reactnative'
        )('AC3KX9ZCFC', '8426e53e032f8554e6b95cd934ff0fcd');
        this.state = {
            result: null
        }
    }

    componentWillMount() {
        const helper = this.helper =
            AlgoliaSearchHelper(this.algoliasearch, this.props.type);

        helper.on('result', (result) => {
            this.setState({ result })
        });
        helper.search();
    }

    renderResults() {
        if (this.state.result) {
            return (
                    <ResultComponent
                        hits={this.state.result.hits}
                        type={this.props.type}
                        route={this.props.route}
                    />
                   )
        } else {
            return <ActivityIndicatorComponent />
        }
    }

    render() {
        return (
            <View style={styles.searchContainerStyle}>
                <SearchBar helper={this.helper} type={this.props.type}/>
                {this.renderResults()}
            </View>
        )
    }
}
