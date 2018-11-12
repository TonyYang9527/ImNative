import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import SegmentedControlTab from './segment'
import Color from '../components/basic/Color'

const SCREEN_WIDTH = Dimensions.get('window').width;

class SegmentedControlView extends Component {
    constructor() {
        super()
        this.state = { selectedIndex: 0, };
    }

    handleSingleIndexSelect = (index: number) => {
        this.setState(prevState => ({ ...prevState, selectedIndex: index }))
    }

    render() {
        const { selectedIndex } = this.state
        return (
            <View style={styles.headerTitle}>
                <View>
                    <SegmentedControlTab values={['Chat', 'Notification']}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleSingleIndexSelect}
                        tabsContainerStyle={{ width: SCREEN_WIDTH - 176, height: 35 }}
                        tabStyle={{ backgroundColor: Color.themeColor, borderColor: Color.whiteColor }}
                        tabTextStyle={{ fontWeight: 'normal', fontSize: 16, color: Color.whiteColor }}
                        activeTabStyle={{ backgroundColor: Color.whiteColor, borderColor: Color.whiteColor }}
                        activeTabTextStyle={{ color: Color.themeColor }} />
                </View>
            </View>
        )

    }
}
export default SegmentedControlView;


const styles = StyleSheet.create({
    headerTitle: {
        paddingTop: 0,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});