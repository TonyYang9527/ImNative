import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import SegmentedControlTab from '../segment'


const SCREEN_WIDTH = Dimensions.get('window').width;

class BasicHeaderView extends Component {
    constructor() {
        super()
        this.state = { selectedIndex: 0, };
    }
    handleIndexChange = (index) => {
        this.setState({ ...this.state, selectedIndex: index, });
    }
    render() {
        return (
            <View style={styles.headerTitle}>
                <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.openDrawer() }}>
                        <Icon name="menu" size={30} type="material-community" />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <SegmentedControlTab values={['Chat', 'Notification']}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}
                        tabsContainerStyle={{ width: SCREEN_WIDTH - 176, height: 35 }}
                        tabStyle={{ backgroundColor: 'white', borderColor: '#0081CC' }}
                        tabTextStyle={{ fontWeight: 'normal', fontSize: 16, color: '#0081CC' }}
                        activeTabStyle={{ backgroundColor: '#0081CC' }}
                        activeTabTextStyle={{ color: 'white' }} />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.openDrawer() }}>
                        <Icon name="dots-horizontal" size={30} type="material-community" />
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}
export default BasicHeaderView;


const styles = StyleSheet.create({
    headerTitle: {
        height: 60,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'auto'
    },
    titleCenter: {
        height: 60,
        width: SCREEN_WIDTH,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleRitht: {
        height: 60,
        width: SCREEN_WIDTH,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 8,
    },
    titleLeft: {
        height: 60,
        width: SCREEN_WIDTH,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 8,
    },
});