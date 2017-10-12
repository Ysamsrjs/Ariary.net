import React from 'react';
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
	StatusBar,
	WebView,
	Animated,Easing
} from 'react-native';
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import loginCss from '../../../styles/css/loginCss';
import Expo from 'expo';
import Utils from '../../../Service/Utilities/Utils';
import UserService from '../../../Service/InfoUser/UserService';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import AuthentificationService from '../../../Service/Connexion/AuthentificationService';
import FontIcon from 'react-native-vector-icons/FontAwesome';

const APP_ID = '1607718472619122';
// create a component
class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			spinValue: new Animated.Value(0),
			rotate:'0deg',
			url: '',
			uri:'http://54.229.79.45/AriaryNet/Login/',
			token: null,
			account_id: null,
			loading: false
		};
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
	onSuccess = async () => {
		if (this.state.token != null) {
			try {
				await AuthentificationService.doLogin(this);
			} catch (error) {
				Alert.alert('Erreur', error.toString());
			} finally {
				this.setState({ loading: false });
			}
		}
	};

	onChageUrl(navState) {
		let url = navState.url;
		this.setState({ url: url });
		try {
			let testToken = url.indexOf('token');
			if (testToken !== -1) {
				let pre_data = url.split('?');
				let temp = pre_data[1].split('&');
				let token = temp[0].split('=')[1];
				let code = temp[1].split('=')[1];
				this.setState({ token: token, account_id: code });
			}
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View
					style={{ justifyContent: 'center', alignContent: 'center', width: '95%', backgroundColor: 'white' }}
				>
					<View
						style={{
							justifyContent: 'center',
							paddingHorizontal: 10,
							paddingTop: 10,
							paddingBottom: 5,
							backgroundColor: '#eee',
						}}
					>
						<TextInput
							ref="texturl"
							value={this.state.url}
							editable={false}
							style={{ height: 40, backgroundColor: 'white', width: '100%' }}
						/>
					</View>
					<View
						style={{
							alignContent: 'center',
							justifyContent: 'center',
							paddingHorizontal: 10,
							height: 480,
							backgroundColor: 'white'
						}}
					>
						<WebView
							ref="webview"
							startInLoadingState={true}
							source={{ uri: 'http://54.229.79.45/AriaryNet/Login/'}}
							style={{ backgroundColor: 'white' }}
							scalesPageToFit={true}
							javaScriptEnabled={true}
							domStorageEnabled={true}
							onNavigationStateChange={this.onChageUrl.bind(this)}
							onLoadEnd={this.onSuccess}
						/>
					</View>
					<View style={{ flexDirection: 'row', padding: 10, alignContent: 'center' }}>
						<TouchableOpacity
							onPress={() => this.Cancel()}
							style={{ width: '49%', backgroundColor: '#00BF9A', marginRight: '1%' }}
						>
							<Text style={{ textAlign: 'center', padding: 15, color: '#fff' }}>Découvrire Ariary</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.props.navigation.navigate('MainInscription', { data: null });
							}}
							style={{ width: '49%', backgroundColor: '#00BF9A', marginLeft: '1%' }}
						>
							<Text style={{ textAlign: 'center', padding: 15, color: '#fff' }}>S'inscrire</Text>
						</TouchableOpacity>
					</View>
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
						<Text style={{ color: 'white' }}>Autentification encours...</Text>
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
