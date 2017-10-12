//import liraries
import React, { Component } from 'react';
import {
	Container,
	Header,
	Title,
	Button,
	Tabs,
	Tab,
	Right,
	Left,
	Body,
	TabHeading,
	Footer,
	FooterTab,
	Content
} from 'native-base';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	TextInput,
	ScrollView,
	Image,
	ActivityIndicator,
	AsyncStorage,
	Alert,
	BackHandler,
	StatusBar,
	Modal
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import loginCss from '../../../styles/css/loginCss';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Utils from '../../../Service/Utilities/Utils';
import UserService from '../../../Service/InfoUser/UserService';
import configStyles from '../../../styles/css/configStyles';

const BASE_URL = 'http://54.229.79.45/ariary2API/web/api/';

import styles from './style';
// create a component
class Offrir extends Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			amount: 0,
			recipient: '',
			password: '',
			sender: '',
			erreur: '',
			balence: '',
			modalVisible: false
		};
	}
	async componentWillMount() {
		try {
			let dataUser = await Utils.getItem('dataUser');
			if (dataUser == null) {
				this.props.navigation.navigate('Loader');
			}
			let userData = await JSON.parse(dataUser);
			this.setState({
				sender: userData.code
			});
		} catch (error) {
			console.log(error);
		}
	}

	_cancelTransfer() {
		this.props.navigation.navigate('Profile');
	}

	_confirmTransfer() {
		if (!this._isEmptyField()) {
			Alert.alert(
				'Confirmation',
				'Voulez-vous  transferer ' + this.state.amount + ' au numéro de compte ' + this.state.sender + ' ?',
				[
					{ text: 'Annuller', onPress: () => _cancelTransfer() },
					{ text: 'Je Confirme', onPress: () => this._validerOffre() }
				]
			);
		} else {
			this.setState({ loading: false });
			Alert.alert('Erreur survennue', 'Tous les champs sont requis');
		}
	}
	_onsSuccess(amount, solde) {
		Alert.alert(
			'Felicitation',
			'Vous  venez de tranferer  ' +
				mount +
				' au numéro de compte ' +
				this.state.sender +
				'. Votre solde est de ' +
				solde +
				'Ariary'
		);
	}
	_isEmptyField() {
		return this._isEmptyAmount() || this._isEmptyRecipient();
	}
	_isEmptyAmount() {
		return this.state.amount == null || this.state.amount == '';
	}
	_isEmptyRecipient() {
		return this.state.recipient == null || this.state.recipient == '';
	}
	_isEmptyPassword() {
		return this.state.password == null || this.state.password == '';
	}
	async _validerOffre() {
		let url = BASE_URL + 'transaction';
		try {
			await UserService._validerOffre(this);
			this.props.navigation.navigate('Offrir');
		} catch (error) {
			Alert.alert('Erreur survennue', error);
		}
	}
	async loadConfig() {
		await UserService.loadConfig(this);
	}

	_renderPasswordView() {
		if (!this._isEmptyField()) {
			this.setState({ modalVisible: true });
		} else {
			Alert.alert('Info', "Veuillez compléter les informations démandées s'il vous plait");
		}
	}

	async closeModal() {
		try {
			await UserService.verifyUser(this.state.username, this.state.password, this);
			await this._validerOffre();
			this.setState({ modalVisible: false });
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	render() {
		return (
			<Container style={styles.container}>
				<StatusBar hidden={true} />
				<Header style={{ backgroundColor: '#00BF9A', height: 60 }}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
							<Icon name="bars" size={25} style={{ color: '#FFF' }} />
						</Button>
					</Left>
					<Body>
						<Title>Offrir</Title>
					</Body>
					<Right>
						<Button transparent onPress={() => Utils.ShareApp()}>
							<Icon name="share-alt" size={25} style={{ color: '#FFF' }} />
						</Button>
						<Button transparent onPress={() => this.loadConfig()}>
							<MaterialIcon size={30} name="settings" style={{ color: '#FFF' }} />
						</Button>
					</Right>
				</Header>
				<Content padder contentContainerStyle={{justifyContent: 'center' }}>
					<View
						style={{
							justifyContent: 'center',
							alignContent: 'center',
							flex: 1,
							padding: 15
						}}
					>
						<View style={{ alignContent: 'center' }}>
							<Text style={{ fontWeight: '900', textAlign: 'center', color: '#00BF9A' }}>
								Offrir à des amis
							</Text>
						</View>
						<View style={loginCss.inputWrap}>
							<View style={loginCss.iconWrap}>
								<Image
									style={{ width: 20, height: 20 }}
									source={require('../../../assets/images/ariary.png')}
									resizeMode="contain"
								/>
							</View>
							<TextInput
								placeholder="Montant en Ariary"
								keyboardType="numeric"
								style={loginCss.input}
								autoFocus={false}
								onChangeText={amount => this.setState({ amount })}
								returnKeyType="next"
							/>
						</View>
						<View style={loginCss.inputWrap}>
							<View style={loginCss.iconWrap}>
								<Icon name="user" size={20} color="#00BF9A" />
							</View>
							<TextInput
								ref="recipient"
								placeholder="Compte du beneficiaire"
								onChangeText={recipient => this.setState({ recipient })}
								style={loginCss.input}
							/>
						</View>
						<View style={loginCss.inputWrap}>
							<View style={loginCss.iconWrap}>
								<Icon name="edit" size={20} color="#00BF9A" />
							</View>
							<TextInput
								multiline={true}
								numberOfLines={10}
								placeholder="Comentaire"
								onChangeText={message => this.setState({ message })}
								style={loginCss.input}
								onEndEditing={() => {
									this._renderPasswordView();
								}}
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
							<View style={{ flex: 1 }} />
						</View>
					</View>
				</Content>

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
									Entrer votre mot de passe pour confirmer le transferer de {this.state.amount} Ariary au numéro de
									compte {this.state.sender}
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
			</Container>
		);
	}
}

// define your styles
const test = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50'
	}
});

//make this component available to the app
export default Offrir;
