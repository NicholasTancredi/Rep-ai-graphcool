import React, {Component} from 'react'

import {
    ListView,
    Dimensions,
    ScrollView,
    Image,
} from 'react-native'

import ImageProgress from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Bar'

// TODO: Requires update to FlatList
export default class ImageListView extends Component {
    constructor(props) {
        super(props)

        const DataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            dataSource: DataSource.cloneWithRows(
                this.props.collection
            ),
            lastLoadedRowId: 0,
            sizes: [],
        }

        this.renderRow = this.renderRow.bind(this)
    }

    renderRow(uri, sectionId, rowId) {
        const ImageProgressStyles = {}

        if (this.props.autoSize) {
            Image.getSize(uri, (width, height) => {
                const sizes = [...this.state.sizes]
                sizes[rowId] = {width, height}
                this.setState({
                    sizes,
                })
            })

            if (this.state.sizes[rowId]) {
                const {
                    width,
                    height
                } = this.state.sizes[rowId]
                ImageProgressStyles.width = width
                ImageProgressStyles.height = height
            }
        }

        return (
            <ImageProgress
                source={{uri}}
                indicator={ProgressBar}
                resizeMode={"cover"}

                onLoad={(event) => {
                }}

                onError={(event) => {
                }}

                indicatorProps={{
                    size: 80,
                    borderWidth: 0,
                    color: 'rgba(150, 150, 150, 1)',
                    unfilledColor: 'rgba(200, 200, 200, .2)'
                }}

                style={[{
                    flex: 1,
                    height: 200,
                    backgroundColor: '#f1f1f1',
                    width: Dimensions.get('window').width,
                }, ImageProgressStyles,
                this.state.sizes[rowId] && this.state.sizes[rowId].sizes
                ]}
            />
        )
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderScrollComponent={props =>
                    <ScrollView
                        {...props}
                        pagingEnabled={true}
                    />
                }
            />
        )
    }
}
