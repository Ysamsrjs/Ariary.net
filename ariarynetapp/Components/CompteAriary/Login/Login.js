import React from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Dimensions,TextInput,ScrollView,Image,ActivityIndicator,AsyncStorage,Alert,StatusBar,} from 'react-native';
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import loginCss from '../../../styles/css/loginCss';
import Expo from 'expo';

import AuthentificationService from '../../../Service/Connexion/AuthentificationService';

const APP_ID = '1607718472619122';

// create a component
class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			message: '',
			loading: false
		};
	}
	componentDidMount() {
		
	}
	async _login() {
		this.setState({loading:true});
		try {
			let dataUser = null;
			if (!this._isEmptyField()) {
				dataUser = {
					username: this.state.username,
					password: this.state.password
				};
				await AuthentificationService._loginUser(dataUser, this);
			} else {
				Alert.alert('Erreur de connexion', 'Veuillez compléter tous les champs');
			}
		} catch (error) {
			Alert.alert('Erreur de connexion', error);
		}
		this.setState({loading:false});
	}
	_isEmptyField() {
		return (
			this.state.username == null ||
			this.state.password == null ||
			this.state.username == '' ||
			this.state.password == ''
		);
	}
	Cancel() {
		this.props.navigation.navigate('StartAriary');
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{ justifyContent: 'center', alignContent: 'center',width:'90%', backgroundColor: '#eee'}}>
					<View style={{ backgroundColor: '#00BF9A', padding: 15}}>
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<View style={loginCss.imageLogin}>
								<Icon name="user-circle-o" size={130} color="#FFF" />
							</View>
							<View style={[loginCss.imageLogin, { paddingVertical: 10 }]}>
								<Text style={[loginCss.textforgot, { fontSize: 18, color: '#ffffff' }]}>
									Connexion Ariary.net
								</Text>
							</View>
						</View>
					</View>
					<View style={{ padding: 15 }}>
						<TextInput
							placeholder="pseudo ou email"
							onChangeText={username => this.setState({ username })}
							style={{ height: 50, textAlign: 'center' }}
							returnKeyType="done"
						/>
					</View>
					<View style={{ padding: 15 }}>
						<TextInput
							placeholder="entrez votre mot de passe"
							secureTextEntry
							onChangeText={password => this.setState({ password })}
							style={{ height: 50, textAlign: 'center' }}
							secureTextEntry={true}
							returnKeyType="done"
							onEndEditing={()=>{
								this._login();
							}}
						/>
					</View>
					<View style={{ flexDirection: 'row', padding: 15, alignContent: 'center' }}>
						<TouchableOpacity
							onPress={() => this.Cancel()}
							style={{ width: '49%', backgroundColor: '#00BF9A', marginRight: '1%' }}
						>
							<Text style={{ textAlign: 'center', padding: 15,color:'#fff' }}>Annuler</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this._login()}
							style={{ width: '49%', backgroundColor: '#00BF9A', marginLeft: '1%' }}
						>
							<Text style={{ textAlign: 'center', padding: 15,color:'#fff' }}>Se connecter</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={[loginCss.toutchable, { marginVertical: 15 }]}
						onPress={() => {
							this.props.navigation.navigate('MainInscription',{data:null});
						}}
					>
						<View
							style={[
								loginCss.instructions,
								{
									justifyContent: 'center',
									alignItems: 'center'
								}
							]}
						>
							<Text style={[loginCss.textforgot, { color: '#666', fontSize: 12 }]}>
								Je n'ai pas de compte
							</Text>
							<Text style={{ paddingHorizontal: 3 }} />
							<Text style={[loginCss.textforgot, { fontSize: 25 }]}>S'inscrire</Text>
						</View>
					</TouchableOpacity>
					<Text style={{alignSelf:'center',color:'#666',padding:10}}>ariary.net@2017 | paiement en ligne</Text>
				</View>
				{this.state.loading && (
					<View
						style={{
							backgroundColor: 'rgba(44, 62, 80,0.4)',
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
		);
	}
}

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(54,34,30,0.4)'
	}
});

//make this component available to the app
export default Login;
