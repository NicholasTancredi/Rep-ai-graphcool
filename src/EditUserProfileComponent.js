import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView
} from 'react-native'
import { gql, graphql } from 'react-apollo'
import Icon from 'react-native-vector-icons/Ionicons'
import CameraComponent from './CameraComponent'
import colors from './colors'

import {handleUploadToAWS} from './aws-s3'

class EditUserProfileComponent extends Component {
    static navigationOptions = {
        header: {
            style: {
                backgroundColor: colors.main
            },
            tintColor: 'white',
            titleStyle: {
                color: "white"
            }
        },
        tabBar: {
            label: 'Profile',
            icon: ({ tintColor }) => (
                <Icon
                    name="ios-home"
                    size={30}
                    color={tintColor}
                />
            ),
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            avatarUri: this.props.navigation.state.params.user.avatarUri,
        }
        this.capturedProps = {}
        this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
        const {
            user,
            onChangeUser
        } = this.props.navigation.state.params

        const updateUserProps = {
            id: user.id
        }

        if (this.username) {
            updateUserProps.username = this.username
        }

        if (this.email) {
            updateUserProps.email = this.email
        }

        if (this.state.avatarUri !== user.avatarUri) {
            updateUserProps.avatarUri = this.state.avatarUri
        }

        this.props.updateUser(updateUserProps)
        .then(({data: {updateUser: {changedUser}}}) => {
            AsyncStorage.setItem('user', JSON.stringify({
                ...changedUser,
                id: user.id
            })).then(() => {
                onChangeUser({...user, ...changedUser})
                this.props.navigation.goBack()
            })
            .catch(console.error)
        })
        .catch(console.error)

        if (this.capturedProps.path) {
            handleUploadToAWS({
                path: this.capturedProps.path,
                handleProgress: (progress) => {
                    console.log("avatar Progress", progress)
                },
                handleResult: (uri) => {
                    this.props.updateUser({
                        id: user.id,
                        avatarUri: uri,
                    })
                    .then(({data: {updateUser: {changedUser}}}) => {
                        AsyncStorage.setItem('user', JSON.stringify({
                            ...changedUser,
                            id: user.id
                        })).then(() => {
                            onChangeUser({...user, ...changedUser})
                        })
                        .catch(console.error)
                    })
                    .catch(console.error)
                }
            })
        }
    }

    render() {
        const {
            user
        } = this.props.navigation.state.params

        if (this.state.showCamera) {
            return <View style={{flex: 1}}>
                <CameraComponent
                    captureQuality="photo"
                    type="front"
                    handlePhoto={(capturedProps) => {
                        this.capturedProps = capturedProps
                        this.setState({
                            avatarUri: capturedProps.path,
                            showCamera: false,
                        })
                    }}
                />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                        onPress={() => {
                            this.setState({showCamera: false})
                        }}>
                            <Icon
                                name="ios-close-circle"
                                size={32}
                                color={'white'}
                                style={{
                                    paddingTop: 12,
                                    paddingLeft: 24,
                                    backgroundColor: 'rgba(0,0,0,0)'
                                }}
                            />
                    </TouchableOpacity>
            </View>
        }

        return (
            <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View style={styles.profileImageContainer}>
                    {this.state.avatarUri ?
                        <Image
                            source={{uri:
                                this.capturedProps.path ||
                                this.state.avatarUri}}
                            style={styles.Image}
                        />
                    :
                        <View style={styles.ImagePlaceholder}>
                            <Icon
                                size={48}
                                color="#777"
                                name="ios-person"
                            />
                        </View>
                    }
                </View>
                <Button
                    title="Edit Image"
                    onPress={() => {
                        this.setState({showCamera: true})
                    }}
                />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        USERNAME
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(username) => {
                            this.username = username
                        }}
                        placeholder="username"
                        defaultValue={user.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        EMAIL
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        onChangeText={(email) => {
                            this.email = email
                        }}
                        defaultValue={user.email}
                    />
                </View>
                <Button
                    title="Save Changes"
                    style={{
                        marginTop: 24,
                    }}
                    onPress={this.handleSave}
                />
            </KeyboardAvoidingView>
        )
    }
}

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
    Image: {
        width: 96,
        height: 96,
        borderRadius: 96 / 2,
        marginRight: 21,
        marginLeft: 1,
    },
})

const UpdateUserMutation =  gql `
    mutation UpdateUserMutation($data: UpdateUserInput!) {
        updateUser(input: $data) {
            changedUser {
                username
                email
                avatarUri
            }
        }
    }
`

export default graphql(UpdateUserMutation, {
    props: ({mutate}) => ({
        updateUser: data => mutate({
            variables: {data},
        }),
    }),
})(EditUserProfileComponent)
