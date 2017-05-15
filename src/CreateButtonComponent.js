import React, { Component } from 'react'
import {
    TouchableOpacity,
    Text,
    Dimensions,
    View,
    ActivityIndicator
} from 'react-native'
import styles from './styles'

export default class CreateButtonComponent extends Component {
    state = {}

    handlePress = (onPress, args) => {
        if (this.state.loading) {
            return null
        }

        this.setState(({
            loading: true
        }), () => {
            this.props.onPress(...args)
        })
    }

    render() {
        const {
            onPress,
            title
        } = this.props

        return (
            <TouchableOpacity
                onPress={(...args) => this.handlePress(onPress, args)}
                style={styles.createButton}
            >
                <View style={styles.flexDirectionRow}>
                    <Text style={styles.createButtonText}>
                        {title.toUpperCase()}
                    </Text>
                    {this.state.loading && (
                        <ActivityIndicator
                            color="white"
                            style={{
                                marginHorizontal: 12,
                            }}
                        />
                    )}
                </View>
            </TouchableOpacity>
        )
    }
}
