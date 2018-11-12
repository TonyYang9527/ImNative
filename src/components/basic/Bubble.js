
import React from 'react';
import PropTypes from 'prop-types';
import { Text, Clipboard, StyleSheet, TouchableWithoutFeedback, View, ViewPropTypes, Platform } from 'react-native';
import MessageText from './MessageText';
import MessageImage from './MessageImage';
import Time from './Time';
import { isSameUser, isSameDay } from './utils';
import Color from './Color';

export default class Bubble extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onLongPress = this.onLongPress.bind(this);
    }

    onLongPress() {
        if (this.props.onLongPress) {
            this.props.onLongPress(this.context, this.props.currentMessage);
        } else if (this.props.currentMessage.text) {
            const options = ['Copy Text', 'Cancel'];
            const cancelButtonIndex = options.length - 1;
            this.props.showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                (buttonIndex) => {
                    switch (buttonIndex) {
                        case 0:
                            Clipboard.setString(this.props.currentMessage.text);
                            break;
                        default:
                            break;
                    }
                },
            );
        }
    }

    handleBubbleToNext() {
        if (
            isSameUser(this.props.currentMessage, this.props.nextMessage) &&
            isSameDay(this.props.currentMessage, this.props.nextMessage)
        ) {
            return StyleSheet.flatten([
                styles[this.props.position].containerToNext,
                this.props.containerToNextStyle[this.props.position],
            ]);
        }
        return null;
    }

    handleBubbleToPrevious() {
        if (
            isSameUser(this.props.currentMessage, this.props.previousMessage) &&
            isSameDay(this.props.currentMessage, this.props.previousMessage)
        ) {
            return StyleSheet.flatten([
                styles[this.props.position].containerToPrevious,
                this.props.containerToPreviousStyle[this.props.position],
            ]);
        }
        return null;
    }

    renderMessageText() {
        if (this.props.currentMessage.text) {
            const { containerStyle, wrapperStyle, ...messageTextProps } = this.props;
            if (this.props.renderMessageText) {
                return this.props.renderMessageText(messageTextProps);
            }
            return <MessageText {...messageTextProps} />;
        }
        return null;
    }

    renderMessageImage() {
        if (this.props.currentMessage.image) {
            const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
            if (this.props.renderMessageImage) {
                return this.props.renderMessageImage(messageImageProps);
            }
            return <MessageImage {...messageImageProps} />;
        }
        return null;
    }

    renderTicks() {
        const { currentMessage } = this.props;
        if (this.props.renderTicks) {
            return this.props.renderTicks(currentMessage);
        }
        if (currentMessage.user._id !== this.props.user._id) {
            return null;
        }
        if (currentMessage.sent || currentMessage.received) {
            return (
                <View style={styles.tickView}>
                    {currentMessage.sent && <Text style={[styles.tick, this.props.tickStyle]}>✓</Text>}
                    {currentMessage.received && <Text style={[styles.tick, this.props.tickStyle]}>✓✓</Text>}
                </View>
            );
        }
        return null;
    }

    renderTime() {
        if (this.props.currentMessage.createdAt) {
            const { containerStyle, wrapperStyle, ...timeProps } = this.props;
            if (this.props.renderTime) {
                return this.props.renderTime(timeProps);
            }
            return <Time {...timeProps} />;
        }
        return null;
    }

    renderCustomView() {
        if (this.props.renderCustomView) {
            return this.props.renderCustomView(this.props);
        }
        return null;
    }

    renderUsername() {
        const position = this.props.position;
        const username = this.props.currentMessage.user.name;
        if (username && position === 'left') {
            const { containerStyle, wrapperStyle, ...usernameProps } = this.props;
            if (this.props.renderUsername) {
                return this.props.renderUsername(usernameProps);
            }
            return (
                <View style={[styles[this.props.position].nameContainer, this.props.nameContainer[this.props.position]]}>
                    <Text style={[styles[this.props.position].usernameStyle, this.props.usernameStyle[this.props.position]]}>
                        {username}
                    </Text>
                </View>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
                {this.renderUsername()}
                <View style={[styles[this.props.position].wrapper, this.props.wrapperStyle[this.props.position], this.handleBubbleToNext(), this.handleBubbleToPrevious(),]} >
                    <TouchableWithoutFeedback onLongPress={this.onLongPress} accessibilityTraits="text" {...this.props.touchableProps} >
                        <View>
                            {this.renderCustomView()}
                            {this.renderMessageImage()}
                            {this.renderMessageText()}
                            <View style={[styles.bottom, this.props.bottomContainerStyle[this.props.position]]}>
                                {this.renderTime()}
                                {this.renderTicks()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

}

const styles = {
    left: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start',
            borderRadius: 15,
        },
        wrapper: {
            borderRadius: 15,
            backgroundColor: Color.leftBubbleColor,
            marginRight: 60,
            minHeight: 20,
            justifyContent: 'flex-end',

        },
        containerToNext: {
            borderBottomLeftRadius: 3,
            borderRadius: 15,
        },
        containerToPrevious: {
            borderTopLeftRadius: 3,
            borderRadius: 15,
        },
        nameContainer: {
            marginTop: Platform.OS === 'android' ? -2 : 2,
            marginBottom: 2,
            flexDirection: 'row',
            alignItems: 'flex-start',

        },
        usernameStyle: {
            fontSize: 12,
            marginLeft: 2,
            fontWeight: 'bold',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            color: '#aaa',
        },
    }),
    right: StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-end',
            borderRadius: 15,
        },
        wrapper: {
            borderRadius: 15,
            backgroundColor: Color.lightBubbleBackgroundColor,
            marginLeft: 60,
            minHeight: 20,
            justifyContent: 'flex-start',
        },
        containerToNext: {
            borderBottomRightRadius: 3,
            borderRadius: 15,
        },
        containerToPrevious: {
            borderTopRightRadius: 3,
            borderRadius: 15,
        },
        nameContainer: {
            marginTop: Platform.OS === 'android' ? -2 : 2,
            marginBottom: 2,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
        },
        usernameStyle: {
            fontSize: 12,
            marginRight: 2,
            fontWeight: 'bold',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignContent: "flex-end",
            textAlign: "right",
            color: '#aaa',
        },
    }),
    bottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    tick: {
        fontSize: 10,
        backgroundColor: 'transparent',
        color: '#fff',
    },
    tickView: {
        flexDirection: 'row',
        marginRight: 10,
    },
};

Bubble.defaultProps = {
    touchableProps: {},
    onLongPress: null,
    renderUsername: null,
    renderMessageImage: null,
    renderMessageText: null,
    renderCustomView: null,
    renderTicks: null,
    renderTime: null,
    position: 'left',
    currentMessage: {
        text: null,
        createdAt: null,
        image: null,
    },
    nextMessage: {},
    previousMessage: {},
    containerStyle: {},
    nameContainer: {},
    usernameStyle: {},
    wrapperStyle: {},
    bottomContainerStyle: {},
    tickStyle: {},
    containerToNextStyle: {},
    containerToPreviousStyle: {},
    showActionSheetWithOptions: () => { },
};

Bubble.propTypes = {
    user: PropTypes.object.isRequired,
    touchableProps: PropTypes.object,
    onLongPress: PropTypes.func,
    renderMessageImage: PropTypes.func,
    renderMessageText: PropTypes.func,
    renderCustomView: PropTypes.func,
    renderTime: PropTypes.func,
    renderTicks: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    nameContainer: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    usernameStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    wrapperStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    bottomContainerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    tickStyle: Text.propTypes.style,
    containerToNextStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    containerToPreviousStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    showActionSheetWithOptions: PropTypes.func,
};