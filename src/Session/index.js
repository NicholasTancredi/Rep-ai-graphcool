import React, { Component } from 'react'
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Dimensions,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { gql, compose } from 'react-apollo'
import graphqlSession, { getSession } from './graphql'
import ListComponent, {
    ExerciseListItemComponent,
} from '../ListComponent'

import CreateButtonComponent from '../CreateButtonComponent'

import ActivityIndicatorComponent from '../ActivityIndicatorComponent'

export class SessionComponent extends Component {
    textInputRefs = {}
    session = {}
    state = {
        selectedIds: [],
        descriptionHeight: 44,
    }

    constructor(props) {
        super(props)

        const {
            navigation: {
                state: {
                    params: {
                        props: {
                            userId
                        }
                    }
                }
            }
        } = this.props

        this.session.creatorId = userId
    }

    convertSelectedIdsToString = () => (
        this.state.selectedIds.map(id => (
            `"${id}"`
        ))
        .toString()
    )

    updateSession = () => {
        // console.warn('DEV ONLY: updating Session...')

        if (!this.session.creatorId) {
            return console.error('No User ID!')
        }

        if (!this.session.title) {
            return Alert.alert(
                'Blank Title',
                `Sorry, the title can't be blank.`,
                [{text: 'OK', onPress: () => {
                    this.textInputRefs.title.focus()
                }}],
                {cancelable: false}
            )
        }

        this.props.updateSession(this.session)
        .then(this.handleUpdateSessionExerciseConnection)
        .catch(e => console.error('updateSession: ', e))
    }

    createSession = () => {
        // console.warn('DEV ONLY: creating Session...')

        if (!this.session.creatorId) {
            return console.error('No User ID!')
        }

        if (!this.session.title) {
            return Alert.alert(
                'Blank Title',
                `Sorry, the title can't be blank.`,
                [{text: 'OK', onPress: () => {
                    this.textInputRefs.title.focus()
                }}],
                {cancelable: false}
            )
        }

        this.props.createSession(this.session)
        .then(
            ({
                data: {
                    createSession: {
                        changedSession: {
                            id
                        }
                    }
                }
            }) => this.handleAddToSessionExerciseConnection(id)
        )
        .catch(e => console.error('createSession: ', e))
    }

    handleAddToSessionExerciseConnection = (sessionId) => {
        this.state.selectedIds
        .map((exerciseId, i, {length}) => (
            this.props.addToSessionExerciseConnection({
                exerciseId,
                sessionId,
            })
            .then(() => {
                if (i === length - 1) {
                    this.handleAddToSessionsUsersConnection(sessionId)
                }
            })
            .catch(e => console.error(
                'addToSessionExerciseConnection: ',
                sessionId,
                exerciseId, i, e
            ))
        ))
    }

    handleAddToSessionsUsersConnection = (sessionId) => {
        this.props.addToSessionsUsersConnection({
            sessionId,
            userId: this.session.creatorId,
        }).then(() => {
            const {title} = this.session

            this.props.navigation
                .dispatch(NavigationActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Profile',
                        params: {
                            ...this.props.navigation.state.params
                        }}),
                        NavigationActions.navigate({
                            routeName: 'SessionDisplay', params: {
                            ...this.props.navigation.state.params,
                            id: sessionId,
                            title,
                        }}),
                    ]
                })
            )
        })
        .catch(e => console.error('addToSessionsUsersConnection: ', e))
    }

    render() {
        const {
            navigation: {
                state: {
                    params
                }
            }
        } = this.props

        if (this.props.data) {
            const {
                loading,
                exercises: {
                    edges
                }
            } = this.props.data

            if (loading) {
                return (
                    <ActivityIndicatorComponent />
                )
            }

            if (edges.length && !this.state.edgesSet) {
                this.setState({
                    edgesSet: true,
                    selectedIds: edges.map(({node: {id}}) => id)
                })
            }
        }

        return (
            <ScrollView style={styles.container}>
                <View style={[styles.inputView, styles.inputViewTitle]}>
                    <Text style={[styles.text, styles.textTitle]}>
                        {('Title').toUpperCase()}</Text>
                    <TextInput
                        defaultValue={
                            this.props.data ?
                            this.props.data.title || '' : ''
                        }
                        placeholder="Title"
                        style={[styles.textInput, styles.textInputTitle]}
                        onChangeText={text => {
                            this.session.title = text
                        }}
                        ref={ref => {
                            this.textInputRefs
                            .title = ref
                        }}
                    />
                </View>

                <View style={[styles.inputView, styles.inputViewDescription]}>
                    <Text style={[styles.text, styles.textDescription]}>
                        {('Description').toUpperCase()}</Text>
                    <TextInput
                        defaultValue={
                            this.props.data ?
                            this.props.data.description || '' : ''
                        }
                        multiline={true}
                        onChangeText={text => {
                            this.session.description = text
                        }}
                        onFocus={() => {
                            this.setState({descriptionHeight: 100})
                        }}
                        onBlur={() => {
                            this.setState({descriptionHeight: 44})
                        }}
                        style={[styles.textInput, styles.textInputDescription, {
                            height: this.state.descriptionHeight,
                        }]}
                        placeholder="Description"
                        ref={ref => {
                            this.textInputRefs
                            .description = ref
                        }}
                    />
                </View>
                <View style={[{
                    width: (Dimensions.get('window').width),
                    height: (Dimensions.get('window').height / 2)
                }]}>
                {!this.state.selectedIds.length ? null : (
                    <View style={[styles.inputView, {flex: 1}]}>
                        <Text style={[styles.text]}>
                            {'Selected'.toUpperCase()}
                        </Text>
                    <ListComponent
                        first={10}
                        type="allExercises"
                        where={`{
                            id: {
                                in: [${this.convertSelectedIdsToString()}]
                            }
                        }`}
                        fragmentName="SelectedExerciseNodeFragment"
                        NodeFragment={gql `
                            fragment SelectedExerciseNodeFragment on Exercise {
                                id
                                title
                                reps
                                sets
                            }
                        `}
                        renderItem={item => (
                            <ExerciseListItemComponent
                                {...item}
                                onPress={() => {
                                    this.setState(({selectedIds}) => ({
                                        selectedIds: selectedIds
                                        .filter(id => (
                                            id !== item.id
                                        ))
                                    }))
                                }}
                            />
                        )}/>
                    </View>
                )}

                <View style={styles.inputViewSearch}>
                    <TextInput
                        style={[styles.textInput, styles.textInputSearch]}
                        placeholder="Search Exercises"
                        onChangeText={searchText => {
                            this.setState({searchText})
                        }}
                    />
                </View>

                <ListComponent
                    first={10}
                    type="allExercises"
                    where={`{
                        ${!this.state.selectedIds.length ? '' : `id: {
                            notIn: [${this.convertSelectedIdsToString()}]
                        }`}
                        title: {
                            like: "%${this.state.searchText || ''}%"
                        }
                        users: {
                            node: {
                                id: {
                                    eq: "${params.props.userId}"
                                }
                            }
                        }
                    }`}
                    fragmentName="ExerciseNodeFragment"
                    NodeFragment={gql `
                        fragment ExerciseNodeFragment on Exercise {
                            id
                            title
                            reps
                            sets
                        }
                    `}
                    renderItem={item => (
                        <ExerciseListItemComponent
                            {...item}
                            onPress={() => {
                                this.setState(({selectedIds}) => ({
                                    selectedIds: [...selectedIds, item.id]
                                }))
                            }}
                        />
                    )}
                />
                <CreateButtonComponent
                    title={`${params.id ? 'Update' : 'Create'} Session`}
                    onPress={() => {

                        if (params.id) {
                            return this.updateSession(params.id)
                        }

                        this.createSession()
                    }}
                />
                </View>
            </ScrollView>
        )
    }
}

export default class SesssionGraphQLComponent extends Component {
    constructor(props) {
        super(props)
        this.compose = [...graphqlSession]

        const {
            navigation: {
                state: {
                    params: {
                        id,
                    }
                }
            }
        } = this.props

        if (id) {
            this.compose.push(getSession(id))
        }
    }

    render() {
        const ComposedSessionComponent = compose(
            ...this.compose
        )(SessionComponent)

        return <ComposedSessionComponent
            {...this.props}
        />
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 6,
    },
    inputView: {
        paddingHorizontal: 12,
        paddingBottom: 6,
    },
    inputViewTitle: {},
    text: {
        margin: 6,
        letterSpacing: 1,
        color: '#777',
    },
    textTitle: {},
    textInput: {
        height: 44,
        paddingLeft: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    },
    inputViewSearch: {
        backgroundColor: '#f1f1f1'
    },
    textInputSearch: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 8,
        marginHorizontal: 10,
    },
    textInputTitle: {},
    textInputDescription: {
        height: 44,
        paddingTop: 8,
    },
})
