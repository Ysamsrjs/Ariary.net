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
	Text,
	Modal
} from 'react-native';
import { Container, Header, Title, Content, Button, Footer, FooterTab, Body, Left, Right } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';

import loginCss from '../../../../../styles/css/loginCss';

import styles from './styles';

import Utils from '../../../../../Service/Utilities/Utils';

const regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{6,}$/';

class Recuperation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			beneficiaire: 'aa147',
			numrec: '+261 348400278',
			mailrec: 'dd@bb.com',
			loading: false,
			cca2: 'mg',
			haserror: false,
			erreur: '',
			modalVisible: false
		};
	}
	onPressFlag() {
		this.refs.countryPicker.openModal();
	}

	selectCountry(country) {
		this.refs.phone.selectCountry(country.cca2.toLowerCase());
		this.setState({ cca2: country.cca2 });
	}
	updateRecuperation() {
		this.setState({ modalVisible: false });
		this.updateStateRec();
	}

	_isEmptyField() {
		return (
			this.state.beneficiaire == null ||
			this.state.beneficiaire == '' ||
			this.state.numrec == '' ||
			this.state.numrec == null ||
			this.state.mailrec == '' ||
			this.state.mailrec == null
		);
	}
	validatePhone() {
		try {
			this.setState({ haserror: false });
			let value = this.refs.phone.getValue();
			let ret = Utils._parsePhone(value, this.state.cca2);
			if (this.refs.phone.isValidNumber()) {
				this.setState({ numrec: value });
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
			this.setState({ numrec: ret });
		} catch (error) {
			this.setState({ numrec: text });
		}
	}
	componentDidMount() {
		this.setState({
			pickerData: this.refs.phone.getPickerData()
		});
	}
	updateStateRec() {
		let profile = this.props.activity.state.profile;
		let addresse = this.props.activity.state.addresse;
		let account_id = this.props.activity.state.account_id;
		let data = null;
		data = {
			account_id: account_id,
			numadresses: addresse.numadresses,
			rue: addresse.rue,
			lot: addresse.lot,
			codepostal: addresse.codepostal,
			ville: addresse.ville,
			pays: addresse.pays,
			precision_addr: addresse.precision_addr,
			cin: profile.cin,
			image_cin: profile.image_cin,
			avatar: profile.avatar,
			beneficiaire: this.state.beneficiaire,
			numrec: this.state.numrec,
			mailrec: this.state.mailrec,
			pickerResultCin: profile.pickerResultCin,
			pickerResultAvatar: profile.pickerResultAvatar
		};
		this.props.updateRecuperation(data);
	}
	render() {
		return (
			<Content padder contentContainerStyle={{ justifyContent: 'center' }}>
				<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 30 }}>
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
					<Text style={{ color: '#666' }}>Numéro de récupération</Text>
					<View
						style={{
							alignItems: 'center',
							paddingVertical: 20
						}}
					>
						<PhoneInput
							ref="phone"
							onPressFlag={() => this.onPressFlag()}
							onChangePhoneNumber={this.changeTextPhone.bind(this)}
							value={this.state.numrec}
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
					<Text style={{ color: '#666' }}>Mail de récupération</Text>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Mail de récupération"
							keyboardType="email-address"
							style={[loginCss.input, { backgroundColor: 'transparent' }]}
							value={this.state.mailrec}
							onChangeText={mailrec => this.setState({ mailrec })}
							returnKeyType="next"
							onEndEditing={() => {
								this.updateStateRec();
							}}
						/>
					</View>

					<Text style={{ color: '#666' }}>Personne/Compte bénéficiaire en cas de déces</Text>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Personne/Compte bénéficiaire en cas de déces"
							style={[loginCss.input, { backgroundColor: 'transparent' }]}
							onChangeText={beneficiaire => this.setState({ beneficiaire })}
							value={this.state.beneficiaire}
							returnKeyType="next"
							onEndEditing={() => {
								this.updateRecuperation();
							}}
						/>
					</View>
				</View>
			</Content>
		);
	}
}
export default Recuperation;
