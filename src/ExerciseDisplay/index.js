import React, {Component} from 'react'

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage,
} from 'react-native'
import { gql, graphql, compose } from 'react-apollo'

import colors from '../colors'
import Icon from 'react-native-vector-icons/Ionicons'
const red = colors.main
import ImageListView from '../ImageListView'
import VideoPlayer from '../VideoPlayer'
import ActivityIndicatorComponent from '../ActivityIndicatorComponent'

// const UpdateUserMutation = gql `
//     mutation UpdateUserMutation($data: UpdateUserInput!) {
//         updateUser(input: $data) {
//             changedUser {
//                 id
//             }
//         }
//     }
// `

const AddToUserExerciseConnectionMutation = gql `
    mutation AddToUserExerciseConnectionMutation(
        $data: AddToUserExerciseConnectionInput!
    ) {
      addToUserExerciseConnection(input: $data) {
        changedUserExercise {
            createdAt
        }
      }
    }
`

const AddToUserExerciseConnectionMutationGraphql = graphql(
    AddToUserExerciseConnectionMutation, {
    props: ({mutate}) => ({
        addToUserExerciseConnection: data => mutate({variables: {data}})
    })
})

// const UpdateUserMutationGraphql = graphql(UpdateUserMutation, {
//     props: ({mutate}) => ({
//         updateUser: data => mutate({variables: {data}})
//     })
// })

const ExerciseFragment = gql `
    fragment ExerciseFragment on Exercise {
        id
        reps
        title
        sets
        description

        creator {
            id
            username
        }

        video {
            id
            uri
        }

        images {
            edges {
                node {
                    id
                    uri
                }
            }
        }
    }
`

// const UpdateExerciseMutation = gql `
//     mutation UpdateExerciseMutation($data: UpdateExerciseInput!) {
//         updateExercise(input: $data) {
//             changedExercise {
//                 ...ExerciseFragment
//             }
//         }
//     }
//     ${ExerciseFragment}
// `

// const UpdateExerciseMutationGraphql = graphql(UpdateExerciseMutation, {
//     props: ({mutate}) => ({
//         updateExercise: data => mutate({variables: {data}})
//     })
// })

const getExerciseQuery = (id) => gql `
    query Exercise {
        getExercise(id: "${id}") {
            ...ExerciseFragment
        }
    }
    ${ExerciseFragment}
`

class ExerciseDisplay extends Component {
    render() {
        const {
            exercise,
            editable
        } = this.props.navigation.state.params

        const data = this.props.data || {}

        if (data.loading) {
            return <ActivityIndicatorComponent />
        }

        const {
            video,
            images = {edges: []},
            reps,
            sets,
            teamTag,
            description,
            creator,
            id,
        } = data.getExercise || exercise

        if (!editable) {
            AsyncStorage.getItem('userId')
            .then(userId => {
                if (userId === creator.id) {
                    this.props.navigation
                    .setParams({data, editable: true})
                } else {
                    this.props.navigation
                    .setParams({data, follow: () => {
                        this.props.addToUserExerciseConnection({
                            userId,
                            exerciseId: id,
                        })
                        .then(() => {
                            this.props.navigation
                            .setParams({
                                following: true,
                            })
                        })
                        .catch(err => console
                            .error('addToUserExerciseConnection: ', err))
                    }})
                }
            })
            .catch(console.error)
        } else if (!this.props.navigation.state.params.data) {
            this.props.navigation.setParams({data})
        }

        return (
            <ScrollView>
                {!images.edges[0] ? null : (
                    <Image
                        source={{uri: images.edges[0].node.uri}}
                        style={styles.firstImage}
                    />
                )}
                <View style={styles.flex}>
                    {!teamTag ? null : (
                        <View style={styles.teamTagContainer}>
                            <Text style={styles.teamTagTitle}>
                                TEAM TAG
                            </Text>
                            <Text style={styles.teamTagText}>
                                {`#${teamTag}`}
                            </Text>
                        </View>
                    )}
                    {!description ? null : (
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.title}>
                                DESCRIPTION
                            </Text>
                            <Text style={styles.description}>
                                {description}
                            </Text>
                        </View>
                    )}

                    <View style={styles.repSetsContainer}>
                        {!reps ? null : (
                            <View style={styles.repView}>
                                <Text style={styles.italic}>{reps}</Text>
                                <Text style={styles.text}>REPS</Text>
                            </View>
                        )}
                        {!sets ? null : (
                            <View style={styles.setView}>
                                <Text style={styles.italic}>{sets}</Text>
                                <Text style={styles.text}>SETS</Text>
                            </View>
                        )}
                    </View>

                    {images.edges.length < 2 ? null :
                        <View>
                            <Text style={styles.teamTagText}>Images</Text>
                            <ImageListView
                                collection={images.edges
                                    .filter((_, i) => i)
                                    .map(({node: {uri}}) => uri)
                                }
                            />
                        </View>
                    }
                    {!video ? null :
                        <VideoPlayer
                            contentContainerStyle={{height: 200}}
                            uri={video.uri}
                        />
                    }
                </View>
            </ScrollView>
        )
    }
}

export default class ExerciseDisplayQuery extends Component {
    static navigationOptions = {
        title: ({ state }) => state.params.exercise.title,
        header: ({ state: {params: {
            editable,
            follow,
            following
        }}, setParams }) => ({
            visible: true,
            tintColor: 'white',
            backTitle: null,
            style: {
                backgroundColor: colors.main
            },
            titleStyle: {
                color: "white"
            },
            right: (
                <TouchableOpacity
                    style={{marginRight: 12}}
                    onPress={() => {
                        if (!editable) {
                            follow()
                        }
                    }}>
                    <Icon
                        name={`ios-${editable ? 'more' : 'add'}`}
                        size={30}
                        color={'white'}
                    />
                </TouchableOpacity>
            )
        })
    }

    render() {
        const {
            navigation: {
                state: {
                    params: {
                        query
                    }
                }
            }
        } = this.props

        if (query) {
            const ExerciseDisplayWithData = compose(
                AddToUserExerciseConnectionMutationGraphql,
                graphql(getExerciseQuery(query.id))
            )(ExerciseDisplay)

            return (
                <ExerciseDisplayWithData {...this.props} />
            )
        }

        const ExerciseDisplayWithData = compose(
            AddToUserExerciseConnectionMutationGraphql
        )(ExerciseDisplay)

        return (
            <ExerciseDisplayWithData {...this.props} />
        )
    }
}

const styles = StyleSheet.create({
    flex: {flex: 1},
    firstImage: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    italic: {
        color: red,
        fontStyle: 'italic',
        fontSize: 28,
    },
    text: {
        color: '#777',
        fontSize: 10,
        margin: 6,
        letterSpacing: 1.5,
    },
    description: {paddingTop: 8, fontSize: 12, color: red},
    descriptionContainer: {
        padding: 16,
        marginLeft: 12,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    teamTagText: {fontSize: 18, color: red},
    title: {fontSize: 12, letterSpacing: 1, color: '#777'},
    teamTagContainer: {
        marginLeft: 12,
        marginRight: 12,
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:  '#ccc',
    },
    setView: {
        margin: 4,
        padding: 8,
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    repView: {
        margin: 4,
        padding: 8,
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    repSetsContainer: {
        flexDirection: 'row',
        margin: 6,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 49,
    },
    scrollContainer: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        height: 49,
        backgroundColor: red,
    },
    buttonText: {
        color: 'white'
    },
})
