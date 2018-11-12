import React, { Component } from 'react';
import { connectActionSheet } from '@expo/react-native-action-sheet';

const LanguageContext = React.createContext({
    local: 'en',
    switchLanguage: () => { },
    showActionSheetWithOptions: () => { },

});

class LanguageProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { local: 'en' };
        this.switchLanguage = this.switchLanguage.bind(this);
    }
    switchLanguage = (props) => {
        let { local } = props
        this.setState(state => ({
            local: (state.local === 'en' && local === 'en') ? 'zh' : 'en'
        }));
    };

    render() {
        return (
            <LanguageContext.Provider value={{ ...this.state, switchLanguage: this.switchLanguage, showActionSheetWithOptions: this.props.showActionSheetWithOptions }}>
                {this.props.children}
            </LanguageContext.Provider>
        );
    }
}
export const Consumer = LanguageContext.Consumer;
export const Provider = connectActionSheet(LanguageProvider);