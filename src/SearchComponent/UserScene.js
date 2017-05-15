import React, { Component } from 'react'
import {
    Animated,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native'


export default class UserScene extends Component {
    //TODO: take out of render

    renderItem = ({
        id,
        email,
        username,
        avatarUri,
        online,
        height,
    }) => (
        <TouchableOpacity
            style={[styles.listItem, {height}]}
            onPress={() => {
                navigate(
                    'TrainingPortalComponent', {
                        user: { id },
                        notCurrentUser: true,
                    }
                )
            }}>

            <View>
                {!avatarUri ? (
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
                            source={{uri: avatarUri}}
                            style={styles.profileImage}
                        />
                    </View>
                )}
                {online && (
                    <View style={styles.userActiveContainer}>
                        <Icon
                            size={12}
                            color="white"
                            name="ios-flash"
                        />
                    </View>
                )}
            </View>
            <View>
                {typeof email === 'string' && (
                    <Text style={styles.smallText}>
                        {(email).toUpperCase()}
                    </Text>
                )}
                <Text style={styles.strongText}>
                    {username}
                </Text>
            </View>
            <View style={[styles.eyeIcon, {height}]}>
                <Icon
                    size={32}
                    color={colors.main}
                    name="ios-eye-outline"
                />
            </View>
        </TouchableOpacity>
    )


    render(){
        return(
            null
        )
    }

}
