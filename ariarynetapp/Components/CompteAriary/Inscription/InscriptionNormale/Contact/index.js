import React, { Component } from 'react';
import {
	StatusBar,
	View,
	TouchableOpacity,
	Dimensions,
	Image,
	ScrollView,
	TextInput,
	AsyncStorage,
	Alert,
	Text
} from 'react-native';
import { Container, Header, Title, Content, Button, Footer, FooterTab, Body, Left, Right } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import loginCss from '../../../../../styles/css/loginCss';
import styles from './styles';
import Utils from '../../../../../Service/Utilities/Utils';
class Contact extends Component {
	constructor(props) {
		super(props);
		this.onPressFlag = this.onPressFlag.bind(this);
		this.selectCountry = this.selectCountry.bind(this);
		this.state = {
			cca2: 'mg',
			email: '',
			phone: '+261',
			loading: false,
			erreur: '',
			haserror: false,
			phoneNumber: ''
		};
	}

	componentDidMount() {
		this.setState({
			pickerData: this.refs.phone.getPickerData()
		});
	}

	onPressFlag() {
		this.refs.countryPicker.openModal();
	}

	selectCountry(country) {
		this.refs.phone.selectCountry(country.cca2.toLowerCase());
		this.setState({ cca2: country.cca2 });
	}

	updateContact(value) {
		let contact = null;
		if (!this._isEmptyField()) {
			try {
				Utils._isValidMail(this.state.email);
				contact = {
					email: this.state.email,
					tel: Utils.getNumeric(value)
				};
			} catch (error) {
				this.setState({ haserror: true, erreur: error.toString() });
			}
		} else {
			Alert.alert('Info', 'Assurez-vous que tous les champs sont remplis');
		}
		this.props.updateContactState(contact);
	}

	_isEmptyField() {
		return this.state.email == null || this.state.email == '';
	}

	validateContact() {
		try {
			this.setState({ haserror: false });
			let value = this.refs.phone.getValue();
			let ret = Utils._parsePhone(value, this.state.cca2);
			this.setState({ phone: value });
			if (this.refs.phone.isValidNumber()) {
				this.updateContact(value);
			} else {
				this.setState({ haserror: true, erreur: 'Veuillez entrer un numéro téléphone valide' });
			}
		} catch (error) {
			this.setState({ haserror: true, erreur: error.toString() });
		}
	}

	changeTextPhone(text) {
		try {
			var ret = Utils._parsePhone(text, this.state.cca2);
			this.setState({ phone: ret });
		} catch (error) {
			this.setState({ phone: text });
		}
	}
	render() {
		return (
			<Content padder contentContainerStyle={{ justifyContent: 'center' }}>
				<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 10 }}>
					{this.state.haserror && (
						<Text
							style={{
								textAlign: 'center',
								padding: 20,
								color: 'white',
								fontWeight: '800',
								backgroundColor: '#ef9a9a',
								marginBottom: 10
							}}
						>
							{this.state.erreur}
						</Text>
					)}
					<Text
						style={{
							textAlign: 'center',
							padding: 5,
							color: 'white',
							fontWeight: '800',
							backgroundColor: '#1de9b6',
							marginBottom: 10
						}}
					>
						Entrer le code universel de votre pays d'abord, puis votre numéro
						téléphone(ex:Madagascar=>+261,France=>+33);
					</Text>

					<Text style={{ color: '#666' }}>Numéro Téléphone</Text>
					<View
						style={{
							alignItems: 'center',
							paddingVertical: 20
						}}
					>
						<PhoneInput
							ref="phone"
							onPressFlag={() => {
								this.onPressFlag();
							}}
							onChangePhoneNumber={this.changeTextPhone.bind(this)}
							value={this.state.phone}
						/>
						<CountryPicker
							ref="countryPicker"
							onChange={value => this.selectCountry(value)}
							translation="fra"
							cca2={this.state.cca2}
						>
							<View />
						</CountryPicker>
					</View>
					<Text style={{ color: '#666' }}>E-mail</Text>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="example@email.com"
							style={[loginCss.input, { backgroundColor: 'transparent' }]}
							keyboardType="email-address"
							onChangeText={email => this.setState({ email })}
							onEndEditing={() => {
								this.validateContact();
							}}
						/>
					</View>
				</View>
			</Content>
		);
	}
}

export default Contact;
