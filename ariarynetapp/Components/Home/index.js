import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Image, View, AsyncStorage, ActivityIndicator, Alert } from 'react-native';
import { Root } from 'native-base';

import Utils from '../../Service/Utilities/Utils';

import Expo from 'expo';

import Accueil from './Accueil';

class Loader extends React.Component {
	constructor() {
		super();
		this.state = {
			isReady: false,
			hasToken: false,
			isLoading: false,
			data: null
		};
	}

	async componentWillMount() {
		this.setState({ isLoading: true});
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
		});
		try {
			let di = 'await Utils.registerForPushNotificationsAsync()';
			const dataUser = await Utils.getItem('dataUser');
			if (dataUser != null) {
				let use = JSON.parse(dataUser);
				let account_id = use.code;
				let username = use.pseudo;
				this.setState({ hasToken: true });
				this.props.navigation.navigate('App', {
					account_id: account_id,
					pseudo: username,
					device_identifiant: di
				});
			} else {
				this.setState({ data: dataUser });
				this.props.navigation.navigate('Accueil');
			}
		} catch (error) {
			Alert.alert('Erreur', error.message);
		}
		this.setState({ isLoading: false});
	}
	render() {
		if (this.state.isLoading) {
			return (
				<View
					style={{
						backgroundColor: '#fff',
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0
					}}
				>
					<ActivityIndicator size="large" animating={true} color="#666" />
				</View>
			);
		} else {
			return <View />;
		}
	}
}

export default Loader;
