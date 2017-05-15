import { Alert } from 'react-native'
const alerts = {}

alerts
.noEmail = onPress => Alert.alert(
    'Blank Email',
    `Sorry, your email can't be blank.`,
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
.emailNotUnique = onPress => Alert.alert(
    'Invalid Email',
    `Sorry, this email is invalid.`,
    [{text: 'OK', onPress}],
    {cancelable: false}
)

alerts
.invalidEmail = onPress => Alert.alert(
    'Unknown Email',
    `Sorry, we couldn't find a user with that email`,
    [{text: 'OK', onPress}],
    {cancelable: false}
)

export default alerts
