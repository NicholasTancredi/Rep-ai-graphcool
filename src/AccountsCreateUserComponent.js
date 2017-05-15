import React, { Component } from 'react'
import {
    TextInput,
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Image,
    StatusBar
} from 'react-native'
import { gql, graphql, compose } from 'react-apollo'
import styles from './styles'
import alerts from './alerts'

class AccountsCreateUserComponent extends Component {
    state = {
        editable: true,
        buttonTitle: "Sign Up",
        buttonSwapTitle: "Already have an account?",
        buttonOnPress: "handleCreateUser"
    }

    text = {
        username: '',
        password: ''
    }

    handleRef = key => ref => {
        this[key] = ref
    }

    handleChangeText = key => text => {
        this.text[key] = text
    }

    handleCreateUser = () => {
        if (!this.text.username) {
            return alerts.noUsername(() => {
                this.username.focus()
            })
        }

        if (!this.text.password) {
            return alerts.noPassword(() => {
                this.password.focus()
            })
        }

        this.setState({editable: false},
            () => (
                this.props.createUser(this.text)
                .then(({data: {createUser: {token}}}) => {
                    this.props.setToken(token)
                })
                .catch(err => {
                    this.handleCreateUserErrors(err)
                })
            )
        )
    }

    handleCreateUserErrors = ({message}) => {
        const usernameNotUnique = message
            .search("Field 'username' must be unique") !== -1

        if (usernameNotUnique) {
            return alerts.usernameNotUnique(() => this
                .setState({editable: true}, () => this.username.focus())
            )
        } else {
            console.error(message)
        }
    }

    handleLogin = () => {
        if (!this.text.username) {
            return alerts.noUsername(() => {
                this.username.focus()
            })
        }

        if (!this.text.password) {
            return alerts.noPassword(() => {
                this.password.focus()
            })
        }

        this.props.loginUser(this.text)
        .then(({data: {loginUser: {token}}}) => {
            this.props.setToken(token)
        })
        .catch(err => {
            this.handleLoginUserErrors(err)
        })
    }

    handleLoginUserErrors = ({message}) => {
        const invalidPassword = message
            .search("Invalid password.") !== -1

        const invalidUsername = message
            .search("Could not find a user with that username") !== -1

        if (invalidPassword) {
            return alerts.invalidPassword(() => this
                .setState({editable: true}, () => this.password.focus())
            )
        }

        if (invalidUsername) {
            return alerts.invalidUsername(() => this
                .setState({editable: true}, () => this.username.focus())
            )
        }

        return console.log(message)
    }

    handleButtonSwap = () => {
        if (this.state.buttonTitle !== "Login") {
            this.setState({
                buttonTitle: "Login",
                buttonSwapTitle: "Need an account?",
                buttonOnPress: "handleLogin"
            })
        } else {
            this.setState({
                buttonTitle: "Sign Up",
                buttonSwapTitle: "Already have an account?",
                buttonOnPress: "handleCreateUser"
            })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.container}>
                <StatusBar hidden={true} />
                <Image
                    style={styles.logoImage}
                    resizeMode={'contain'}
                    source={require('./images/logo-white.png')}
                />
                <TextInput
                    style={styles.textInput}
                    selectTextOnFocus={true}
                    editable={this.state.editable}
                    placeholder={'username'}
                    ref={this.handleRef('username')}
                    onChangeText={this.handleChangeText('username')}
                />
                <TextInput
                    style={styles.textInput}
                    selectTextOnFocus={true}
                    editable={this.state.editable}
                    secureTextEntry={true}
                    placeholder={'password'}
                    ref={this.handleRef('password')}
                    onChangeText={this.handleChangeText('password')}
                />
                <Button
                    title={this.state.buttonTitle}
                    onPress={() => this[this.state.buttonOnPress]()}
                />
                <Button
                    title={this.state.buttonSwapTitle}
                    onPress={() => this.handleButtonSwap()}
                />
                {this.state.editable ? null : (
                    <ActivityIndicator
                        style={styles.ActivityIndicator}
                        size="large"
                    />
                )}
            </KeyboardAvoidingView>
        )
    }
}

const LoginUserMutation =  gql `
    mutation LoginUserMutation($data: LoginUserInput!) {
        loginUser(input: $data) {
            token
        }
    }
`

const CreateUserMutation =  gql `
    mutation CreateUserMutation($data: CreateUserInput!) {
        createUser(input: $data) {
            token
        }
    }
`

export default compose(
    graphql(CreateUserMutation, {
        props: ({mutate}) => ({
            createUser: data => mutate({
                variables: {data},
            }),
        }),
    }),
    graphql(LoginUserMutation, {
        props: ({mutate}) => ({
            loginUser: data => mutate({
                variables: {data},
            }),
        }),
    })
)(AccountsCreateUserComponent)
