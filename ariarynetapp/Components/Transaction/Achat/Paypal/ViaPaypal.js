//import liraries
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	Dimensions,
	TextInput,
	ScrollView,
	Image,
	ActivityIndicator,
	AsyncStorage,
	Alert,
	BackHandler
} from 'react-native';
import { Content, Button } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import loginCss from '../../../../styles/css/loginCss';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// create a component
class ViaPaypal extends Component {
	constructor() {
		super();
		this.state = {
			loading:false,
			amount: '',
			password: ''
		};
	}
	_getMontant() {
		return this.state.montant;
	}
	_checkMontant() {
		let ret = false;
		if (this.state.amount != '' && this.state.amount != null && !isNaN(this.state.amount)) {
			ret = true;
		}
		return ret;
	}
	_checkPassword() {
	}
	_goNext() {
		
	}
	_goBack() {
		this.props.navigation.navigate('Achat');
	}
	_validate() {
		if (this._checkMontant()) {
			this._goNext();
		} else {
			Alert.alert('Erreur', 'Montant incorect!!!');
		}
	}
	render() {
		return (
			<Content padder contentContainerStyle={{justifyContent: 'center'}}>
				<View
					style={{
						justifyContent: 'center',
						alignContent: 'center',
						padding: 15
					}}
				>
					<View style={{ alignContent: 'center' }}>
						<Text style={{ fontWeight: '900', textAlign: 'center', color: '#00BF9A' }}>
							Payez vos bon d'achats depuis n'import ou dans le monde avec Ariary.net
						</Text>
					</View>
					<View style={loginCss.inputWrap}>
						<View style={loginCss.iconWrap}>
							<Image
								style={{ width: 20, height: 20 }}
								source={require('../../../../../assets/images/ariary.png')}
								resizeMode="contain"
							/>
						</View>
						<TextInput
							placeholder="en Ariary(1 Euro = 3 400 Ariary)"
							keyboardType="numeric"
							style={loginCss.input}
							autoFocus={false}
							onChangeText={amount => this.setState({ amount })}
							returnKeyType="next"
						/>
					</View>
					<View style={loginCss.inputWrap}>
						<View style={loginCss.iconWrap}>
							<Icon name="lock" size={20} color="#00BF9A" />
						</View>
						<TextInput
							ref="password"
							placeholder="Mot de passe"
							secureTextEntry
							onChangeText={password => this.setState({ password })}
							style={loginCss.input}
							secureTextEntry={true}
						/>
					</View>

					<View style={loginCss.seperator} />
					<View style={{ alignItems: 'flex-end' }}>
						<Button success onPress={() => this._validate()} style={{ alignSelf: 'flex-end',padding:20}}>
							<Text style={{ color: '#ffffff', fontWeight: '800' }}>Acheter</Text>
						</Button>
						<View style={{ flex: 1 }} />
					</View>
				</View>
			</Content>
		);
	}
}
//make this component available to the app
export default ViaPaypal;
