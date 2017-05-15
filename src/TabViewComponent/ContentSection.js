
/* Basic ContentSection used to show a content card.
    - only generates title/description at the moment.
    - limits description to 200 characters
*/

import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
import styles from '../UserTrainingPortalComponent/styles';

class ContentSection extends Component {
    render() {
        let thisDesc = this.props.description;
        //string limiting
        if (this.props.description.length > 200){
            thisDesc = this.props.description.substring(0, 200) + '...'
        }

        return (
            <TouchableOpacity 
                onPress={this.props.onPress}
                style={styles.contentButtonStyle}
            >
                <Text style={styles.headerNameStyle}>
                    {this.props.title}
                </Text>
                <Text style={styles.headerTeamStyle}>
                    {thisDesc}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default ContentSection;
