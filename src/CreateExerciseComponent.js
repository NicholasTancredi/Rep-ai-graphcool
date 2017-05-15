import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Button,
    Alert,
    Image,
    AsyncStorage,
    KeyboardAvoidingView,
    Dimensions,
    StatusBar,
    Platform
} from 'react-native'
import { gql, graphql, compose } from 'react-apollo'
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import VideoPlayer from './VideoPlayer'

import { handleUploadToAWS } from './aws-s3'

import CameraComponent from './CameraComponent'

export class ExerciseCameraComponent extends Component {
    static navigationOptions = {
        header: {
            style: {
                position: 'absolute',
                height: 0,
            },
        },
    }

    componentDidMount() {
        this.props.navigation.state.params.tabBarHide()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    hidden={true}
                    animated={true}
                    showHideTransition={'slide'}
                />

                <CameraComponent
                    handlePhoto={(capturedPhoto) => {
                        this.props.navigation.state.params.tabBarShow()
                        this.props.navigation
                        .navigate(
                            'CreateExerciseComponent', {
                                capturedPhoto,
                                props: this.props
                            }
                        )
                    }}
                    handleVideo={(capturedVideo) => {
                        this.props.navigation.state.params.tabBarShow()
                        this.props.navigation
                        .navigate(
                            'CreateExerciseComponent', {
                                capturedVideo,
                                props: this.props
                            }
                        )
                    }}
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    onPress={() => {
                        this.props.navigation.state.params.tabBarShow()
                        this.props.navigation.state.params.tabBarSetState({
                            active: 'Profile',
                        })
                    }}>
                        <Icon
                            name="ios-arrow-back"
                            size={38}
                            color={'white'}
                            style={{
                                paddingTop: 12,
                                paddingLeft: 24,
                                backgroundColor: 'rgba(0,0,0,0)'
                            }}
                        />
                </TouchableOpacity>
            </View>
        )
    }
}

export class VideoPlayerComponent extends Component {
    static navigationOptions = {
        header: {
            style: {
                backgroundColor: 'rgba(0,0,0,0)',
                top: 0,
                left: 0,
                right: 0,
            },
            tintColor: 'white',
        },
    }

    render() {
        const {
            capturedVideo,
        } = this.props.navigation.state.params

        const _props = {...this.props.navigation.state.params}

        if (capturedVideo && capturedVideo.path) {
            _props.uri = capturedVideo.path
        }

        return (
            <View style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                top: -114 + 49,
            }}>
                <VideoPlayer
                    navigate={this.props.navigation.navigate}
                    {..._props}
                />
            </View>
        )
    }
}

export class FullImageComponent extends Component {
    static navigationOptions = {
        header: {
            style: {
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0)',
                top: 0,
                left: 0,
                right: 0,
            },
            tintColor: 'white',
        }
    }

    render() {
        const {
            uri
        } = this.props.navigation.state.params

        return (
            <TouchableOpacity style={{
                flex: 1,
            }} onPress={() => {
                this.props.navigation.goBack()
            }}>
                <StatusBar
                    hidden={true}
                    animated={true}
                    showHideTransition={'slide'}
                />
                <Image
                    source={{uri}}
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }}
                />
            </TouchableOpacity>
        )
    }
}

export class CreateExerciseComponent extends Component {
    state = {
        descriptionHeight: 44,
    }

    exercise = {}

    handleAddToUserExerciseConnection = (userId, exerciseId) => {
        const {
            addToUserExerciseConnection,
            createImage,
            createVideo,
            addToExerciseImageConnection,
            navigation: {
                state: {
                    params: {
                        capturedVideo,
                        capturedPhoto
                    }
                }
            }
        } = this.props

        addToUserExerciseConnection({
            userId,
            exerciseId,
        })
        .then(() => {
            if (capturedPhoto) {
                handleUploadToAWS({
                    path: capturedPhoto.path,
                    handleProgress: progress => {
                        console.log('Image Progress', progress)
                    },
                    handleResult: (uri) => {
                        console.log('CREATED IMAGE URI', uri)
                        const imageData = {
                            uri: String(uri),
                            creatorId: userId,
                        }
                        if (capturedPhoto.width) {
                            imageData.width = Number(capturedPhoto.width)
                        }
                        if (capturedPhoto.height) {
                            imageData.height = Number(capturedPhoto.height)
                        }

                        createImage(imageData)
                        .then(({data: {createImage: {changedImage: {id}}}}) => {
                            addToExerciseImageConnection({
                                imageId: id,
                                exerciseId
                            })
                            .then((...args) => {
                                console.log('Image Upload Complete', args)
                            })
                            .catch(err => console
                                .error('addToExerciseImageConnection: ', err))
                        })
                        .catch(err => console.error('createImage: ', err))
                    }
                })
            }

            if (capturedVideo) {
                handleUploadToAWS({
                    path: capturedVideo.path,
                    handleProgress: (progress) => {
                        console.log('Video Progress', progress)
                    },
                    handleResult: uri => {
                        createVideo({uri})
                        .then((...args) => {
                            console.log('Video Upload Complete', args)
                        })
                        .catch(e => console.error('createVideo: ', e))
                    }
                })
            }
        })
        .catch(e => console.error('addToUserExerciseConnection: ', e))
    }

    handleCreateExercise = () => {
        if (!this.exercise.title) {
            return Alert
            .alert(
                'Blank Title',
                `Sorry, you must enter a title.`,
                [{text: 'OK', onPress: () => {
                    this.titleRef.focus()
                }}],
                {cancelable: false}
            )
        }

        // TODO: Refactor
        const exercise = {
            title: this.exercise.title,
        }

        if (this.exercise.reps) {
            exercise.reps = this.exercise.reps
        }

        if (this.exercise.sets) {
            exercise.sets = this.exercise.sets
        }

        if (this.exercise.description) {
            exercise.description = this.exercise.description
        }

        AsyncStorage.getItem('userId')
        .then((userId) => {
            exercise.creatorId = userId
            this.props.createExercise(exercise)
            .then(({data: {createExercise: {changedExercise: {id}}}}) => {
                // AsyncStorage.setItem('shouldRefreshUser', 'true')
                // .catch(console.error)
                this.handleAddToUserExerciseConnection(userId, id)
            })
            .catch(err => console.error('createExercise Error: ', err))
        })
        .catch(console.error)
        const params = this.props.navigation.state.params
        const {
            capturedVideo,
            capturedPhoto
        } = this.props.navigation.state.params
        params.exercise = this.exercise
        params.exercise.images = {
            edges: capturedPhoto ? [{
                node: {uri: capturedPhoto.path}
            }] : []
        }
        params.exercise.video = capturedVideo ? {
            uri: capturedVideo.path
        } : null

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
                routeName: 'ExerciseDisplay',
                params,
            })
          ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {
        const {
            capturedVideo,
            capturedPhoto
        } = this.props.navigation.state.params

        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <StatusBar
                    hidden={false}
                    animated={true}
                    showHideTransition={'slide'}
                />
            <ScrollView style={{flex: 1}}>
                {!capturedVideo ? null : (
                    <Button
                        title="Video Preview"
                        onPress={() => {
                            this.props.navigation
                            .navigate(
                                'VideoPlayerComponent', {
                                    capturedVideo
                                }
                            )
                        }}
                    />
                )}
                {!capturedPhoto ? null : (
                    <TouchableOpacity
                        style={{
                            width: Dimensions.get('window').width,
                            height: 150,
                        }}
                        onPress={() => {
                            this.props.navigation
                            .navigate(
                                'FullImageComponent', {
                                    uri: capturedPhoto.path
                                }
                            )
                        }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Image
                            style={{
                                position: 'absolute',
                                height: 150,
                                backgroundColor: 'black',
                                marginBottom: 12,
                                width: Dimensions.get('window').width,
                            }}
                            source={{uri: capturedPhoto.path}}
                            width={Dimensions.get('window').width}
                            height={150}
                        />
                    </View>
                    </TouchableOpacity>
                )}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        {String('title').toUpperCase()}
                    </Text>
                    <TextInput
                        ref={r => {
                            this.titleRef = r
                        }}
                        style={styles.input}
                        onChangeText={(text) => {
                            this.exercise.title = text
                        }}
                        placeholder="title"
                        defaultValue={this.props.title}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        {String('Description').toUpperCase()}
                    </Text>
                    <TextInput
                        style={[styles.input, {
                            height: this.state.descriptionHeight,
                        }]}
                        onFocus={() => {
                            this.setState({
                                descriptionHeight: 150,
                            })
                        }}
                        onBlur={() => {
                            this.setState({
                                descriptionHeight: 44,
                            })
                        }}
                        multiline={true}
                        onChangeText={(text) => {
                            this.exercise.description = text
                        }}
                        placeholder="Description"
                        defaultValue={this.props.description}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        {String('reps').toUpperCase()}
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            this.exercise.reps = Number(text)
                        }}
                        placeholder="24"
                        keyboardType="numeric"
                        defaultValue={this.props.reps}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        {String('sets').toUpperCase()}
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => {
                            this.exercise.sets = Number(text)
                        }}
                        placeholder="12"
                        keyboardType="numeric"
                        defaultValue={this.props.sets}
                    />
                </View>
                <Button
                    title="Save Exercise"
                    onPress={() => {
                        this.handleCreateExercise()
                    }}
                />
                <View style={{
                    height: 200,
                }}/>
            </ScrollView>
        </KeyboardAvoidingView>
        )
    }
}

const CreateExerciseMutation =  gql `
    mutation CreateExerciseMutation($data: CreateExerciseInput!) {
      createExercise(input: $data) {
        changedExercise {
          id
        }
      }
    }
`

const AddToExerciseImageConnectionMutation = gql `
    mutation AddToExerciseImageConnectionMutation(
        $data: AddToExerciseImageConnectionInput!
    ) {
        addToExerciseImageConnection(input: $data) {
            changedExerciseImage {
                createdAt
            }
        }
    }
`

export const CreateSessionMutation =  gql `
    mutation CreateSessionMutation($data: CreateSessionInput!) {
        createSession(input: $data) {
            changedSession {
                id
            }
        }
    }
`

export const CreateSessionMutationGraphql = graphql(CreateSessionMutation, {
    props: ({mutate}) => ({
        createSession: data => mutate({variables: {data}})
    })
})

export const AddToSessionsExerciseConnectionMutation = gql `
    mutation AddToSessionsExerciseConnectionMutation(
        $data: AddToSessionsExerciseConnectionInput!
    ) {
        addToSessionsExerciseConnection(input: $data) {
            changedSessionsExercise {
                createdAt
            }
        }
    }
`

export const AddToSessionsUsersConnectionMutation = gql `
    mutation AddToSessionsUsersConnectionMutation(
        $data: AddToSessionsUsersConnectionInput!
    ) {
        addToSessionsUsersConnection(input: $data) {
            changedSessionsUsers {
                createdAt
            }
        }
    }
`



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

const CreateImageMutation =  gql `
    mutation CreateImageMutation($data: CreateImageInput!) {
      createImage(input: $data) {
        changedImage {
          id
        }
      }
    }
`

const CreateVideoMutation =  gql `
    mutation CreateVideoMutation($data: CreateVideoInput!) {
      createVideo(input: $data) {
        changedVideo {
          id
        }
      }
    }
`

export const CreateExerciseComponentScreen = compose(
    graphql(CreateImageMutation, {
        props: ({mutate}) => ({
            createImage: data => mutate({variables: {data}})
        })
    }),
    graphql(CreateVideoMutation, {
        props: ({mutate}) => ({
            createVideo: data => mutate({variables: {data}})
        })
    }),
    graphql(CreateExerciseMutation, {
        props: ({mutate}) => ({
            createExercise: data => mutate({variables: {data}})
        })
    }),
    graphql(AddToExerciseImageConnectionMutation, {
        props: ({mutate}) => ({
            addToExerciseImageConnection: data => mutate({variables: {data}})
        })
    }),
    graphql(AddToUserExerciseConnectionMutation, {
        props: ({mutate}) => ({
            addToUserExerciseConnection: data => mutate({variables: {data}})
        })
    })
)(CreateExerciseComponent)

const styles = StyleSheet.create({
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        backgroundColor: 'white',
        height: 44,
        paddingLeft: 18,
    },

    label: {
        margin: 8,
        backgroundColor: 'rgba(0,0,0,0)',
        paddingLeft: 4,
    },

    inputContainer: {
        marginHorizontal: 12,
        marginVertical: 12,
    },

    profileImageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
    },

    ImagePlaceholder: {
        borderColor: '#777',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 96,
        height: 96,
        borderRadius: 96 / 2,
        marginRight: 21,
        marginLeft: 1,
    },
    container: {
        flex: 1,
    },
    Image: {
        width: 96,
        height: 96,
        borderRadius: 96 / 2,
        marginRight: 21,
        marginLeft: 1,
    },
})
