import React, { Component } from 'react'
import {
    View,
    Image
} from 'react-native'
import styles from './styles'
import ActivityIndicatorComponent from './ActivityIndicatorComponent'

export default class ImageLoader extends Component {
    state = {}

    handleOnLoadStart = (...args) => {
        const {
            onLoadStart
        } = this.props

        this.setState({loading: true}, () => {
            if (onLoadStart) {
                return onLoadStart(...args)
            }
        })
    }

    handleOnLoadEnd = (...args) => {
        const {
            onLoadEnd
        } = this.props

        this.setState({loading: false}, () => {
            if (onLoadEnd) {
                return onLoadEnd(...args)
            }
        })
    }

    render() {
        const {
            loading
        } = this.state

        return (
            <View style={styles.flex}>
                <Image
                    {...this.props}
                    onLoadStart={this.handleOnLoadStart}
                    onLoadEnd={this.handleOnLoadEnd}
                />
                {loading && (
                    <ActivityIndicatorComponent
                        style={styles.absoluteContainer}
                    />
                )}
            </View>
        )
    }
}
