
import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Color from './Color';
import { MIN_COMPOSER_HEIGHT } from './Constant';

export default class Composers extends Component {

    constructor(props) {
        super(props);
        this.onContentSizeChange = this.onContentSizeChange.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
       
    }

    onContentSizeChange(e) {
        const { contentSize } = e.nativeEvent;
        if (!contentSize) {
            return
        };
        if (!this.contentSize || this.contentSize.width !== contentSize.width || this.contentSize.height !== contentSize.height) {
            this.contentSize = contentSize;
            this.props.onInputSizeChanged(this.contentSize);
        }
    }

    onChangeText(text) {
       if(this.props.onTextChanged){
         this.props.onTextChanged(text);
       }else{
         return;
       }
    }

    render() {
        return (
            <TextInput
                testID={this.props.placeholder}
                accessible
                autoCorrect={false}
                accessibilityLabel={this.props.placeholder}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                multiline={this.props.multiline}
                onChange={(e) => this.onContentSizeChange(e)}
                onContentSizeChange={(e) => this.onContentSizeChange(e)}
                onChangeText={(text) => this.onChangeText(text)}
                style={[styles.textInput, this.props.textInputStyle, { height: this.props.composerHeight }]}
                autoFocus={this.props.textInputAutoFocus}
                value={this.props.text}
                enablesReturnKeyAutomatically
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                keyboardAppearance={this.props.keyboardAppearance}
                {...this.props.textInputProps}
            />
        );
    }

}

const styles = StyleSheet.create({
    textInput: {
      flex: 1,
      marginLeft: 2,
      marginRight:2,
      fontSize: 16,
      lineHeight: 16,
      marginTop: Platform.select({
        ios: 6,
        android: 3,
      }),
      marginBottom: Platform.select({
        ios: 6,
        android: 3,
      }),
    },
  });

Composers.defaultProps = {
    composerHeight: MIN_COMPOSER_HEIGHT,
    text: '',
    placeholderTextColor: Color.defaultProps,
    placeholder: '  Please Type a message...',
    textInputProps: null,
    multiline: true,
    textInputStyle: {},
    textInputAutoFocus: false,
    keyboardAppearance: 'default',
    onTextChanged: () => { },
    onInputSizeChanged: () => { },
};

Composers.propTypes = {
    composerHeight: PropTypes.number,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    textInputProps: PropTypes.object,
    onTextChanged: PropTypes.func,
    onInputSizeChanged: PropTypes.func,
    multiline: PropTypes.bool,
    textInputStyle: TextInput.propTypes.style,
    textInputAutoFocus: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
};