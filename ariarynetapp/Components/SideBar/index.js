import React, { Component } from 'react';
import { Image, View, AsyncStorage, Alert } from 'react-native';
import { Notifications } from 'expo';
import {
	Content,
	Text,
	List,
	ListItem,
	Container,
	Left,
	Right,
	Badge,
	Button,
	StyleProvider,
	getTheme,
	variables
} from 'native-base';

import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import Utils from '../../Service/Utilities/Utils';

const datas = [
	{
		name: 'Mon Profil',
		route: 'Profile',
		icon: 'user',
		bg: '#DA4437'
	},
	{
		name: "Achat bons d'achat",
		route: 'Achat',
		icon: 'shopping-bag',
		bg: '#C5F442'
	},
	{
		name: 'Offrir à un ami',
		route: 'Offrir',
		icon: 'handshake-o',
		bg: '#C5F442'
	},
	{
		name: 'A propos',
		route: 'Profile',
		icon: 'info',
		bg: '#477EEA'
	},
	{
		name: 'Se Deconnecter',
		route: 'Deconnexion',
		icon: 'sign-out',
		bg: '#477EEA'
	}
];
class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
			nom: '',
			username: '',
			solde: '',
			message: '',
			code: '',
			data: null,
			count: 0,
			notification: null
		};
	}
	async componentWillMount() {
		try {
			this._notificationSubscription = Notifications.addListener(this._handleNotification);
			const dataUser = await Utils.getItem('dataUser');
			if (dataUser == null) {
				this.props.navigation.navigate('Loader');
			}
			let userData = JSON.parse(dataUser);
			this.setState({
				code: userData.code,
				username: userData.pseudo
			});
			this.setState({ data: userData });
		} catch (error) {
			Alert.alert('Erreur', error.message);
		}
	}
	async _showNotification() {
		Alert.alert(this.state.notification.data.title, this.state.notification.data.message);
	}
	_handleNotification = notification => {
		this.setState({ notification: notification });
	};
	componentDidUpdate(){
		if(this.state.notification != null){
			this._showNotification();
			this.setState({ notification: null });
		}
	}
	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
					<View>
						<View style={{ backgroundColor: '#00BF9A', padding: 15 }}>
							<View style={{ flexDirection: 'row' }}>
								<View style={{ justifyContent: 'center', width: '40%' }}>
									<Image
										style={{ width: 110, height: 110 }}
										source={require('../../assets/icons/app-icon.png')}
										resizeMode="contain"
									/>
								</View>
								<View style={{ justifyContent: 'center', width: '60%' }}>
									<Text
										style={{ color: '#FFF', fontWeight: '900', fontSize: 20, textAlign: 'right' }}
									>
										Ariary.net App
									</Text>
									<Text
										style={{ color: '#FFF', fontWeight: '900', fontSize: 20, textAlign: 'right',paddingTop:10 }}
									>
										{"{ "+this.state.username+" }"}
									</Text>
								</View>
							</View>
						</View>
					</View>
					<List
						dataArray={datas}
						renderRow={data => (
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon
										active
										name={data.icon}
										style={{ color: '#00BF9A', fontSize: 26, width: 30 }}
									/>
									<Text style={styles.text}>{data.name}</Text>
								</Left>
								{data.types && (
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>
								)}
							</ListItem>
						)}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
