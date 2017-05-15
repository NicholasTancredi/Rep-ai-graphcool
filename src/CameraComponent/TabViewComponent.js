import React, { Component } from 'react'

import {
    Dimensions,
} from 'react-native'

import {
    TabViewAnimated,
    TabBar,
} from 'react-native-tab-view'

import PhotoButtonComponent from './PhotoButtonComponent'
import VideoButtonComponent from './VideoButtonComponent'

import styles from './styles'

export default class TabViewComponent extends Component {
    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Photo' },
            { key: '2', title: 'Video' },
        ],
    }

    scenes = [
        <PhotoButtonComponent
            camera={this.props.camera}
            onPress={this.props.onPhotoButtonPress}
        />,
        <VideoButtonComponent
            camera={this.props.camera}
            onPress={this.props.onVideoButtonPress}
        />,
    ]

    handleChangeTab = (index = 0) => {
        this.setState({ index })
    }

    renderFooter = props => (
        <TabBar
            labelStyle={styles.tabBarLabel}
            style={styles.tabBar}
            indicatorStyle={styles.tabBarIndicator}
            {...props}
        />
    )

    renderScene = ({ route: {key} }) => (
        this.scenes[key - 1] || null
    )

    initialLayout = {
        height: 0,
        width: Dimensions.get('window').width,
    }

    render() {
        return (
            <TabViewAnimated
                lazy={false}
                style={{flex: 1}}
                initialLayout={this.initialLayout}
                navigationState={this.state}
                renderScene={this.renderScene}
                renderFooter={this.renderFooter}
                onRequestChangeTab={this.handleChangeTab}
            />
        )
    }
}
