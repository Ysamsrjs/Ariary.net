//import liraries
import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	StatusBar,
	Text,
	Platform,
	TouchableOpacity,
	Image,
	Alert,
	RefreshControl
} from 'react-native';
import { Container, Header, Title, Content, Button, ListItem, Icon, Left, Right, Body, Separator } from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import loginCss from '../../../styles/css/loginCss';
import UserService from '../../../Service/InfoUser/UserService';
import Utils from '../../../Service/Utilities/Utils';

// create a component
class MainConfig extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			ispinner: false,
			data: {
				code: '',
				mail: '',
				nom: '',
				phone: '',
				solde: '',
				username: '',
				birthday: '',
				roles: ''
			},
			params: null,
			allparams: null,
			isTemp: true
		};
	}

	onValueChange(value) {
		this.setState({
			selected1: value
		});
	}
	async componentWillMount() {
		this.setState({ loading: true });
		let data = this.props.navigation.state.params.dataUser;
		this.setState({ data: data.dataUser, params: data.params, isTemp: data.isTemp, allparams: data });
		this.setState({ loading: false });
	}
	async setDataOnrefresh() {
		try {
			const dataUser = await Utils.getItem('dataUser');
			let userData = JSON.parse(dataUser);
			let account_id = userData.code;
			const userinfo = await UserService.getUserInfo(account_id, this);
			let test = userinfo.roles[0];
			let params = {
				account_id: userinfo.code,
				pseudo: userinfo.username
			};
			this.setState({
				data: userinfo,
				isTemp: UserService.getRoles(test),
				params: params
			});
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	async _onRefresh() {
		this.setState({ ispinner: true });
		await this.setDataOnrefresh();
		this.setState({ ispinner: false });
	}
	render() {
		return (
			<Container style={styles.container} contentContainerStyle={{ justifyContent: 'center' }}>
				<StatusBar hidden={true} />
				<Header style={styles.header}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
							<FontIcon name="bars" size={25} style={{ color: '#FFF' }} />
						</Button>
					</Left>
					<Body>
						<Title>Paramètres</Title>
					</Body>
					<Right>
						<Button transparent onPress={() => Utils.ShareApp()}>
							<FontIcon name="share-alt" size={25} style={{ color: '#FFF' }} />
						</Button>
					</Right>
				</Header>
				<Content
					contentContainerStyle={{ justifyContent: 'center' }}
					refreshControl={
						<RefreshControl refreshing={this.state.ispinner} onRefresh={this._onRefresh.bind(this)} />
					}
				>
					{this.state.isTemp == 2 && (
						<View>
							<ListItem>
								<Text
									style={{
										alignSelf: 'center',
										padding: 15,
										textAlign: 'center',
										color: '#fff',
										backgroundColor: '#81D4FA'
									}}
								>
									Actuellement, vous pouvez déjà acheter des bons d'achat, payer en ligne ou en
									envoyer à vos amis. Mais pour pouvoir recevoir des bons d'achat, il vous faudra
									valider votre compte.
								</Text>
							</ListItem>
						</View>
					)}
					{this.state.isTemp == 1 && (
						<ListItem>
							<Text
								style={{
									alignSelf: 'center',
									padding: 15,
									textAlign: 'center',
									color: '#fff',
									backgroundColor: '#81D4FA'
								}}
							>
								Actuellement, vous utilisez un compte temporaire. Pour l'instant, vous pouvez recevoir
								de l'argent. Veuillez completer vos informations pour bénéficier tous les services d'
								Ariary.net.
							</Text>
						</ListItem>
					)}
					<ListItem itemDivider>
						<Text style={{ alignSelf: 'flex-end', fontSize: 18, color: '#666', paddingRight: 15 }}>
							Compte Ariary
						</Text>
					</ListItem>

					<ListItem padder icon>
						<Left>
							<Image
								source={require('../../../assets/images/ariary.png')}
								style={{ width: 25, height: 25 }}
								resizeMode="contain"
							/>
						</Left>
						<Body>
							<View>
								<Text>Numéro de compte</Text>
								<Text style={{ color: '#666', fontSize: 12 }}>{this.state.data.code}</Text>
							</View>
						</Body>
						<Right />
					</ListItem>
					<ListItem padder icon>
						<Left>
							<View>
								<MaterialIcon size={25} color="#00BF9A" name="person" />
							</View>
						</Left>
						<Body>
							<View>
								<Text>Nom</Text>
								<Text style={{ color: '#666', fontSize: 12 }}>{this.state.data.nom}</Text>
							</View>
						</Body>
						{this.state.isTemp != 1 && (
							<Right>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate('EditName', this.state.params)}
									style={{ backgroundColor: 'transparent' }}
								>
									<Text style={{ color: 'rgba(52, 152, 219,1.0)', fontWeight: '900' }}>Editer</Text>
								</TouchableOpacity>
							</Right>
						)}
					</ListItem>
					<ListItem padder icon>
						<Left>
							<Image
								source={require('../../.././assets/images/ariary.png')}
								style={{ width: 25, height: 25 }}
								resizeMode="contain"
							/>
						</Left>
						<Body>
							<View>
								<Text>Mon Solde</Text>
								<Text style={{ color: '#666', fontSize: 12 }}>{this.state.data.solde} Ariary</Text>
							</View>
						</Body>
					</ListItem>

					<ListItem itemDivider>
						<Text style={{ alignSelf: 'flex-end', fontSize: 18, color: '#666', paddingRight: 15 }}>
							Configuration du compte
						</Text>
					</ListItem>
					<ListItem padder icon>
						<Left>
							<Button style={{ backgroundColor: '#00BF9A' }}>
								<MaterialIcon size={20} color="#fff" name="person" />
							</Button>
						</Left>
						<Body>
							<View>
								<Text>Pseudo</Text>
								<Text style={{ color: '#666', fontSize: 12 }}>{this.state.data.username}</Text>
							</View>
						</Body>
						{this.state.isTemp != 1 && (
							<Right>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate('EditPseudo', this.state.params)}
									style={{ backgroundColor: 'transparent' }}
								>
									<MaterialIcon primary size={25} color="rgba(52, 152, 219,1.0)" name="mode-edit" />
								</TouchableOpacity>
							</Right>
						)}
					</ListItem>
					<View style={{ marginVertical: 5 }} />

					<ListItem padder icon>
						<Left>
							<Button style={{ backgroundColor: '#FF9501' }}>
								<MaterialIcon size={20} color="#fff" name="mail" />
							</Button>
						</Left>
						<Body>
							<View>
								<Text>Email</Text>
								<Text style={{ color: '#666', fontSize: 12 }}>{this.state.data.mail}</Text>
							</View>
						</Body>
						{this.state.isTemp != 1 && (
							<Right>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate('EditMail', this.state.params)}
								>
									<MaterialIcon primary size={25} color="rgba(52, 152, 219,1.0)" name="mode-edit" />
								</TouchableOpacity>
							</Right>
						)}
					</ListItem>
					<View style={{ marginVertical: 5 }} />

					<ListItem padder icon>
						<Left>
							<Button style={{ backgroundColor: '#4CDA64' }}>
								<MaterialIcon size={20} color="#fff" name="call" />
							</Button>
						</Left>
						<Body>
							<View>
								<Text>Tél</Text>
								<Text style={{ color: '#666', fontSize: 12 }}>{this.state.data.phone}</Text>
							</View>
						</Body>
						{this.state.isTemp != 1 && (
							<Right>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate('EditPhone', this.state.params)}
								>
									<MaterialIcon primary size={25} color="rgba(52, 152, 219,1.0)" name="mode-edit" />
								</TouchableOpacity>
							</Right>
						)}
					</ListItem>

					<View style={{ marginVertical: 5 }} />

					<ListItem padder icon>
						<Left>
							<Button style={{ backgroundColor: '#4CDA64' }}>
								<MaterialIcon size={20} color="#fff" name="call" />
							</Button>
						</Left>
						<Body>
							<View>
								<Text>Date de naissance</Text>
								<Text style={{ color: '#666', fontSize: 12 }}>{this.state.data.birthday}</Text>
							</View>
						</Body>
					</ListItem>

					<View style={{ marginVertical: 5 }} />

					<ListItem contentContainerStyle={{ paddingVertical: 5 }} icon>
						<Left>
							<Button style={{ backgroundColor: 'rgba(231, 76, 60,1.0)' }}>
								<MaterialIcon size={20} color="#fff" name="lock" />
							</Button>
						</Left>
						<Body>
							<View>
								<Text>Mot de passe</Text>
								<Text style={{ color: '#666', fontSize: 12, fontWeight: '900' }}>......</Text>
							</View>
						</Body>
						{this.state.isTemp != 1 && (
							<Right>
								<TouchableOpacity
									onPress={() =>
										this.props.navigation.navigate('EditPassword', { data: this.state.params })}
								>
									<MaterialIcon primary size={25} color="rgba(52, 152, 219,1.0)" name="mode-edit" />
								</TouchableOpacity>
							</Right>
						)}
					</ListItem>

					{this.state.isTemp != 3 && (
						<ListItem itemDivider>
							<Text style={{ alignSelf: 'flex-end', fontSize: 18, color: '#666', paddingRight: 15 }}>
								Avancée
							</Text>
						</ListItem>
					)}
					{this.state.isTemp == 1 && (
						<ListItem
							onPress={() => this.props.navigation.navigate('Inscription', { data: this.state.pseudo })}
						>
							<Body>
								<View>
									<Text>Inscription Ariary.net</Text>
									<Text style={{ color: '#666', fontSize: 12 }}>
										Veuillez completer votre inscription en vous inscrivant sur Ariary.net
									</Text>
								</View>
							</Body>
							<Right>
								<TouchableOpacity>
									<MaterialIcon size={40} color="#666" name="keyboard-arrow-right" />
								</TouchableOpacity>
							</Right>
						</ListItem>
					)}
					{this.state.isTemp == 2 && (
						<View>
							<ListItem onPress={() => this.props.navigation.navigate('Validation')}>
								<Body>
									<View>
										<Text>Validation compte</Text>
										<Text style={{ color: '#666', fontSize: 12 }}>
											Pour bénéficier de tous les services,veuillez compléter vos informations et
											valider votre compte
										</Text>
									</View>
								</Body>
								<Right>
									<TouchableOpacity>
										<MaterialIcon size={40} color="#666" name="keyboard-arrow-right" />
									</TouchableOpacity>
								</Right>
							</ListItem>
						</View>
					)}
				</Content>
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
export default MainConfig;
