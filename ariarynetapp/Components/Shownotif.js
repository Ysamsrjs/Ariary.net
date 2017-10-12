import React from 'react';
import { Notifications } from 'expo';
import { Text, View } from 'react-native';
import Utils from '../Service/Utilities/Utils';
export default class Shownotif extends React.Component {
	state = {
		notification: {}
	};
	async componentWillMount() {
		await Utils.registerForPushNotificationsAsync();

		// Handle notifications that are received or selected while the app
		// is open. If the app was closed and then opened by tapping the
		// notification (rather than just tapping the app icon to open it),
		// this function will fire on the next tick after the app starts
		// with the notification data.
		this._notificationSubscription = Notifications.addListener(this._handleNotification);
	}
	_handleNotification = notification => {
		this.setState({ notification: notification });
	};
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Origin: {this.state.notification.title}</Text>
				<Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
			</View>
		);
	}
}
