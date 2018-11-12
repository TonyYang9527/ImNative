import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, View, Dimensions,SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import InputToolbar from './InputToolbar';
import MessageContainer from './MessageContainer';
import { MIN_COMPOSER_HEIGHT, DATE_FORMAT, TIME_FORMAT } from './Constant';
import { connectActionSheet } from '@expo/react-native-action-sheet';

class BmoChat extends Component {

    constructor(props) {
        super(props);

        this._isMounted = false;
        this._keyboardHeight = 0;
        this._bottomOffset = 0;
        this._maxHeight = null;
        this._isFirstLayout = true;
        this._messages = [];
        this.state = {
            text: '' ,
            isInitialized: false,
            composerHeight: MIN_COMPOSER_HEIGHT,
            messagesContainerHeight: null,
            typingDisabled: false,
        };

        this.onKeyboardWillShow = this.onKeyboardWillShow.bind(this);
        this.onKeyboardWillHide = this.onKeyboardWillHide.bind(this);
        this.onKeyboardDidShow = this.onKeyboardDidShow.bind(this);
        this.onKeyboardDidHide = this.onKeyboardDidHide.bind(this);
        this.onSend = this.onSend.bind(this);

        this.onInputSizeChanged = this.onInputSizeChanged.bind(this);
        this.onInputTextChanged = this.onInputTextChanged.bind(this);
        this.onMainViewLayout = this.onMainViewLayout.bind(this);
        this.onInitialLayoutViewLayout = this.onInitialLayoutViewLayout.bind(this);

        this.invertibleScrollViewProps = {
            inverted: this.props.inverted,
            keyboardShouldPersistTaps: this.props.keyboardShouldPersistTaps,
            keyboardDismissMode: this.props.keyboardDismissMode,
            onKeyboardWillShow: this.onKeyboardWillShow,
            onKeyboardWillHide: this.onKeyboardWillHide,
            onKeyboardDidShow: this.onKeyboardDidShow,
            onKeyboardDidHide: this.onKeyboardDidHide,
        };
    }

    static append(currentMessages = [], messages, inverted = true) {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        return inverted ? messages.concat(currentMessages) : currentMessages.concat(messages);
    }

    static prepend(currentMessages = [], messages, inverted = true) {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        return inverted ? currentMessages.concat(messages) : messages.concat(currentMessages);
    }


    componentWillMount() {
        const { messages, text } = this.props;
        this.setIsMounted(true);
        this.setMessages(messages || []);
        this.setTextFromProp(text);
    }

    componentWillUnmount() {
        this.setIsMounted(false);
    }

    componentWillReceiveProps(nextProps = {}) {
        const { messages, text } = nextProps;
        this.setMessages(messages || []);
        this.setTextFromProp(text);
    }

    setTextFromProp(textProp) {
        if (textProp !== undefined && textProp !== this.state.text) {
            this.setState({ text: textProp });
        }
    }

    getTextFromProp(fallback) {
        if (this.props.text === undefined) {
            return fallback;
        }
        return this.props.text;
    }

    setMessages(messages) {
        this._messages = messages;
    }

    getMessages() {
        return this._messages;
    }

    setMaxHeight(height) {
        this._maxHeight = height;
    }

    getMaxHeight() {
        return this._maxHeight;
    }

    setKeyboardHeight(height) {
        this._keyboardHeight = height;
    }

    getKeyboardHeight() {
        if (Platform.OS === 'android' && !this.props.forceGetKeyboardHeight) {
            return 0;
        }
        return this._keyboardHeight;
    }

    setBottomOffset(value) {
        this._bottomOffset = value;
    }

    getBottomOffset() {
        return this._bottomOffset;
    }

    setIsFirstLayout(value) {
        this._isFirstLayout = value;
    }

    getIsFirstLayout() {
        return this._isFirstLayout;
    }

    setIsTypingDisabled(value) {
        this.setState({
            typingDisabled: value,
        });
    }

    getIsTypingDisabled() {
        return this.state.typingDisabled;
    }

    setIsMounted(value) {
        this._isMounted = value;
    }

    getIsMounted() {
        return this._isMounted;
    }

    getMinInputToolbarHeight() {
        return this.props.renderAccessory
            ? this.props.minInputToolbarHeight * 2
            : this.props.minInputToolbarHeight;
    }
    calculateInputToolbarHeight(composerHeight) {
        return composerHeight + (this.getMinInputToolbarHeight() - MIN_COMPOSER_HEIGHT);
    }

    getBasicMessagesContainerHeight(composerHeight = this.state.composerHeight) {
        return this.getMaxHeight() - this.calculateInputToolbarHeight(composerHeight);
    }

    getMessagesContainerHeightWithKeyboard(composerHeight = this.state.composerHeight) {
        return this.getBasicMessagesContainerHeight(composerHeight) - this.getKeyboardHeight() + this.getBottomOffset();
    }

    prepareMessagesContainerHeight(value) {
        if (this.props.isAnimated === true) {
            return new Animated.Value(value);
        }
        return value;
    }

    onKeyboardWillShow(e) {
        this.setIsTypingDisabled(true);
        this.setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : e.end.height);
        this.setBottomOffset(this.props.bottomOffset);
        const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard();
        if (this.props.isAnimated === true) {
            Animated.timing(this.state.messagesContainerHeight, {
                toValue: newMessagesContainerHeight,
                duration: 210,
            }).start();
        } else {
            this.setState({
                messagesContainerHeight: newMessagesContainerHeight,
            });
        }
    }

    onKeyboardWillHide() {
        this.setIsTypingDisabled(true);
        this.setKeyboardHeight(0);
        this.setBottomOffset(0);
        const newMessagesContainerHeight = this.getBasicMessagesContainerHeight();
        if (this.props.isAnimated === true) {
            Animated.timing(this.state.messagesContainerHeight, {
                toValue: newMessagesContainerHeight,
                duration: 210,
            }).start();
        } else {
            this.setState({
                messagesContainerHeight: newMessagesContainerHeight,
            });
        }
    }

    onKeyboardDidShow(e) {
        if (Platform.OS === 'android') {
            this.onKeyboardWillShow(e);
        }
        this.setIsTypingDisabled(false);
    }

    onKeyboardDidHide(e) {
        if (Platform.OS === 'android') {
            this.onKeyboardWillHide(e);
        }
        this.setIsTypingDisabled(false);
    }

    scrollToBottom(animated = true) {
        if (this._messageContainerRef === null) {
            return;
        }
        this._messageContainerRef.scrollTo({ y: 0, animated });
    }


    renderMessages() {
        const AnimatedView = this.props.isAnimated === true ? Animated.View : View;
        return (
            <AnimatedView style={{ height: this.state.messagesContainerHeight, }} >
                <MessageContainer {...this.props} messages={this.getMessages()} invertibleScrollViewProps={this.invertibleScrollViewProps}
                    ref={(component) => (this._messageContainerRef = component)} />

                {this.renderChatFooter()}
            </AnimatedView>
        );
    }

    onSend(messages = [], shouldResetInputToolbar = false) {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        messages = messages.map((message) => {
            return { ...message, user: this.props.user, createdAt: new Date(), _id: this.props.messageIdGenerator(), };
        });

        if (shouldResetInputToolbar === true) {
            this.setIsTypingDisabled(true);
            this.resetInputToolbar();
        }
        this.props.onSend(messages);
        this.scrollToBottom();
        if (shouldResetInputToolbar === true) {
            setTimeout(() => {
                if (this.getIsMounted() === true) {
                    this.setIsTypingDisabled(false);
                }
            }, 100);
        }
    }

    resetInputToolbar() {
        if (this.textInput) {
            this.textInput.clear();
        }
        this.notifyInputTextReset();
        const newComposerHeight = MIN_COMPOSER_HEIGHT;
        const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
        this.setState({
            text: this.getTextFromProp(''),
            composerHeight: newComposerHeight,
            messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight),
        });
    }

    focusTextInput() {
        if (this.textInput) {
            this.textInput.focus();
        }
    }

    onInputSizeChanged(size) {
        const newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(200, size.height));
        const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
        this.setState({
            composerHeight: newComposerHeight,
            messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight),
        });
    }

    onInputTextChanged(text) {

        if (this.getIsTypingDisabled()) {
            return;
        }
        if (this.props.onInputTextChanged) {
            this.props.onInputTextChanged(text);
        }
        if (this.props.text === undefined) {
            this.setState({ text });
        }
    }

    notifyInputTextReset() {
        if (this.props.onInputTextChanged) {
            this.props.onInputTextChanged('');
        }
    }

    onInitialLayoutViewLayout(e) {
        const { layout } = e.nativeEvent;
        if (layout.height <= 0) {
            return;
        }
        this.notifyInputTextReset();
        this.setMaxHeight(layout.height);
        const newComposerHeight = MIN_COMPOSER_HEIGHT;
        const newMessagesContainerHeight = this.getMessagesContainerHeightWithKeyboard(newComposerHeight);
        this.setState({
            isInitialized: true,
            text: this.getTextFromProp(''),
            composerHeight: newComposerHeight,
            messagesContainerHeight: this.prepareMessagesContainerHeight(newMessagesContainerHeight),
        });
    }

    onMainViewLayout(e) {
        const { layout } = e.nativeEvent;
        if (this.getMaxHeight() !== layout.height || this.getIsFirstLayout() === true) {
            this.setMaxHeight(layout.height);
            this.setState({
                messagesContainerHeight: this.prepareMessagesContainerHeight(this.getBasicMessagesContainerHeight()),
            });
        }
        if (this.getIsFirstLayout() === true) {
            this.setIsFirstLayout(false);
        }
    }

    renderInputToolbar() {
        const inputToolbarProps = {
            ...this.props,
            text: this.getTextFromProp(this.state.text),
            composerHeight: Math.max(MIN_COMPOSER_HEIGHT, this.state.composerHeight),
            onSend: this.onSend,
            onInputSizeChanged: this.onInputSizeChanged,
            onTextChanged: this.onInputTextChanged,
            textInputProps: {
                ...this.props.textInputProps,
                ref: (textInput) => (this.textInput = textInput),
                maxLength: this.getIsTypingDisabled() ? 0 : this.props.maxInputLength,
            },
        };
        if (this.props.renderInputToolbar) {
            return this.props.renderInputToolbar(inputToolbarProps);
        }
        return (
            <InputToolbar  {...inputToolbarProps} />
        );
    }

    renderChatFooter() {
        if (this.props.renderChatFooter) {
            const footerProps = { ...this.props, };
            return this.props.renderChatFooter(footerProps);
        }
        return null;
    }

    renderLoading() {
        if (this.props.renderLoading) {
            return this.props.renderLoading();
        }
        return null;
    }

    render() {
        if (this.state.isInitialized === true) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.container} onLayout={this.onMainViewLayout}>
                        {this.renderMessages()}
                        {this.renderInputToolbar()}
                    </View>
                </SafeAreaView>
            );
        }
        return (
            <SafeAreaView style={styles.container} onLayout={this.onInitialLayoutViewLayout}>
                {this.renderLoading()}
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


BmoChat.defaultProps = {
    messages: [],
    text: undefined,
    messageIdGenerator: () => uuid.v4(),
    user: {},
    onSend: () => { },
    timeFormat: TIME_FORMAT,
    dateFormat: DATE_FORMAT,
    isAnimated: Platform.select({
        ios: true,
        android: false,
    }),

    loadHistory: false,
    isLoadingHistory: false,
    renderLoadHistory: null,
    onLoadHistory: () => { },

    renderLoading: null,
    renderAvatar: undefined,
    showUserAvatar: true,
    onPressAvatar: null,
    renderAvatarOnTop: true,
    renderBubble: null,
    renderSystemMessage: null,
    onLongPress: null,
    renderMessage: null,
    renderMessageText: null,
    renderMessageImage: null,
    imageProps: {},
    lightboxProps: {},
    textInputProps: {},
    listViewProps: {},
    renderCustomView: null,
    renderDay: null,
    renderTime: null,

    renderFooter: null,
    renderChatFooter: null,
    renderInputToolbar: null,

    renderComposer: null,
    renderActions: null,
    renderSend: null,
    renderAccessory: null,
    onPressActionButton: null,

    bottomOffset: 0,
    minInputToolbarHeight: 44,
    keyboardShouldPersistTaps: Platform.select({
        ios: 'never',
        android: 'never',
    }),
    keyboardDismissMode:Platform.select({
        ios: 'on-drag',
        android: 'on-drag',
    }),
    onInputTextChanged: null,
    maxInputLength: null,
    forceGetKeyboardHeight: false,
    inverted: true,
};

BmoChat.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    text: PropTypes.string,
    placeholder: PropTypes.string,
    messageIdGenerator: PropTypes.func,
    user: PropTypes.object,
    onSend: PropTypes.func,
    locale: PropTypes.string,
    timeFormat: PropTypes.string,
    dateFormat: PropTypes.string,
    isAnimated: PropTypes.bool,

    loadHistory: PropTypes.bool,
    onLoadHistory: PropTypes.func,
    isLoadingHistory: PropTypes.bool,
    renderLoadHistory: PropTypes.func,
    renderLoading: PropTypes.func,

    renderAvatar: PropTypes.func,
    showUserAvatar: PropTypes.bool,
    onPressAvatar: PropTypes.func,
    renderAvatarOnTop: PropTypes.bool,
    renderBubble: PropTypes.func,
    renderSystemMessage: PropTypes.func,
    onLongPress: PropTypes.func,
    renderMessage: PropTypes.func,
    renderMessageText: PropTypes.func,
    renderMessageImage: PropTypes.func,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
    renderCustomView: PropTypes.func,
    renderDay: PropTypes.func,
    renderTime: PropTypes.func,
    renderFooter: PropTypes.func,
    renderChatFooter: PropTypes.func,
    renderInputToolbar: PropTypes.func,
    renderComposer: PropTypes.func,
    renderActions: PropTypes.func,
    renderSend: PropTypes.func,
    renderAccessory: PropTypes.func,
    onPressActionButton: PropTypes.func,
    bottomOffset: PropTypes.number,
    minInputToolbarHeight: PropTypes.number,
    listViewProps: PropTypes.object,
    keyboardShouldPersistTaps: PropTypes.oneOf(['always', 'never', 'handled']),
    keyboardDismissMode: PropTypes.oneOf(['none', 'interactive', 'on-drag']),
    onInputTextChanged: PropTypes.func,
    maxInputLength: PropTypes.number,
    forceGetKeyboardHeight: PropTypes.bool,
    inverted: PropTypes.bool,
    textInputProps: PropTypes.object,
};

export default  connectActionSheet(BmoChat);