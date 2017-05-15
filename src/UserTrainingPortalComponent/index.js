
/* root component for the current user's training portal
    implements the ProfileHeader, ProfileContent, and within that
    the ContentSections.
*/

import React, { Component } from 'react'
import { View } from 'react-native'

import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'

export default class UserTrainingPortalComponent extends Component {
    static navigationOptions = {
        title: 'Training Portal',
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ProfileHeader />
                <ProfileContent />
            </View>
        )
    }
}
