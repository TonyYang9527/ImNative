import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, SafeAreaView ,TouchableHighlight} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import _ from "lodash";
import uuid from "uuid";
import { getUsers, contains } from "../../services/UserServices";
import Color from "../basic/Color";

class SearchFlatList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            query: "",
            fullData: []
        };
    }

    componentDidMount() {
        this.fetchDataRequest();
    }

    fetchDataRequest = _.debounce(() => {
        this.setState({ loading: true });
        getUsers(20, this.state.query)
            .then(users => {
                this.setState({
                    loading: false,
                    data: users,
                    fullData: users
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }, 250);

    handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const data = _.filter(this.state.fullData, user => {
            return contains(user, formattedQuery);
        });
        this.setState({ data, query: text }, () => this.fetchDataRequest());
    };
    
    renderHeader = () => {
        return <SearchBar lightTheme showLoading  autoCorrect={false}  placeholder="Search" onChangeText={this.handleSearch} containerStyle={{ backgroundColor: '#eaeaea' }} inputStyle={{ backgroundColor: '#ffffff' }} />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }} >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView>
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
                    <FlatList data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItem roundAvatar
                                key={item.login.username}
                                component={TouchableHighlight} 
                                underlayColor={"#FBDF01"}
                                title={`${item.name.first} ${item.name.last}`}
                                subtitle={item.email}
                                avatar={{ uri: item.picture.thumbnail }}
                                onPress={() => this.props.onPress(item)} />
                        )}
                        keyExtractor={item => item.email}
                        stickyHeaderIndices={[0]}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter} />
                </List>
            </SafeAreaView>
        );
    }
}

export default SearchFlatList;