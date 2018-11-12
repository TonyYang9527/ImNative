import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header } from 'react-navigation';
import SegmentedControlTab from '../segment';
import Color from '../basic/Color';



const SCREEN_WIDTH = Dimensions.get('window').width;

class BasicHeaderView extends Component {
    constructor() {
        super()
        this.state = { selectedIndex: 0, };
    }
    handleIndexChange = (index) => {
        this.setState({ ...this.state, selectedIndex: index, });
    }
    handleMoreAction = () => {
        this.props.navigation.state.params.onPressMoreAction();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <Icon name="chevron-left" size={30} type="material-community" color={Color.whiteColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerMiddle}>
                    <SegmentedControlTab values={['Chat', 'Notification']}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}
                        tabsContainerStyle={{ width: SCREEN_WIDTH - 176, height: 35 }}
                        tabStyle={{ backgroundColor: Color.themeColor, borderColor: Color.whiteColor }}
                        tabTextStyle={{ fontWeight: 'normal', fontSize: 16, color: Color.whiteColor }}
                        activeTabStyle={{ backgroundColor: Color.whiteColor, borderColor: Color.whiteColor }}
                        activeTabTextStyle={{ color: Color.themeColor }} />
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={this.handleMoreAction}>
                        <Icon name="dots-horizontal" size={30} type="material-community" color={Color.whiteColor} />
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}
export default BasicHeaderView;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: Platform.OS == 'ios' ? 44 : Header.HEIGHT,
        backgroundColor: Color.themeColor,
        paddingTop: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLeft: {
        left: 0,
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
    },
    headerMiddle: {
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
    },
    headerRight: {
        height: '100%',
        right: 0,
        position: 'absolute',
        justifyContent: 'center',
    },
});