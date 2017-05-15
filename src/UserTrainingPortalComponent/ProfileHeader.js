
/* Profile Header to be used within a Training Portal
    - generates a card containing avatar, username etc.
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import ImageLoader from '../ImageLoader';
import styles from './styles';

//import { gql, graphql } from 'react-apollo';

//graphql calls user details

class ProfileHeader extends Component {
    user = {
        avatarUri: '',
        username: 'jaruserickson',
        teams: [
            'Northwest Warriors',
            'Calgary Hornets',
            'Toronto Marlies',
            'KC Royals'
        ]
    }
    //render the header
    render() {
        let endString = ''
        if (this.user.teams.length > 3){
            endString = ', ...'
        }

        return (
            <View style={styles.headerContainerStyle}>
                {/* default placeholder if no avatar exists */}
                {!this.user.avatarUri ? (
                    <View style={[
                        styles.profileImage,
                        styles.imagePlaceholder
                    ]}>
                        <Icon
                            size={38}
                            color="white"
                            name="ios-person"
                        />
                    </View>
                ) : (
                    <View style={styles.profileImage}>
                        <ImageLoader
                            source={{uri: this.user.avatarUri}}
                            style={styles.profileImage}
                        />
                    </View>
                )}

                {/* this user's information */}
                <View style={styles.headerContentContainerStyle}>
                    <Text style={styles.headerNameStyle}>
                        {this.user.username}
                    </Text>

                    {/* render team list */}
                    <Text style={styles.headerTeamStyle}>
                        {this.user.teams.slice(0,3).join(', ') + endString}
                    </Text>

                    <TouchableOpacity 
                        style={styles.headerFollowButtonStyle}
                    >
                        <Text style={styles.headerFollowButtonTextStyle}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default ProfileHeader;
