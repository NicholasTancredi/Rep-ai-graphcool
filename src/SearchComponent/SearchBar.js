import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        
        switch (this.props.type) {
            case 'UsernameSearch':
                this.typeText = 'Users';
                break;
            case 'ExerciseSearch':
                this.typeText = 'Exercises';
                break;
            case 'SessionSearch':
                this.typeText = 'Sessions';
                break;
            case 'ProgramSearch':
                this.typeText = 'Programs'
                break;
            case 'TeamSearch':
                this.typeText = 'Teams';
                break;
            default:
                this.typeText = 'Users'
        }
    }

    updateQuery(event) {
        const query = event.nativeEvent.text;
        this.props.helper.setQuery(query)
                         .search();
    }

    render() {
        return (
            <View style={styles.searchBarStyle}>
                <TextInput 
                    style={styles.searchInputStyle}
                    onChange={(event) => this.updateQuery(event)}
                    placeholder={'Search for ' + this.typeText}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                />
            </View>
        )
    }
}
