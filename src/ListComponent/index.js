import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { gql, graphql } from 'react-apollo'
import styles from '../styles'
import ActivityIndicatorComponent from '../ActivityIndicatorComponent'
export class ExerciseListItemComponent extends Component {
    render() {
        const {
            height,
            title,
            reps,
            sets,
            onPress,
        } = this.props

        return (
            <TouchableOpacity
                style={[styles.listItem, {height}]}
                onPress={onPress}>
                <View style={styles.flex}>
                    {
                        typeof title !== 'string' ? null : (
                            <Text style={styles.textStrong}>
                                {title.toUpperCase()}
                            </Text>
                        )
                    }
                    <View style={styles.flexStartRow}>
                        {
                            !sets ? null : (
                                <View style={styles.flexDirectionRow}>
                                    <Text style={styles.textNumbers}>
                                        {sets}
                                    </Text>
                                    <Text style={styles.textSmall}>
                                        SETS
                                    </Text>
                                </View>
                            )
                        }
                        {
                            (!sets && !reps) ? null : (
                                <Text style={[
                                    styles.textSmall,
                                    styles.colorGrey
                                ]}>
                                ×
                                </Text>
                            )
                        }
                        {
                            !reps ? null : (
                                <View style={styles.flexDirectionRow}>
                                    <Text style={styles.textNumbers}>
                                        {reps}
                                    </Text>
                                    <Text style={styles.textSmall}>
                                        REPS
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export const SessionListItemComponent = ({
    height,
    title,
    onPress,
}) => (
    <TouchableOpacity
        style={[styles.listItem, {height}]}
        onPress={onPress}>
        <View style={styles.flex}>
            <Text style={styles.textStrong}>
                {title.toUpperCase()}
            </Text>
        </View>
    </TouchableOpacity>
)

export const ProgramListItemComponent = ({
    height,
    title,
    onPress,
}) => (
    <TouchableOpacity
        style={[styles.listItem, {height}]}
        onPress={onPress}>
        <View style={styles.flex}>
            <Text style={styles.textStrong}>
                {title.toUpperCase()}
            </Text>
        </View>
    </TouchableOpacity>
)

class ListComponent extends Component {
    constructor(props) {
        super(props)

        const tabNavHeight = props.tabNavHeight || 113
        const flatListHeight = Dimensions.get('window').height - tabNavHeight
        this.itemHeight = this.props.itemHeight || (
            flatListHeight / props.first
        )
    }

    state = { loading: false }

    createUpdateQuery = type => (prevResults, { fetchMoreResult }) => {
        const prevEdges = prevResults.viewer[type].edges
        const fetchMoreEdges = fetchMoreResult.viewer[type].edges
        const edges = prevEdges.concat(fetchMoreEdges)
        const viewer = {[type]: {edges}}
        return {...prevResults, viewer}
    }

    handleEndReached = () => {
        const {
            type,
            fetchMoreQuery,
            first,
            data: {
                loading,
                fetchMore,
                viewer,
            }
        } = this.props

        if (loading || !viewer) {
            return null
        }

        const {edges} = viewer[type]
        const after = edges.concat().pop().cursor

        return fetchMore({
            query: fetchMoreQuery,
            variables: { first, after },
            updateQuery: (prevResults, { fetchMoreResult }) => {
                return fetchMoreResult
            },
        })
    }

    handleGetData = () => {
        const {
            type,
            data: {
                viewer
            },
        } = this.props

        if (!viewer) {
            return []
        }

        return viewer[type].edges.map(
            ({node}, key) => ({
                ...node,
                key
            })
        )
    }

    renderItemSeparatorComponent = () => (
        this.props.renderItemSeparatorComponent ?
            this.props.renderItemSeparatorComponent() : (
            <View style={styles.itemSeparatorComponent} />
        )
    )

    renderItem = ({item}) => (
        <View style={[{
            height: this.itemHeight,
            backgroundColor: 'white',
        }, this.props.itemContainerStyle]}>
            {this.props.renderItem ? this.props.renderItem({
                ...item,
                refetch: () => {
                    this.setState({loading: true}, () => {
                        this.props.data.refetch()
                        .then(() => {
                            this.setState({loading: false})
                        })
                        .catch(e => console.error('refetch: ', e))
                    })
                },
                height: this.itemHeight,
            }) : (
                <Text>{item.id}</Text>
            )}
        </View>
    )

    getItemLayout = (_, index) => ({
        length: this.itemHeight,
        offset: this.itemHeight * index,
        index
    })

    render() {
        const {
            data: {
                loading,
                refetch
            },
            ItemSeparatorComponent
        } = this.props

        return (
            <FlatList
                style={[styles.flex, { backgroundColor: 'white' }]}
                ItemSeparatorComponent={ItemSeparatorComponent}
                refreshing={loading || this.state.loading}
                onRefresh={refetch}
                onEndReached={this.handleEndReached}
                data={this.handleGetData()}
                renderItem={this.renderItem}
                onEndReachedThreshold={this.itemHeight}
                getItemLayout={this.getItemLayout}
            />
        )
    }
}

export class ListComponentWithData extends Component {
    render() {
        const {
            query,
            type,
            first,
            fetchMoreQuery,
            renderItem,
            itemHeight
        } = this.props

        const ListWithData = graphql(query)(ListComponent)

        return <ListWithData
            renderItem={renderItem}
            type={type}
            first={first}
            itemHeight={itemHeight}
            fetchMoreQuery={fetchMoreQuery}
        />
    }
}

export default class ListComponentWithQueries extends Component {
    state = {}

    handleLayout = ({nativeEvent: {layout: {height}}}) => {
        this.setState({
            first: Math.ceil(
                height / (this.props.itemHeight || 44)
            ) + 1
        })
    }

    render() {
        const {
            type,
            renderItem,
            itemHeight,
            fragmentName,
            NodeFragment
        } = this.props

        if (!this.state.first) {
            return (
                <View style={[styles.container, {
                    backgroundColor: 'white'
                }]}>
                    <ActivityIndicatorComponent onLayout={this.handleLayout} />
                </View>
            )
        }

        const {
            first
        } = this.state

        const where = this.props.where || '{}'

        this.query = gql `
            query {
                allUsers {
                    id
                }
            }
        `

        this.fetchMoreQuery = gql `
            query FetchMoreQuery($username: String) {
                allUsers(filter: {
                    username: $username
                }) {
                    id
                }
            }
        `

        return <ListComponentWithData
            type={type}
            fragmentName={fragmentName}
            itemHeight={itemHeight}
            renderItem={renderItem}
            first={first}
            query={this.query}
            fetchMoreQuery={this.fetchMoreQuery}
        />
    }
}
