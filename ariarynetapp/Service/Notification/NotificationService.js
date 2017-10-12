//import liraries
//import { Notifications } from 'expo';
import { Alert,ToastAndroid} from 'react-native';

// create a component
const instance = null;
class NotificationService {
	static getInstance() {
		if (!instance) {
			instance = new NotificationService();
		}
		return instance;
	}
	_localNotification(message, target) {
		// const localNotification = {
		// 	title: title,
		// 	body: message,
		// 	ios: {
		// 		sound: true
		// 	},
		// 	android: {
		// 		sound: true,
		// 		priority: 'high',
		// 		sticky: false,
		// 		vibrate: true
		// 	}
		// };
		// let t = new Date();
		// t.setSeconds(t.getSeconds() + 3);
		// const schedulingOptions = {
		// 	time: t,
		// 	repeat: no_repeat
		// };
		// Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
	}
	// async _sendMail(subject, recipient, message) {
	// 	await Mailer.mail(
	// 		{
	// 			subject: subject,
	// 			recipients: recipient,
	// 			ccRecipients: '',
	// 			bccRecipients: '',
	// 			body: message,
	// 			isHTML: true,
	// 			attachment: {
	// 				path: '',
	// 				type: '',
	// 				name: ''
	// 			}
	// 		},
	// 		(error, event) => {
	// 			if (error) {
	// 				throw error.toString();
	// 			}
	// 		}
	// 	);
	// }
	// async _sendSMSFunction() {
	// 	await SendSMS.send('+261348400278', 'Hey.., this is me!\nGood to see you. Have a nice day.', msg => {
	// 		ToastAndroid.show(msg, ToastAndroid.SHORT);
	// 	});
	// }
}
export default NotificationService.getInstance();
