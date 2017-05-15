import React, { Component } from 'react'

import {
    View,
    Text,
    ScrollView,
    Dimensions,
} from 'react-native'

import { getSession } from './graphql'
import styles from '../styles'
import ActivityIndicatorComponent from '../ActivityIndicatorComponent'

import {
    ExerciseListItemComponent
} from '../ListComponent'

export class SessionDisplayComponent extends Component {
    renderExercises = () => {
        const {
            data: {
                getSession: {
                    exercises: {
                        edges
                    }
                }
            }
        } = this.props

        return !edges.length ? null : (
            <ScrollView
                style={{
                    width: Dimensions.get('window').width,
                }}
            >
                {(
                    edges.map(({node}, key) => (
                        <ExerciseListItemComponent
                            {...node}
                            height={60}
                            key={key}
                        />
                    ))
                )}
            </ScrollView>
        )
    }

    renderSession = () => {
        const {
            data: {
                getSession: {
                    description
                }
            }
        } = this.props

        return (
            <View style={styles.container}>
                <Text>{description}</Text>
                {this.renderExercises()}
            </View>
        )
    }

    render() {
        const {
            data: { loading }
        } = this.props

        if (loading) {
            return <ActivityIndicatorComponent />
        }

        return this.renderSession()
    }
}

export default class SessionDisplayGraphQLComponent extends Component {
    static navigationOptions = {
        title: ({state: {params: {title}}}) => title || 'Session'
    }

    render() {
        const SessionDisplayGraphQLComposeComponent = getSession(
            this.props.navigation.state.params.id
        )(SessionDisplayComponent)

        return <SessionDisplayGraphQLComposeComponent {...this.props} />
    }
}
