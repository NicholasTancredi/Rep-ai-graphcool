
/* 
ProfileContent component for training portal, generates the tabbar
    that will hold all exercises, sessions, programs
    - used within the USerTrainingPortalComponent
*/

import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Text
} from 'react-native';

import styles from './styles';
import colors from '../colors';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import TabViewComponent from '../TabViewComponent'

class ProfileContent extends Component {
    state = {
        index: 0,
        routes: [
            { key: '1', title: 'Exercises' },
            { key: '2', title: 'Sessions' },
            { key: '3', title: 'Programs' }
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
            case '1':   //exercises gql content
                return  <TabViewComponent 
                            fab
                            content={[
                                {
                                    section: { 
                                        title: 'Vegan Craft Beer', 
                                        description: "Kombucha messenger bag live-edge fashion axe unicorn kitsch before they sold out, vexillologist pour-over four loko chia tofu hella ethical. Artisan butcher deep v raclette crucifix YOLO twee pug. Gastropub bicycle rights pinterest farm-to-table. Viral lumbersexual man bun tilde next level."
                                    }
                                },
                                {
                                    section: {
                                        title: 'Kombucha Messenger Bag',
                                        description: "Tattooed yuccie pour-over jean shorts. Meditation letterpress pinterest wayfarers normcore. Synth food truck master cleanse, actually pinterest venmo neutra hoodie live-edge chicharrones shoreditch."
                                    }
                                }  
                            ]}
                            type={'content'}
                        />
            case '2':   //sessions gql content
                return  <TabViewComponent 
                            fab
                            content={[
                                {
                                    section: { 
                                        title: 'Vegan Craft Beer', 
                                        description: "Kombucha messenger bag live-edge fashion axe unicorn kitsch before they sold out, vexillologist pour-over four loko chia tofu hella ethical. Artisan butcher deep v raclette crucifix YOLO twee pug. Gastropub bicycle rights pinterest farm-to-table. Viral lumbersexual man bun tilde next level."
                                    }
                                },
                                {
                                    section: {
                                        title: 'Kombucha Messenger Bag',
                                        description: "Tattooed yuccie pour-over jean shorts. Meditation letterpress pinterest wayfarers normcore. Synth food truck master cleanse, actually pinterest venmo neutra hoodie live-edge chicharrones shoreditch."
                                    }
                                }  
                            ]}
                            type={'content'}
                        />
            case '3':   //programs gql content
                return  <TabViewComponent 
                            fab
                            content={[
                                {
                                    section: { 
                                        title: 'Vegan Craft Beer', 
                                        description: "Kombucha messenger bag live-edge fashion axe unicorn kitsch before they sold out, vexillologist pour-over four loko chia tofu hella ethical. Artisan butcher deep v raclette crucifix YOLO twee pug. Gastropub bicycle rights pinterest farm-to-table. Viral lumbersexual man bun tilde next level."
                                    }
                                },
                                {
                                    section: {
                                        title: 'Kombucha Messenger Bag',
                                        description: "Tattooed yuccie pour-over jean shorts. Meditation letterpress pinterest wayfarers normcore. Synth food truck master cleanse, actually pinterest venmo neutra hoodie live-edge chicharrones shoreditch."
                                    }
                                }  
                            ]}
                            type={'content'}
                        />
            default:
                return <Text>problem</Text>
                //perhaps error screen???!?!
        }
    }

    render() {
        return (
            <View style={styles.flex}>
                <TabViewAnimated 
                    lazy={false}
                    style={styles.flex}
                    initalLayout={this.initialLayout}
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    renderHeader={this.renderHeader}
                    onRequestChangeTab={this.handleChangeTab}
                />
            </View>
        )
    }
}

export default ProfileContent
