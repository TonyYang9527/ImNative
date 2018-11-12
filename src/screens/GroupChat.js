import React, { Component } from 'react';
import { Text, View, Button, ScrollView, Dimensions, NativeModules } from 'react-native';
import { Icon } from 'react-native-elements';
import BmoChat from "../components/basic/BmoChat";
import { messages, old_messages } from "../mock/data";
import Color from "../components/basic/Color";
import BasicHeaderView from '../components/header/BasicHeaderView';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

const ImagePicker = NativeModules.ImageCropPicker;

class GroupChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            typingText: null,
            loadHistory: true,
            isLoadingHistory: false,

        };
        this._isAlright = null;
        this._isMounted = false;

        this.onSend = this.onSend.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadHistory = this.onLoadHistory.bind(this);
        this.onPressActionButton = this.onPressActionButton.bind(this);
        this.onInputTextChanged = this.onInputTextChanged.bind(this);
        this.onPressMoreAction = this.onPressMoreAction.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        headerLeft: null,
        headerTitle: (<BasicHeaderView navigation={navigation} />),

    });

    componentWillMount() {
        this._isMounted = true;
        this.setState(() => {
            return { messages: messages };
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({ onPressMoreAction: this.onPressMoreAction });

    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    onLoadHistory() {
        this.setState((previousState) => {
            return {
                isLoadingHistory: true,
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState((previousState) => {
                    return {
                        messages: BmoChat.prepend(previousState.messages, old_messages),
                        loadHistory: true,
                        isLoadingHistory: false,
                    };
                });
            }
        }, 100);
    }
    onSend(messages = []) {
        this.setState((previousState) => {
            return { messages: BmoChat.append(previousState.messages, messages), };
        });
        this.answerDemo(messages);
    }
    answerDemo(messages) {
        if (messages.length > 0) {
            if ((messages[0].image || messages[0].location) || !this._isAlright) {
                this.setState((previousState) => {
                    return { typingText: 'React Native is typing' };
                });
            }
        }

        setTimeout(() => {
            if (this._isMounted === true) {
                if (messages.length > 0) {
                    if (messages[0].image) {
                        this.onReceive('Nice picture!');
                    } else if (messages[0].location) {
                        this.onReceive('My favorite place');
                    } else {
                        if (!this._isAlright) {
                            this._isAlright = true;
                            this.onReceive('Alright');
                        }
                    }
                }
            }

            this.setState((previousState) => {
                return {
                    typingText: null,
                };
            });
        }, 1000);
    }
    onReceive(text) {
        this.setState((previousState) => {
            return {
                messages: BmoChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }),
            };
        });
    }

    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }

    onPressActionButton(props) {
        const { options } = props;
        const optionKeys = Object.keys(options);
        const cancelButtonIndex = optionKeys.indexOf('Cancel');
        props.showActionSheetWithOptions(
            {
                options: optionKeys,
                destructiveButtonIndex: 1,
                cancelButtonIndex: cancelButtonIndex,
                tintColor: Color.themeColor,
                textStyle: {
                    color: Color.themeColor,
                    fontSize: 18,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlignVertical: "center",
                    flex: 1,
                },
            },
            (buttonIndex) => {
                const key = optionKeys[buttonIndex];
                switch (buttonIndex) {
                    case 0:
                        ImagePicker.openCamera({ cropping: false, includeExif: true, })
                            .then(image => {
                                const album = { uri: image.path, width: image.width, height: image.height, mime: image.mime }
                                this.props.navigation.navigate('Album', { image: album });
                            }).catch(e => { });
                        break;
                    case 1:
                        ImagePicker.openPicker({
                            multiple: true,
                            waitAnimationEnd: true,
                            includeExif: true,
                            mediaType: 'photo',
                            compressImageMaxWidth: 640,
                            compressImageMaxHeight: 480,
                            compressVideoPreset: 'MediumQuality',
                        }).then(images => {
                            const albums = images.map(i => ({ uri: i.path, width: i.width, height: i.height, mime: i.mime }))
                            this.props.navigation.navigate('Album', { albums: albums });
                        }).catch(e => { });
                        break;
                    default:
                        break;
                }
            },
        );
    }

    onPressMoreAction() {

        const options =['Add to Group','Order Information','Timeline','Cancel'] ;
        this.props.showActionSheetWithOptions(
            {
                options: options,
                destructiveButtonIndex: 1,
                cancelButtonIndex: 3,
                tintColor: Color.themeColor,
                textStyle: {
                    color: Color.themeColor,
                    fontSize: 18,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlignVertical: "center",
                    flex: 1,
                },
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        break;
                    case 1:
                        break;
                    default:
                        break;
                }
            },
        );

    }

    onInputTextChanged(text) {
        this.setState((previousState) => {
            return { typingText: text, };
        });
    }
    render() {
        let child = (<Icon name="paper-plane" size={26} type="entypo" color="#0081cc" />)
        return (
                <BmoChat
                    user={{ _id: 1, }}
                    messages={this.state.messages}
                    text={this.state.typingText}
                    onInputTextChanged={this.onInputTextChanged}
                    onSend={this.onSend}
                    onPressActionButton={this.onPressActionButton}
                    onPressMoreAction={this.onPressMoreAction}
                    options={{ Camera: null, Picture: null, Cancel: null }}
                    loadHistory={this.state.loadHistory}
                    onLoadHistory={this.onLoadHistory}
                    isLoadingHistory={this.state.isLoadingHistory}
                    textInputStyle={{ color: '#0081cc', borderColor: '#e7e7e7', borderWidth: 1, borderRadius: 8, }}
                    children={child}
                    alwaysShowSend={true}
                    renderChatFooter={this.renderChatFooter}
                />
        );
    }
}
export default connectActionSheet(GroupChat);


