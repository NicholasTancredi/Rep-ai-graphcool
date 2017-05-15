import React, { Component } from 'react';
import {
    View,
    Dimensions
} from 'react-native';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../colors'
import SingleSearchComponent from './SingleSearchComponent'
import AnimatedTabText from './AnimatedTabText'
import styles from './styles';

export default class SearchComponent extends Component {
    static navigationOptions = {
        title: 'Search',
    }

    state = {
        index: 0,
        routes: [
            { key: '1', icon: 'account', name: 'Users' },
            { key: '2', icon: 'dumbbell', name: 'Exercises' },
            { key: '3', icon: 'playlist-plus', name: 'Sessions' },
            { key: '4', icon: 'calendar-clock', name: 'Programs' },
            { key: '5', icon: 'account-multiple', name: 'Teams' }
        ]
    }

    initialLayout = {
        height: 0,
        width: Dimensions.get('window').width,
    }

    handleChangeTab = (index = 0) => this.setState({ index })

    renderIcon = ({ route, focused }) => {
        return (<View style={styles.center}>
                    <IconMaterial
                        size={26}
                        style={{ marginVertical: 5 }}
                        color={colors.main}
                        name={route.icon}
                    />
                    <AnimatedTabText
                        focused={focused}
                        title={route.name} 
                    />
                </View>)
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
            renderIcon={this.renderIcon}
            {...props}
        />
    )

    renderScene = ({ route }) => {
        switch (route.key) {
            case '1': //users
                return <SingleSearchComponent
                            type={'UsernameSearch'}
                            route={route.name}
                        />
            case '2': //exercises
                return <SingleSearchComponent
                            type={'ExerciseSearch'}
                            route={route.name}
                        />
            case '3': //sessions
                return <SingleSearchComponent
                            type={'SessionSearch'}
                            route={route.name}
                        />
            case '4': //programs
                return <SingleSearchComponent
                            type={'ProgramSearch'}
                            route={route.name}
                        />
            case '5': //teams
                return <SingleSearchComponent
                            type={'TeamSearch'}
                            route={route.name}
                        />
        }
    }


    render() {
        return (
            <View style={styles.flex}>
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
        )
    }
}
