let PNF = require('google-libphonenumber').PhoneNumberFormat;
let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
import {AsyncStorage, NetInfo,Share,Alert } from 'react-native';
import { Permissions, Notifications } from 'expo';
let instance=null;
// create a component
class Utils{
	static getInstance() {
		if (!instance) {
			instance = new Utils();
		}
		return instance;
	}
	async _saveItem(key, val) {
		try {
			await AsyncStorage.setItem(key, val);
		} catch (error) {
			throw error;
		}
	}
	getNumeric(str) {
		return str.replace(/ /g, '');
	}
	_parsePhone(number, iso) {
		var phone = null;
		try {
			var phoneNumber = phoneUtil.parse(number, iso);
			phone = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
		} catch (err) {
			throw err.toString();
		}
		return phone;
	}
	validatePhoneNumer(phone) {
		try {
			var num = this.getNumeric(phone);
			var b = num.charAt(5) != 2 && num.charAt(5) != 3 && num.charAt(5) != 4 && num.charAt(5) == 9 ;
			if (num.charAt(4) != 3 || b || num.length != 13) {
				throw 'Veuillez entrer un numéro Telma,Airtel, Orange, Bip valide';
			}
		} catch (error) {
			throw error.toString();
		}
	}
	async getItem(key) {
		let ret = null;
		try {
			ret = await AsyncStorage.getItem(key);
		} catch (error) {
			throw error;
		}
		return ret;
	}
	async removeItem(key) {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			throw error;
		}
	}
	_isValidPass(pass) {
		let ret = true;
		let msg =
			'Le mot de passe doit contenir au moins 6 caractères: au moins un caractère minuscule,un caractère majuscule et un chiffre';
		if (!/^(?=^.{6,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(pass)) {
			ret = false;
			throw msg;
		}
		return ret;
	}
	_isValidMail(mail) {
		let ret = true;
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			mail	
			)
		) {
			ret = false;
			throw 'Veuillez entrer une adresse email valide!!!';
		}
		return ret;
	}
	_isValidPhone(phone) {
		let ret = true;
		return ret;
	}
	checkInternetConnection() {
		try {
			NetInfo.isConnected.fetch().then(isConnected => {
				console.log('First, is ' + (isConnected ? 'online' : 'offline'));
			});
			// function handleFirstConnectivityChange(isConnected) {
			// 	console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
			// 	NetInfo.isConnected.removeEventListener('change', handleFirstConnectivityChange);
			// }
			// NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChange);
		} catch (error) {
			throw error.toString();
		}
	}
	async registerForPushNotificationsAsync() {
		const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			return;
		}
		let token = await Notifications.getExpoPushTokenAsync();
		return token;
	}
	ShareApp(){
		Share.share(
			{
				message: 'Ariary App, start-up informatique,une application mobile de paiement en ligne,http://www.ariarynet.com/',
				title: 'Ariary.net',
				url: 'http://www.ariarynet.com/'
			},
			{
				dialogTitle: 'Partager avec:',
				excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter', 'com.apple.uikit.activity.mail'],
				tintColor: 'green'
			}
		)
			.catch(err => console.log(err));
	}
	
	_showShareMenu(result) {
		Alert.alert('Result','result');
	}
}
export default Utils.getInstance();
