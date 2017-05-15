
/* UserSection nested within a TabViewComponent
    - generates a card which displays the content of a certain user
    
    props: 
        user: (Object) { avatarUri, username, email etc.. }
*/

import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/Ionicons'
import ImageLoader from '../ImageLoader';

class UserSection extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                {/* default placeholder if no avatar exists */}
                {!this.props.user.avatarUri ? (
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
                            source={{uri: this.props.user.avatarUri}}
                            style={styles.profileImage}
                        />
                    </View>
                )}

                <View style={styles.infoStyle}>
                    <Text style={styles.nameStyle}>
                        {this.props.user.username}
                    </Text>
                    <Text style={styles.emailStyle}>
                        {this.props.user.email}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        margin: 5,
        padding: 10,
        paddingBottom: 0,
        borderColor: '#e6e6ed',
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'row',
        height: 83
    },

    profileImage: {
        borderRadius: 62 / 2,
        width: 62,
        height: 62,
        marginRight: 21,
    },
    imagePlaceholder: {
        backgroundColor: colors.main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoStyle: {

    },
    nameStyle: {
        fontSize: 18,
        letterSpacing: 0.5,
        color: colors.main,
    },
    emailStyle: {
        fontSize: 11,
        letterSpacing: 0.5,
        color: '#777',
        marginBottom: 12
    },
}


export default UserSection;
