import React, { Component } from 'react';

const AuthContext = React.createContext({
    isLoggedIn :false ,
    logIn : ()=>{} ,
    logOut : ()=>{} ,
});

class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }
    logIn = () => {
        this.setState({ isLoggedIn: true });
    };
    logOut = () => {
        this.setState({ isLoggedIn: false });
    };
    
    render() {
        return (
            <AuthContext.Provider value={{  ...this.state, logIn: this.logIn,logOut: this.logOut }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;