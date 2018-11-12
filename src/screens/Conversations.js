import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import SearchFlatList from '../components/flat_list/SearchFlatList';
import SegmentedControlView from '../components/SegmentedControlView';


class Conversations extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerLeft: null,
        headerTitle: (<SegmentedControlView navigation={navigation} />),

    });

    onPress = (user) => {
        this.props.navigation.navigate('Chat', { ...user });
    };
    render() {
        return (<SearchFlatList navigation={this.props.navigation} onPress={this.onPress} />);
    }
}

export default Conversations;