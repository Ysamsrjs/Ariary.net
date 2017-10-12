import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
	StatusBar,
	Alert,
	ActivityIndicator
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body } from 'native-base';
import { Notifications } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';
import InscriptionService from '../../../Service/Connexion/InscriptionService';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import UserService from '../../../Service/InfoUser/UserService';
import Utils from '../../../Service/Utilities/Utils';
import configStyles from '../../../styles/css/configStyles';
import loginCss from '../../../styles/css/loginCss';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NotificationService from '../../../Service/Notification/NotificationService';

const deviceWidth = Dimensions.get('window').width;

// create a component
class ProfileAriary extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			data: {
				code: '',
				username: '',
				name: '',
				firstname: '',
				birthday: '',
				mail: '',
				phone: '',
				password: '',
				solde: '0',
				avatar: null
			},
			isTemp: null
		};
	}
	async componentWillMount() {
		try {
			let data = await Utils.getItem('userInfo');
			data = JSON.parse(data);
			let role = UserService.getRoles(data.roles[0]);
			this.setState({ data: data, isTemp: role });
		} catch (error) {
			console.log(error);
		}
	}
	async sendMail(){
		//await NotificationService._sendMail("sujet","sjeanasolo@gmail.com","Test send mail");
	}
	async sendSMS(){
		//await NotificationService._sendSMSFunction();
	}
	loadConfig() {
		UserService.loadConfig(this);
	}
	loadInscription() {
		this.props.navigation.navigate('Inscription', { data: this.state.data.username });
	}
	loadValidCompteConfig() {
		this.props.navigation.navigate('Validation');
	}
	getRoles() {
		let ret = null;
		switch (this.state.isTemp) {
			case 1:
				ret = 'Temporaire';
				break;
			case 2:
				ret = 'Simple';
				break;
			case 3:
				ret = 'Validé';
				break;
		}
		return ret;
	}
	render() {
		return (
			<Container style={{ backgroundColor: '#eee' }}>
				<StatusBar hidden={true} />
				<Header style={{ backgroundColor: '#00BF9A', height: 60 }}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
							<Icon name="bars" size={25} style={{ color: '#FFF' }} />
						</Button>
					</Left>
					<Body>
						<Title>Mon Profil</Title>
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
				<Content>
					<View style={[configStyles.container, { backgroundColor: '#eee' }]}>
						<View style={[configStyles.content, { marginTop: '0%' }]}>
							<View
								style={[
									configStyles.header,
									{ padding: 0, width: '100%', backgroundColor: 'transparent' }
								]}
							>
								<View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
									<View style={loginCss.imageLogin}>
										{this.state.data.avatar == null && (
											<Icon name="user-circle-o" size={100} color="#00BF9A" />
										)}
										{this.state.data.avatar != null && (
											<TouchableOpacity onPress={()=>{
												Alert.alert('ojhhhh')}}>
												<Image
													source={{ uri: this.state.data.avatar }}
													style={{ width: 150, height: 150, borderRadius: 100 }}
												/>
											</TouchableOpacity>
										)}
									</View>
									<Text style={[configStyles.textHeader, { color: '#00BF9A' }]}>
										Solde : {this.state.data.solde}
									</Text>
								</View>
							</View>
							<View style={{ paddingHorizontal: 20 }}>
								<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
									<View style={styles.w1}>
										<Materialcon
											name="done"
											size={20}
											style={{ color: 'rgba(22, 160, 133,1.0)' }}
										/>
									</View>
									<View style={styles.w2}>
										<Text>Compte</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.code}
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
										<Text>Pseudo</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.username}
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
										<Text>Nom</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>{this.state.data.nom}</Text>
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
										<Text>Date de naissance</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.birthday}
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
										<Text>E-mail</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.mail}
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
										<Text>Téléphone</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>
											{this.state.data.phone}
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
										<Text>Type de compte</Text>
									</View>
									<View style={styles.w3}>
										<Text style={{ color: '#666', textAlign: 'right' }}>{this.getRoles()}</Text>
									</View>
								</View>
							</View>
							{this.state.isTemp == 2 && (
								<View style={[configStyles.footer, { flexDirection: 'column' }]}>
									<TouchableOpacity
										onPress={() => this.loadValidCompteConfig()}
										style={[configStyles.touch, { width: '100%', backgroundColor: '#00BF9A' }]}
									>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'center',
												alignContent: 'center'
											}}
										>
											<MaterialIcon
												size={30}
												name="settings"
												style={{ color: 'white', paddingVertical: 10 }}
											/>
											<Text style={[configStyles.touchtext, { color: 'white' }]}>
												Valider mon compte
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							)}
							{this.state.isTemp == 3 && (
								<View style={[configStyles.footer, { flexDirection: 'column' }]}>
									<TouchableOpacity
										onPress={() => this.loadConfig()}
										style={[configStyles.touch, { width: '100%', backgroundColor: '#00BF9A' }]}
									>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'center',
												alignContent: 'center'
											}}
										>
											<MaterialIcon
												size={30}
												name="settings"
												style={{ color: 'white', paddingVertical: 10 }}
											/>
											<Text style={[configStyles.touchtext, { color: 'white' }]}>
												Configurer mon Compte
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							)}
							{this.state.isTemp == 1 && (
								<View style={[configStyles.footer, { flexDirection: 'column' }]}>
									<TouchableOpacity
										onPress={() => this.loadInscription()}
										style={[configStyles.touch, { width: '100%', backgroundColor: '#00BF9A' }]}
									>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'center',
												alignContent: 'center'
											}}
										>
											<Image
												source={require('../../..//assets/images/ariary.png')}
												style={{ width: 25, height: 25, marginVertical: 10 }}
												resizeMode="contain"
											/>
											<Text style={[configStyles.touchtext, { color: 'white' }]}>
												Inscription complète
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>this.sendSMS()}>
										<Text>Send SMS</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=>this.senMain()}>
										<Text>Send Mail</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
					</View>
					{this.state.loading && (
						<View style={configStyles.indicator}>
							<ActivityIndicator size="large" animating={true} color="#666" />
						</View>
					)}
				</Content>
			</Container>
		);
	}
}
const styles = StyleSheet.create({
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
export default ProfileAriary;
