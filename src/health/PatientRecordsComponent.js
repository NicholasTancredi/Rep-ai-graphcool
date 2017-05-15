import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
import FabComponent from '../FabComponent'
import colors from '../colors'
import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

import { NavigationOptionsButtonComponent } from '../SearchComponent'

export default class SoapList extends Component {
    static navigationOptions = {
        header: ({ state }) => ({
            title: '',
            style: {
                backgroundColor: colors.main
            },
            tintColor: 'white',
            titleStyle: {
                color: 'white'
            },

            right: <NavigationOptionsButtonComponent
                onPress={() => {
                }}
            />
        })
    }

    render() {
        return (
            <View style={{flex: 1}}><ScrollView style={styles.container}>
                    {
                        [
                            'May 07',
                                'May 03',
                                    'May 01',
                                    'April 24',
                                        'April 17',
                                            'April 07',
                                            'April 02',
                                                'March 26',
                                                    'March 17',
                                                        'March 10',
                        ].map((date, key) => (
                            <View key={key}
                                style={styles.shadowView}>
                                {!key && (
                                    <View style={{
                                        marginBottom: 20,
                                    }}>
                                   <Text style={[
                                       styles.textTitle, {
                                           marginBottom: 4,
                                       }
                                   ]}
                                       >{'Subjective'}</Text>
                                   <Text style={[
                                       styles.textDescription, {
                                           lineHeight: 18,
                                       }
                                   ]}>{`Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip `}</Text>
                                   </View>
                                )}
                                    <Text style={styles.textStrong}>{
                                        `${date}, 2017`
                                    }</Text>
                            </View>
                        ))
                    }
                </ScrollView>
                <FabComponent onPress={() => {}}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    seperator: {
        height: 1, backgroundColor: '#f1f1f1',
        marginVertical: 4,
    },
    shadowView: {
        padding: 16,
        marginHorizontal: 18,
        marginVertical: 9,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.175,
        shadowRadius: 6,
        shadowOffset: {
            height: 3,
            width: 0
        }
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 11,
        color: '#777'
    },
    textDescription: {
        fontSize: 13,
        fontStyle: 'italic',
        color: '#A6A6A6',
    },
    textStrong: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#999',
        marginBottom: 2,
    },
    textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#777',
    },
})
