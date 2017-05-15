import { Alert } from 'react-native'
const alerts = {}

alerts
.noUsername = onPress => Alert.alert(
    'Blank Username',
    `Sorry, your username can't be blank.`,
    [{text: 'OK', onPress}],
    {cancelable: false}
)

alerts
.noPassword = onPress => Alert.alert(
    'Blank Password',
    `Sorry, your password can't be blank.`,
    [{text: 'OK', onPress}],
    {cancelable: false}
)

alerts
.invalidPassword = onPress => Alert.alert(
    'Invalid Password',
    `Sorry, that password isn't correct.`,
    [{text: 'OK', onPress}],
    {cancelable: false}
)

alerts
.usernameNotUnique = onPress => Alert.alert(
    'Invalid Username',
    `Sorry, this username is invalid.`,
    [{text: 'OK', onPress}],
    {cancelable: false}
)

alerts
.invalidUsername = onPress => Alert.alert(
    'Unknown Username',
    `Sorry, we couldn't find a user with that username`,
    [{text: 'OK', onPress}],
    {cancelable: false}
)

export default alerts
