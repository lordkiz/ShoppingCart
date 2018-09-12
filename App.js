/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MainNavigation } from './src/config/router.js';
import configureStore from './src/store/configureStore';


const store = configureStore();

export default class App extends Component<{}> {

	render() {
		return (
	    	<Provider store={store}>
		    	<MainNavigation />
	    	</Provider>
	    );
	}
}
