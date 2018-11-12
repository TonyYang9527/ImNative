import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ListView,TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { users } from '../mock/data';

class Feed extends Component {

    onLearnMore = (user) => {
        this.props.navigation.navigate('Details', { ...user });
    };

    render() {
        return (
            <View style={{flex: 1}}>
            <ScrollView style={{ marginTop: -20}} >
                <List>
                    {users.map((user) => (
                        <ListItem  component={TouchableHighlight} key={user.login.username} roundAvatar
                            avatar={{ uri: user.picture.thumbnail }}
                            title={`${user.name.first.toUpperCase()} ${user.name.last.toUpperCase()}`}
                            subtitle={user.email} onPress={() => this.onLearnMore(user)}
                        />
                    ))}
                </List>
            </ScrollView>
            </View>
        );
    }
}

export default Feed;