//import liraries
import React, { Component } from 'react';
import { Container, Header, Title, Button, Tabs, Tab, Right, Left, Body, TabHeading, Content } from 'native-base';
import {
	Modal,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
	Alert,
	BackHandler,
	StatusBar,
	Share,
	NativeModules
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import loginCss from '../../../styles/css/loginCss';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ViaMobileMoney from './Mobile/ViaMobileMoney';
import styles from './Styles';
import Utils from '../../../Service/Utilities/Utils';
import UserService from '../../../Service/InfoUser/UserService';
import configStyles from '../../../styles/css/configStyles';

// create a component
class MainAchat extends Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			isVisible: false,
			result: ''
		};
	}
	async loadConfig() {
		try {
			await UserService.loadConfig(this);
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		return (
			<Container style={styles.container}>
				<StatusBar hidden={true} />
				<Header style={styles.header}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
							<Icon name="bars" size={25} style={{ color: '#FFF' }} />
						</Button>
					</Left>
					<Body>
						<Title>Bons d'achat</Title>
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
				<Tabs style={{ elevation: 3 }}>
					<Tab
						heading={
							<TabHeading style={styles.modeaba}>
								<Text style={{ color: '#fff' }}>Via Mobile Money</Text>
							</TabHeading>
						}
					>
						<ViaMobileMoney navigation={this.props.navigation} activity={this} />
						{this.state.loading && (
							<View style={configStyles.indicator}>
								<ActivityIndicator size="large" animating={true} color="#666" />
							</View>
						)}
					</Tab>
				</Tabs>
			</Container>
		);
	}
}
//make this component available to the app
const modal = StyleSheet.create({
	annuler: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		backgroundColor: '#FFC107',
		paddingHorizontal: 20
	},
	header: {
		backgroundColor: '#009688',
		padding: 10,
		width: '90%'
	},
	content: {
		flex: 1,
		backgroundColor: '#eee'
	},
	footer: {
		backgroundColor: '#009688',
		padding: 20
	},
	contenuemodal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	page: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	main: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)'
	}
});
export default MainAchat;
