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

const items = [
    {
        title: 'Subjective',
        description: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip `,
    },
    {
        title: 'Objective',
        description: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostp',
    },
    {
        title: 'Analysis',
        description: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostp',
    },
    {
        title: 'Prescriptive',
        description: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostp',
    },
    {
        title: 'Objective',
        description: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostp',
    },
    {
        title: 'Analysis',
        description: 'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostp',
    },
]

export default class SoapList extends Component {
    static navigationOptions = {
        header: ({ state }) => ({
            title: 'STANLEY, Ty',
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
            <ScrollView style={styles.container}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: '#444',
                    textAlign: 'center',
                    marginTop: 16,
                    marginBottom: 8,
                }}>June 02 2017</Text>
                {items.map(({
                    title,
                    description
                }, key) => (
                    <View key={key}
                        style={styles.shadowView}
                     >
                        <Text style={[
                            styles.textTitle, {
                                marginBottom: 4,
                            }
                        ]}
                            >{title}</Text>
                        <Text style={[
                            styles.textDescription, {
                                lineHeight: 18,
                            }
                        ]}>{description}</Text>
                     </View>
                ))}
                <View style={[styles.shadowView, {
                    paddingBottom: 50,
                    marginBottom: 40,
                }]}>
                    <Text style={styles.textTitle}>Perscription</Text>
                    {
                        [
                            {
                                strong: 'Basic Leg Flexibility',
                                normal: '3X WEEKLY',
                            },
                            {
                                strong: 'Ankle Rotations',
                                normal: 'DAILY',
                            },
                            {
                                strong: 'Calf Extensions',
                                normal: 'DAILY',
                            },
                        ].map(({strong, normal}, key) => (
                            <View key={key}>
                                {(Number(key) !== 0)
                                    && <View style={styles.seperator}/>}
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 8,
                                }}>
                                    <View>
                                        <Text style={styles.textStrong}>{
                                            strong
                                        }</Text>
                                        <Text style={styles.text}>{
                                            normal
                                        }</Text>
                                    </View>
                                    <Icon
                                        name="ios-arrow-forward"
                                        size={32}
                                        color={colors.main}
                                    />
                                </View>
                            </View>
                        ))
                    }
                    <TouchableHighlight
                        underlayColor={'white'}
                        onPress={() => {
                            this.props.navigation
                            .navigate('PatientRecordsComponent')
                        }}
                        style={{
                            position: 'absolute',
                            bottom: -22,
                            left: 0,
                            right: 0,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: colors.main,
                        height: 52,
                        borderRadius: 26,
                        margin: 32,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: colors.main,
                            fontSize: 17,
                            top: -1,
                            fontWeight: '300',
                        }}>Send Notes To Client</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
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
        color: colors.main,
    },
})
