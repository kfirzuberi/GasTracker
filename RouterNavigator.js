import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globalOperations } from './duck/index';
import { createRootNavigator } from "./router";
import NavigationService from './services/NavigationService';

class RouterNavigator extends Component {
    componentDidMount() {
        this.props.watchAuthStateChangedDispatcher();
    }

    render() {
        if (this.props.loading) return null;

        const Layout = createRootNavigator(this.props.user);
        return (
            <Layout ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading
    };
}

const mapDispatchToProps = dispatch => ({
    watchAuthStateChangedDispatcher: () => dispatch(globalOperations.watchAuthStateChangedDispatcher())
})

export default connect(mapStateToProps, mapDispatchToProps)(RouterNavigator)