import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import { gql, graphql } from 'react-apollo';

// const UserInformation = gql`
//     query {
//         User(id: $userId) {
//             username
//             email
//             avatar {
//                 uri
//             }
//         }
//     }
// `

class RenderUser extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>{this.props.data.User.username}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        height: 10,
        backgroundColor: 'red'
    }
})

// export default graphql(UserInformation, 
//     {options: 
//         { variables: 
//             { userId: this.props.id }
//         }
//     })(RenderUser)
