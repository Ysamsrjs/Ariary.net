import React, { Component } from 'react';
import {
	Text as Article,
	Image,
	View,
	StatusBar,
	StyleSheet,
	TouchableHighlight,
	BackHandler,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Button, H3, Header, Text, Title, Body, Left, Right } from 'native-base';

import styles from './styles';

class Accueil extends Component {
	constructor() {
		super();
		this.state = {
			modalVisible: false,
			facebookVisible: false,
			componentsView: null,
			isLoggedIn: false
		};
	}
	setModalVisible(visible, componenets) {
		this.setState({
			modalVisible: visible,
			componentsView: componenets
		});
	}
	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<Image
					source={require('../../assets/images/back2.jpg')}
					style={styles.imageContainer}
					resizeMode="contain"
				>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: 'transparent'
						}}
					>
						<View style={styles.logoContainer}>
							<Image
								source={require('../../assets/images/ariary.png')}
								style={styles.logo}
								resizeMode="contain"
							/>
						</View>
						<View style={{ padding: 10 }}>
							<Article
								style={{
									textAlign: 'center',
									color: 'rgba(22, 160, 133,1.0)',
									fontWeight: '900',
									fontSize: 25
								}}
							>
								Ariary.net
							</Article>
						</View>
						<View style={{ marginBottom: 80, alignItems: 'center', justifyContent: 'center' }}>
							<TouchableHighlight
								style={{ borderRadius: 50, width: 250 }}
								onPress={() => this.props.navigation.navigate('StartAriary')}
							>
								<View
									style={{
										backgroundColor: 'rgba(22, 160, 133,1.0)',
										borderRadius: 50,
										height: 60,
										alignContent: 'center',
										justifyContent: 'center'
									}}
								>
									<Article
										style={{ textAlign: 'center', color: '#fff', fontWeight: '900', fontSize: 10 }}
									>
										Nouveau utilisateur
									</Article>
									<Article
										style={{ textAlign: 'center', color: '#fff', fontWeight: '900', fontSize: 18 }}
									>
										{'C o m m e n c e r'.toUpperCase()}
									</Article>
								</View>
							</TouchableHighlight>
							<Text style={{ margin: 3 }} />
							<TouchableHighlight
								style={{ borderRadius: 50, width: 250 }}
								onPress={() => this.props.navigation.navigate('Login')}
							>
								<View
									style={{
										backgroundColor: 'rgba(39, 174, 96,1.0)',
										borderRadius: 50,
										height: 60,
										alignContent: 'center',
										justifyContent: 'center'
									}}
								>
									<Article
										style={{ textAlign: 'center', color: '#fff', fontWeight: '900', fontSize: 10 }}
									>
										J'ai un compte
									</Article>
									<Article
										style={{ textAlign: 'center', color: '#fff', fontWeight: '900', fontSize: 18 }}
									>
										{'Se connecter'.toUpperCase()}
									</Article>
								</View>
							</TouchableHighlight>
						</View>
					</View>
				</Image>
			</Container>
		);
	}
}
export default Accueil;
