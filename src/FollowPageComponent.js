
/* FollowPageComponent is used to generate a follower/following
    page for use within the main tab bar.
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import colors from './colors'
import { gql, graphql } from 'react-apollo'
import ActivityIndicatorComponent from './ActivityIndicatorComponent'
import { TabViewAnimated, TabBar} from 'react-native-tab-view';
import TabViewComponent from './TabViewComponent';

//query the current user and who they're following/follows them
// const GraphComponent = gql `
//     query {
//         viewer {
//             user {
//                 username
//                 avatarUri
//                 userFollowers {
//                     edges {
//                         node {
//                             id
//                             username
//                             avatarUri
//                             online
//                             email
//                         }
//                     }
//                 }
//                 followingUsers {
//                     edges {
//                         node {
//                             id
//                             username
//                             avatarUri
//                             online
//                             email
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `

class FollowPageComponent extends Component {
    static navigationOptions = {
        header: {
            style: {
                position: 'absolute',
                height: 10
            }
        }
    }

    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Followers' },
            { key: '2', title: 'Following' }
        ]
    }

    initialLayout = {
        height: 0,
        width: Dimensions.get('window').width,
    }

    handleChangeTab = (index) => {
        this.setState({ index })
    }

    renderHeader = (props) => (
        <TabBar
            labelStyle={{
                color: colors.main,
                fontSize: Dimensions.get('window')
                    .width === 320 ? 11 : 15
            }}
            style={{backgroundColor: 'white'}}
            indicatorStyle={{backgroundColor: colors.main}}
            {...props}
        />
    )

    renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return  <TabViewComponent 
                            fab={false}
                            users={[{
                                avatarUri: '',
                                username: 'john',
                                email: 'john@john.com'
                            },
                            {
                                avatarUri: '',
                                username: 'bob',
                                email: 'bob@bob.com'
                            },
                            {
                                avatarUri: '',
                                username: 'jane',
                                email: 'jane@jane.com'
                            }]}
                            type={'user'}
                        />
            case '2':
                return <TabViewComponent
                            fab={false}
                            users={[{
                                avatarUri: '',
                                username: 'bob',
                                email: 'bob@bob.com'
                            },
                            {
                                avatarUri: '',
                                username: 'john',
                                email: 'john@john.com'
                            }]}
                            type={'user'}
                        />
            default:
                return <Text>problem</Text>
                //perhaps error screen???!?!
        }
    }

    render() {
        console.log('props:', this.props)

        // if (this.props.data.loading) {
        //     return <ActivityIndicatorComponent />
        // }

        return (
            <View style={styles.flex}>
                {Platform.OS === 'ios' && <View style={styles.statusStyle}/>}
                <TabViewAnimated
                    lazy={false}
                    style={styles.flex}
                    initialLayout={this.initialLayout}
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    renderHeader={this.renderHeader}
                    onRequestChangeTab={this.handleChangeTab}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusStyle: {
        backgroundColor: colors.main,
        height: 20
    },

    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    strongText: {
        fontSize: 18,
        letterSpacing: 0.5,
        color: colors.main,
    },

    smallText: {
        fontSize: 11,
        letterSpacing: 0.5,
        color: '#777',
    },

    profileImage: {
        borderRadius: 62 / 2,
        width: 62,
        height: 62,
        marginRight: 21,
    },

    userActiveContainer: {
        position: 'absolute',
        bottom: 2,
        right: 18,
        borderWidth: 2,
        borderColor: 'white',
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.main,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imagePlaceholder: {
        backgroundColor: colors.main,
        alignItems: 'center',
        justifyContent: 'center',
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 21,
    },

    flex: {
        flex: 1
    }
});
export default FollowPageComponent;
//export default graphql(GraphComponent)(FollowersComponent)
