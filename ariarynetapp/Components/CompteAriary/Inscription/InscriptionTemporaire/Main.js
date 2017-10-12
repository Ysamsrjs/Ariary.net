import React, { Component } from 'react';
import {
	StatusBar,
	View,
	TouchableHighlight,
	Dimensions,
	Image,
	ScrollView,
	TextInput,
	AsyncStorage,
	Alert,
	Text,
	ActivityIndicator
} from 'react-native';
import { Container, Header, Title, Content, Button, Footer, FooterTab, Body, Left, Right } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import loginCss from '../../../../styles/css/loginCss';
import styles from './styles';
import Utils from '../../../../Service/Utilities/Utils';
import InscriptionService from '../../../../Service/Connexion/InscriptionService';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pseudo: '',
			phoneNumber: '',
			password: '',
			confpassword: '',
			email: '',
			compte: '',
			solde: 500,
			error: '',
			haserror: false,
			loading: false
		};
	}

	loadInscription(){
		this.props.navigation.navigate('MainInscription',{data:null});
	}
	componentDidMount() {
		this.setState({
			email: this.state.pseudo + '@ariary.net'
		});
	}

	async _loginTemp() {
		if (this._isEmptyField()) {
			try {
				await InscriptionService._registrationTemporaire(this);
			} catch (error) {
				Alert.alert("Erreur d'inscription", error);
			}
		} else {
			Alert.alert('Erreur','Tous les champs sont requis');
		}
	}
	Profile(){
		this.props.navigation.navigate('MainIscription',{data:null});
	}
	_isEmptyField() {
		return (
			this.state.pseudo != null ||
			this.state.password != null ||
			this.state.pseudo != '' ||
			this.state.confpassword != null ||
			this.state.confpassword != '' ||
			this.state.password != ''
		);
	}
	_validatePass() {
		try {
			Utils._isValidPass(this.state.password);
			this.setState({ haserror: false });
		} catch (error) {
			this.setState({ haserror: true, error: error });
		}
	}
	_confirmPass() {
		if (this.state.password == this.state.confpassword) {
			this.setState({ haserror: false });
		} else {
			this.setState({ haserror: true, error: 'Les mots de passe ne correspondent pas' });
		}
	}

	render() {
		return (
			<Container style={styles.container}>
				<StatusBar hidden={true} />
				<Header style={styles.header}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate('Loader')}>
							<Materialcon name="arrow-back" color="#fff" size={30} style={{ fontWeight: '900' }} />
						</Button>
					</Left>
					<Body>
						<Title>Ariary.net</Title>
					</Body>
					<Right>
						<Button transparent>
							<Materialcon name="help" color="#FFF" size={30} style={{ fontWeight: '900' }} />
						</Button>
					</Right>
				</Header>
				<Content padder contentContainerStyle={{ justifyContent: 'center' }}>
					<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
						<View style={{ backgroundColor: '#FFF', padding: 15, width: '100%' }}>
							<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
								<View style={loginCss.imageLogin}>
									<Icon name="user-circle-o" size={130} color="#009688" />
								</View>
								<View>
									<Text style={{ fontSize: 20, padding: 5, textAlign: 'center', color: '#009688' }}>
										Debuter avec Ariary.net
									</Text>
								</View>
							</View>
						</View>
						{this.state.haserror && (
							<Text style={{ alignSelf: 'center', color: 'red', textAlign: 'center' }}>
								{this.state.error}
							</Text>
						)}
						<Text style={{ alignSelf: 'flex-end', color: '#666' }}>Pseudo</Text>
						<View style={loginCss.inputWrap}>
							<View style={loginCss.iconWrap}>
								<View style={loginCss.iconWrap}>
									<Icon name="user" size={20} color="#00BF9A" />
								</View>
							</View>
							<TextInput
								placeholder="Pseudo"
								value={this.state.pseudo}
								style={loginCss.input}
								autoFocus={false}
								onChangeText={pseudo => this.setState({ pseudo })}
								returnKeyType="next"
							/>
						</View>
						<Text style={{ alignSelf: 'flex-end', color: '#666' }}>Mot de passe</Text>
						<View style={loginCss.inputWrap}>
							<View style={loginCss.iconWrap}>
								<Materialcon name="lock" size={20} color="#00BF9A" />
							</View>
							<TextInput
								placeholder="Mot de passe"
								onChangeText={password => this.setState({ password })}
								secureTextEntry
								style={loginCss.input}
								onEndEditing={() => {
									this._validatePass();
								}}
							/>
						</View>
						<Text style={{ alignSelf: 'flex-end', color: '#666' }}>Confirmer mot de passe</Text>
						<View style={loginCss.inputWrap}>
							<View style={loginCss.iconWrap}>
								<Materialcon name="lock" size={20} color="#00BF9A" />
							</View>
							<TextInput
								placeholder="Confirmer Mot de passe"
								onChangeText={confpassword => this.setState({ confpassword })}
								secureTextEntry
								style={loginCss.input}
								onEndEditing={() => {
									this._confirmPass();
								}}
							/>
						</View>
						<View style={{ alignItems: 'center' }}>
							<Button
								success
								onPress={() => this._loginTemp()}
								style={{ alignSelf: 'center', padding: 20 }}
							>
								<Text style={{ color: '#ffffff', fontWeight: '900', paddingRight: 5 }}>Continuer</Text>
								<Icon name="arrow-right" color="#FFF" />
							</Button>
						</View>
						<View style={{ alignItems: 'center',margin:20 }}>
							<Button
								transparent
								onPress={() => this.loadInscription()}
								style={{ alignSelf: 'center', padding: 20 }}
							>
								<Text style={{ color: '#ffffff',paddingRight: 5,color:'#00BF9A',fontSize:25}}>S'inscrire</Text>
							</Button>
							<View style={{ flex: 1 }} />
						</View>
					</View>
				</Content>
				{this.state.loading && (
					<View
						style={{
							backgroundColor: 'rgba(44, 62, 80,0.7)',
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
							Enregistrement encours...
						</Text>
					</View>
				)}
			</Container>
		);
	}
}

export default Main;
