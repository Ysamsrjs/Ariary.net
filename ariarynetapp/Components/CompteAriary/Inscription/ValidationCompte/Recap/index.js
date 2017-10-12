import React from 'react';
import {
	StyleSheet,
	TextInput,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
	StatusBar,
	Alert,
	ActivityIndicator,
	Modal
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body } from 'native-base';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/FontAwesome';
import InscriptionService from '../../../../../Service/Connexion/InscriptionService';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import UserService from '../../../../../Service/InfoUser/UserService';
import loginCss from '../../../../../styles/css/loginCss';

// create a component
class ValidationCompte extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			data: {
				account_id: '',
				numadresses: '',
				rue: '',
				lot: '',
				codepostal: '',
				ville: '',
				pays: '',
				precision_addr: '',
				cin: '',
				image_cin: '',
				avatar: '',
				beneficiaire: '',
				numrec: '',
				mailrec: ''
			},
			password: '',
			modalVisible: false,
			username: ''
		};
	}
	async closeModal() {
		try {
			await UserService.verifyUser(this.state.username, this.state.password, this);
			await this._saveUserValidation();
			this.setState({ modalVisible: false });
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	_renderPasswordView() {
		this.setState({ modalVisible: true });
	}
	componentWillMount() {
		let data = this.props.navigation.state.params.data;
		let pseudo = this.props.navigation.state.params.pseudo;
		this.setState({ data: data, username: pseudo });
	}
	loadConfig() {
		this.props.navigation.navigate('Profile',{avatar:null});
	}
	async _saveUserValidation() {
		this.setState({ loading: false });
		try {
			await InscriptionService._saveUserValidation(this.state.data, this);
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		} finally {
			this.setState({ loading: false });
		}
	}

	render() {
		return (
			<Container style={{ backgroundColor: '#eee' }}>
				<StatusBar hidden={true} />
				<View style={styles.container}>
					<View
						style={{
							justifyContent: 'center',
							alignContent: 'center',
							width: deviceWidth - 10,
							backgroundColor: '#eee'
						}}
					>
						<View style={{ padding: 15, backgroundColor: 'green' }}>
							<Text style={{ textAlign: 'center', textAlign: 'center', fontSize: 25, color: '#fff' }}>
								Validation Compte Info
							</Text>
						</View>
						<View style={{ height: deviceHeight - 150 }}>
							<Content padder>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View
										style={{
											width: '48%',
											marginRight: '2%',
											backgroundColor: 'black'
										}}
									>
										<Image
											source={{ uri: this.state.data.pickerResultCin.uri }}
											style={{ width: '100%', height: 150 }}
										/>
										<Text style={{ textAlign: 'center', color: 'white' }}>cin/passport</Text>
									</View>
									<View
										style={{
											width: '48%',
											marginLeft: '2%',
											backgroundColor: 'black'
										}}
									>
										<Image
											source={{ uri: this.state.data.pickerResultAvatar.uri }}
											style={{ width: '100%', height: 150 }}
										/>
										<Text style={{ textAlign: 'center', color: 'white' }}>Profil</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>CIN ou Passport</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>{this.state.data.cin}</Text>
									</View>
								</View>
								{/**
									 * Info Pays
									 */}
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Pays</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.pays}
										</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Code postale</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.codepostal}
										</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Ville</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.ville}
										</Text>
									</View>
								</View>
								{/**
									 * Adresse du client 
									 */}
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Rue</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>{this.state.data.rue}</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Lot</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>{this.state.data.lot}</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Numéro d'adresse</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.numadresses}
										</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Précision adresse</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.precision_addr}
										</Text>
									</View>
								</View>
								{/* /**
								 * Récupération compte
								 */}
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Numéro de récupération</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.numrec}
										</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Mail de récupération</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.mailrec}
										</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Bénéficiaire</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.beneficiaire}
										</Text>
									</View>
								</View>
							</Content>
						</View>
						<View style={{ flexDirection: 'row', padding: 15, alignContent: 'center' }}>
							<TouchableOpacity
								onPress={() => this.loadConfig()}
								style={{ width: '49%', backgroundColor: '#fff', marginRight: '1%' }}
							>
								<Text style={{ textAlign: 'center', padding: 15 }}>Annuler</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => this._renderPasswordView()}
								style={{ width: '49%', backgroundColor: '#fff', marginLeft: '1%' }}
							>
								<Text style={{ textAlign: 'center', padding: 15 }}>Valider</Text>
							</TouchableOpacity>
						</View>
					</View>
					{this.state.loading && (
						<View
							style={{
								backgroundColor: 'rgba(44, 62, 80,0.1)',
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
					)}
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
									Entrer votre mot de passe pour confirmer la validation de votre compte
								</Text>
							</View>
							<View style={[loginCss.inputWrap, { padding: 10, height: 60 }]}>
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
						<View
							style={{
								backgroundColor: 'rgba(44, 62, 80,0.8)',
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
							<ActivityIndicator size="large" animating={true} color="#FFF" />
							<Text style={{ textAlign: 'center', fontWeight: '900', fontSize: 20, color: '#FFF' }}>
								Mis à jour de compte encours...
							</Text>
							<Text style={{ textAlign: 'center', fontWeight: '900', fontSize: 20, color: '#FFF' }}>
								L'operation peut prendre quelques minutes. Veuillez patienter s'il vous plait!!!
							</Text>
						</View>
					)}
				</Modal>
			</Container>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(54,34,30,0.4)'
	},
	w1: {
		width: '10%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	w2: {
		width: '40%'
	},
	w3: {
		width: '50%'
	}
});

//make this component available to the app
export default ValidationCompte;
