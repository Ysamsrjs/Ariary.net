import TimerMixin from 'react-timer-mixin';
let PNF = require('google-libphonenumber').PhoneNumberFormat;
import { Notifications } from 'expo';
import { Alert } from 'react-native';

let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const ic = require('../../assets/images/ariary.png');
import Utils from '../Utilities/Utils';
const BASEURL = 'http://54.229.79.45/ariary2API/web/api/';

// create a component
const phoneRegex = /[0-9 -()+]+$/;

let instance = null;

class AchatService {
	static getInstance() {
		if (!instance) {
			instance = new AchatService();
		}
		return instance;
	}
	/**
	 * 
	 * @param {*} account_id 
	 * @param {*} amount 
	 * @param {*} phone 
	 */
	async _initAchat(activity,act) {
		activity.setState({ loading: true });
		let url = BASEURL + 'achat';
		let ret=false;
		try {
			this._validate(act.state.montant, act.state.phone, act.state.password);
			let device_token = await Utils.registerForPushNotificationsAsync();
			let params_to_send = {
				account_id: act.state.account_id,
				token: device_token,
				amount: act.state.montant,
				phone: this.getPhoneNumber(act.state.phone)
			};
			let options = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(params_to_send)
			};
			await fetch(url, options)
				.then(response => response.json())
				.then(responseJson => {
					if (responseJson.error_message != null) {
						throw responseJson.error_message;
					} else {
						Alert.alert(
							'Info Transanction',
							'Votre achat est en cours de traitement. Un message Mobile Money est envoyé sur le numéro ' +
								act.state.phone +
								'. Vous allez recevoir une notification sur votre téléphone une fois que la transaction aura terminée'
						);
						ret=true;
					}
				});
			activity.setState({ loading: false });
		} catch (error) {
			activity.setState({ loading: false });
			throw error;
		}
		if(ret){
			activity.props.navigation.navigate('Profile');
		}else{
			throw "echéc de l'envoi de sms";
		}
	}
	/**
	 * 
	 * @param {*} amount 
	 * @param {*} phone 
	 * @param {*} password 
	 */
	_validate(amount, phone, password) {
		try {
			this._checkMontant(amount);
			this.checkPhoneNumber(phone);
			this._parsePhone(phone, 'mg');
			this.validatePhoneNumer(phone);
			this._checkPassword(password);
		} catch (error) {
			throw error.toString();
		}
	}
	/**
	 * 
	 * @param {*} id 
	 */
	async _waitingForTraitement(activity) {
		try {
			var counpteur = 0;
			var ID = TimerMixin.setInterval(async () => {
				let retour = await this._traitementAchat(activity.state.initstate.id); //let retour = await this._traitementAchat(activity.state.initstate.id);
				if (retour.etat != 'effectué') {
					counpteur++;
					activity.setState({ count: counpteur });
				} else {
					activity.setState({ result: retour });
				}
			}, 10000);
			activity.setState({ interval: ID });
		} catch (error) {
			throw error.toString();
		}
	}
	async _achatDidtraitement(activity) {
		console.log('count==>' + activity.state.count);
		if (activity.state.result != null) {
			await TimerMixin.clearInterval(activity.state.interval);
			activity.setState({ count: 0 });
			activity.setState({ initstate: null });
			let msg = 'Votre achat à été bien effectué!!!';
			this.createNotification(msg);
			throw msg;
		} else if (activity.state.count == 10) {
			await TimerMixin.clearInterval(activity.state.interval);
			activity.setState({ count: 0 });
			let msg = "Le delai d'attente de votre transaction est dépassée,Mmerci de bien vérifier votre  numéro!!!";
			activity.setState({ initstate: null });
			this.createNotification(msg);
			throw msg;
		}
	}
	/**
	 * 
	 * @param {*} idtransaction 
	 */
	async _traitementAchat(dataAchat) {
		let retour = null;
		let url = BASEURL + 'etat_transaction/' + idtransaction;
		try {
			await fetch(url)
				.then(response => response.json())
				.then(responseJson => {
					if (responseJson.error_message != null) {
						throw responseJson.error_message;
					} else {
						retour = responseJson;
					}
				});
		} catch (error) {
			throw error;
		}
		return retour;
	}

	/**
	 * 
	 * @param {*} number 
	 * @param {*} iso 
	 */
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
	/**
	 * 
	 * @param {*} number 
	 */
	getPhoneNumber(number) {
		var tel = this.getNumeric(number);
		return '0' + tel.substr(4, tel.length);
	}
	/**
	 * 
	 * @param {*} str 
	 */
	getNumeric(str) {
		return str.replace(/ /g, '');
	}
	/**
	 * 
	 * @param {*} password 
	*/
	_checkPassword(password) {
		if (password == '' || password == null) {
			throw 'Vous devez entrer votre mot de passe pour confirmer votre achat';
		}
	}
	/**
	 * 
	 * @param {*} phone 
	 */
	checkPhoneNumber(phone) {
		if (phone == '' || phone == null) {
			throw 'Le numero téléphone ne doit pas être vide ou null';
		}
	}
	/**
	 * 
	 * @param {*} montant 
	 */
	_checkMontant(montant) {
		if (montant == '' || montant == null || isNaN(montant) || montant <= 0) {
			throw 'Veuillez entrer un montant valide(nombre positif different de 0)';
		}
	}
	/**
	 * 
	 * @param {*} phone 
	 */
	validatePhoneNumer(phone) {
		try {
			var num = this.getNumeric(phone);
			var b = num.charAt(5) != 2 && num.charAt(5) != 3 && num.charAt(5) != 4;
			if (num.charAt(4) != 3 || b || num.length != 13) {
				throw 'Veuillez entrer un numéro Telma,Airtel ou Orange pour la transaction mobile';
			}
		} catch (error) {
			throw error.toString();
		}
	}
	/**
	 * 
	 */
	createNotification(message) {
		const localNotification = {
			title: 'Info Transaction',
			body: message,
			ios: {
				sound: true
			},
			android: {
				sound: true,
				icon: ic,
				priority: 'high',
				sticky: false,
				vibrate: trueç
			}
		};
		let t = new Date();
		t.setSeconds(t.getSeconds() + 3);
		let repeat = 5;
		const schedulingOptions = {
			time: t
		};
		Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
	}
}
//make this component available to the app
export default AchatService.getInstance();
