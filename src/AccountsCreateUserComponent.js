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
        email: 'nicholastancredi@gmail.com',
        password: 'Betbetbet2'
    }

    handleRef = key => ref => {
        this[key] = ref
    }

    handleChangeText = key => text => {
        this.text[key] = text
    }

    handleCreateUser = () => {
        if (!this.text.email) {
            return alerts.noEmail(() => {
                this.email.focus()
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
                .then(({data: {createUser: {id}}}) => {
                    this.handleLogin()
                })
                .catch(err => {
                    this.handleCreateUserErrors(err)
                })
            )
        )
    }

    handleCreateUserErrors = ({message}) => {
        const emailNotUnique = message
            .search("Field 'email' must be unique") !== -1

        if (emailNotUnique) {
            return alerts.emailNotUnique(() => this
                .setState({editable: true}, () => this.email.focus())
            )
        } else {
            console.error(message)
        }
    }

    handleLogin = () => {
        if (!this.text.email) {
            return alerts.noEmail(() => {
                this.email.focus()
            })
        }

        if (!this.text.password) {
            return alerts.noPassword(() => {
                this.password.focus()
            })
        }

        this.props.signinUser({email: this.text})
        .then(({data: {signinUser}}) => {
            this.props.handleSigninUser(signinUser)
        })
        .catch(err => {
            this.handleLoginUserErrors(err)
        })
    }

    handleLoginUserErrors = ({message}) => {
        const invalidPassword = message
            .search("Invalid password.") !== -1

        const invalidEmail = message
            .search("Could not find a user with that email") !== -1

        if (invalidPassword) {
            return alerts.invalidPassword(() => this
                .setState({editable: true}, () => this.password.focus())
            )
        }

        if (invalidEmail) {
            return alerts.invalidEmail(() => this
                .setState({editable: true}, () => this.email.focus())
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
                    placeholder={'email'}
                    ref={this.handleRef('email')}
                    onChangeText={this.handleChangeText('email')}
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
                    onPress={() => {
                        this[this.state.buttonOnPress]()
                    }}

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


const SigninUserMutation =  gql `
    mutation SigninUser($email: AUTH_PROVIDER_EMAIL) {
        signinUser(email: $email) {
            token
            user {
                id
                username
                avatar {
                    uri
                }
            }
        }
    }
`

const CreateUserMutation =  gql `
    mutation CreateUserMutation(
        $authProvider: AuthProviderSignupData!
    ) {
        createUser(authProvider: $authProvider) {
            id
        }
    }
`

export const CreateUserGraphql = graphql(CreateUserMutation, {
    props: ({mutate}) => ({
        createUser: ({
            email,
            password
        }) => mutate({
            variables: {
                authProvider: {
                    email: {
                        email,
                        password
                    }
                }
            },
        }),
    }),
})

export const SigninUserGraphql = graphql(SigninUserMutation, {
    props: ({mutate}) => ({
        signinUser: ({
            email,
            password,
        }) => mutate({
            variables: {
                email,
                password,
            },
        }),
    }),
})

export default compose(
    CreateUserGraphql,
    SigninUserGraphql
)(AccountsCreateUserComponent)
