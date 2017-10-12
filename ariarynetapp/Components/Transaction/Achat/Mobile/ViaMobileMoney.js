//import liraries
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
	TextInput,
	ScrollView,
	Image,
	ActivityIndicator,
	AsyncStorage,
	Alert,
	BackHandler,
	Modal
} from 'react-native';
import { Content, Button } from 'native-base';
import FlagResource from '../../../../assets/flags';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import loginCss from '../../../../styles/css/loginCss';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AchatService from '../../../../Service/TransactionService/AchatService';
import UserService from '../../../../Service/InfoUser/UserService';
import Utils from '../../../../Service/Utilities/Utils';
import configStyles from '../../../../styles/css/configStyles';

// create a component
class ViaMobileMoney extends Component {
	constructor() {
		super();
		this.state = {
			montant: '',
			password: '',
			phone: '',
			account_id: '',
			username: '',
			loading: false,
			erreur: null,
			haserror: false,
			result: null,
			count: 0,
			initstate: null,
			interval: null,
			modalVisible: false
		};
	}

	async _proceedSell() {
		try {
			var retour = null;
			var ret = await AchatService._initAchat(this.props.activity, this);
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	validatePhoneNumer() {
		try {
			this.setState({ haserror: false });
			AchatService.validatePhoneNumer(this.state.phone);
			this._renderPasswordView();
		} catch (error) {
			this.setState({ haserror: true, erreur: error.toString() });
		}
	}

	changeTextPhone(text) {
		try {
			var ret = AchatService._parsePhone(text, 'mg');
			this.setState({ phone: ret });
		} catch (error) {
			this.setState({ phone: text });
		}
	}
	async componentWillMount() {
		try {
			const dataUser = await Utils.getItem('dataUser');
			if (dataUser == null) {
				this.props.navigation.navigate('Loader');
			}
			let userData = JSON.parse(dataUser);
			this.setState({
				account_id: userData.code,
				username: userData.pseudo
			});
			this.setState({ data: userData });
		} catch (error) {
			Alert.alert('Erreur', error.message);
		}
	}
	_confirmAchat() {
		Alert.alert('Confirmation', "Voulez-vous bien confirmer l'achat de  " + this.state.montant + ' Ariary ?', [
			{ text: 'Annuller', onPress: () => this.props.activity.props.navigation.navigate('Profile') },
			{ text: 'Je Confirme', onPress: () => this._proceedSell() }
		]);
	}

	_renderPasswordView() {
		if (
			this.state.montant != '' &&
			this.state.phone != null &&
			this.state.montant != null &&
			this.state.phone != ''
		)
			this.setState({ modalVisible: true });
		else {
			Alert.alert('Info', 'Veuillez compléter les information démandées avant de valider');
		}
	}

	async closeModal() {
		try {
			await UserService.verifyUser(this.state.username, this.state.password, this);
			await this._proceedSell();
			this.setState({ modalVisible: false });
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	render() {
		return (
			<Content padder contentContainerStyle={{ justifyContent: 'center' }}>
				<View
					style={{
						justifyContent: 'center',
						alignContent: 'center',
						padding: 15
					}}
				>
					<View style={{ alignContent: 'center' }}>
						<Text style={{ fontWeight: '900', textAlign: 'center', color: '#777' }}>
							Avec Ariary.net, acheter des bond d'achat via votre mobile mobile money
						</Text>
					</View>
					<View>
						{this.state.haserror && (
							<Text style={{ color: 'red', textAlign: 'center', padding: 20 }}>{this.state.erreur}</Text>
						)}
					</View>
					<View style={loginCss.inputWrap}>
						<View style={loginCss.iconWrap}>
							<Image
								style={{ width: 20, height: 20 }}
								source={require('../../../../assets/images/ariary.png')}
								resizeMode="contain"
							/>
						</View>
						<TextInput
							ref="amount"
							placeholder="en Ariary(1 Bon = 1 Ariary)"
							keyboardType="numeric"
							style={loginCss.input}
							autoFocus={false}
							value={this.state.montant}
							onChangeText={montant => this.setState({ montant })}
							returnKeyType="next"
						/>
					</View>

					<View style={loginCss.inputWrap}>
						<View style={loginCss.iconWrap}>
							<Image
								source={FlagResource.get('mg')}
								style={{
									height: 18,
									width: 25,
									borderRadius: 2,
									borderWidth: 0.5,
									borderColor: '#cecece',
									backgroundColor: '#cecece'
								}}
							/>
						</View>
						<TextInput
							ref="phoneNumber"
							placeholder="Numéro téléphone(MVola,Airtel Money,Orange Money"
							keyboardType="numeric"
							style={loginCss.input}
							value={this.state.phone}
							onChangeText={this.changeTextPhone.bind(this)}
							onEndEditing={this.validatePhoneNumer.bind(this)}
						/>
					</View>
					<View style={loginCss.seperator} />
					<View style={{ alignItems: 'flex-end' }}>
						<Button
							success
							onPress={() => this._renderPasswordView()}
							style={{ alignSelf: 'center', padding: 20 }}
						>
							<Text style={{ color: '#ffffff', fontWeight: '800' }}>Valider</Text>
						</Button>
					</View>
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setState({ modalVisible: false });
					}}
				>
					<TouchableOpacity
						onPress={() => this.setState({ modalVisible: false })}
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'rgba(0,0,0,0.4)'
						}}
					>
						<View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10 }}>
							<View
								style={{
									alignItems: 'center',
									backgroundColor: '#eee',
									paddingVertical: 20,
									borderTopLeftRadius: 10,
									borderTopRightRadius: 10
								}}
							>
								<Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>
									Entrer votre mot de passe pour confirmer l'achat de {this.state.montant} Ariary
								</Text>
							</View>
							<View style={[{ padding: 10, height: 60 }]}>
								<TextInput
									placeholder="Mot de passe de confirmation"
									autoFocus={true}
									secureTextEntry
									style={[loginCss.input, { textAlign: 'center', borderRadius: 10, height: 50 }]}
									onChangeText={password => {
										this.setState({ password: password });
									}}
									onEndEditing={() => {
										this.closeModal();
									}}
								/>
							</View>
						</View>
					</TouchableOpacity>
					{this.state.loading && (
						<View style={configStyles.indicator}>
							<ActivityIndicator size="large" animating={true} color="#666" />
						</View>
					)}
				</Modal>
			</Content>
		);
	}
}
//make this component available to the app
export default ViaMobileMoney;
