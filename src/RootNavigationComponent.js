import React, { Component } from 'react'

import {
    Animated,
    View,
    AsyncStorage,
    StatusBar,
} from 'react-native'

import TabBarComponent from './TabBarComponent'
import StackNavigatorComponent from './StackNavigatorComponent'

export default class RootNavigationComponent extends Component {
    state = {
        marginBottom: new Animated.Value(0),
        active: 'Profile' || this.props.active || 'Profile',
    }

    height = 49

    duration = 100

    tabs = [
        {
            title: 'Profile',
            name: 'ios-home'
        }, {
            title: 'Search',
            name: 'ios-search'
        }, {
            title: 'Create',
            name: 'ios-camera'
        }, {
            title: 'Chat',
            name: 'ios-chatboxes'
        }, {
            title: 'Followers',
            name: 'ios-calendar'
        },
    ]

    hide = () => {
        Animated.timing(
            this.state.marginBottom, {
                duration: this.duration,
                toValue: -this.height
            }
        ).start()
    }

    show = () => {
        Animated.timing(
            this.state.marginBottom,
            {duration: this.duration, toValue: 0}
        ).start()
    }

    render() {
        AsyncStorage.setItem('tabBarStateActiveItem', this.state.active)

        return (
            <View style={{flex: 1}} >
                <StatusBar barStyle="light-content" />

                <StackNavigatorComponent
                    initialRouteName={this.state.active}
                    initialRouteParams={{
                        props: this.props,
                        tabBarShow: this.show,
                        tabBarHide: this.hide,
                        tabBarSetState: props => {
                            this.setState(props)
                        },
                    }}
                />

                <TabBarComponent
                    tabs={this.tabs}
                    marginBottom={this.state.marginBottom}
                    active={this.state.active}
                    setActive={(active) => {
                        this.setState({active})
                    }}
                />
            </View>
        )
    }
}
