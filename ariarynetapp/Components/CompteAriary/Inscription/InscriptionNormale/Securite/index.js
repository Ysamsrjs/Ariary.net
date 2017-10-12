import React, { Component } from 'react';
import {
	StatusBar,
	View,
	TouchableOpacity,
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
import loginCss from '../../../../../styles/css/loginCss';
import styles from './styles';
import Utils from '../../../../../Service/Utilities/Utils';
import configStyles from '../../../../../styles/css/configStyles';
import UserService from '../../../../../Service/InfoUser/UserService';

class Securite extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirmpassword: '',
			loading: false
		};
	}
	async updateSecurity() {
		let identity = this.props.activity.state.identity;
		let contact = this.props.activity.state.contact;
		let account_id = this.props.activity.state.account_id;
		let data=null;
		if (!this._isEmptyField()) {
			try {
				Utils._isValidPass(this.state.password);
				this._confirmPass();
				if (this.props.activity.props.navigation.state.params.data != null) {
					await UserService.verifyUser(identity.pseudo, this.state.password, this);
				}
				let security = {
					password: this.state.password,
					confirmpassword: this.state.confirmpassword
				};
				data = {
					username: identity.pseudo,
					name: identity.nom,
					firstname: identity.prenom,
					birthday: identity.datenaissance,
					email: contact.email,
					phone: contact.tel,
					password: security.password
				};
				if (account_id != null) {
					data = {
						account_id: account_id,
						username: identity.pseudo,
						role: 'simple',
						name: identity.nom,
						firstname: identity.prenom,
						birthday: identity.datenaissance,
						email: contact.email,
						phone: contact.tel,
						password: security.password
					};
				}
			} catch (error) {
				Alert.alert('Erreur', error.toString());
			}
		} else {
			Alert.alert(
				'Attention',
				"Assurez-vous que tous les champs sont remplis avant de passer à l'étape suivante "
			);
		}
		this.props.updateSecurityState(data);
	}
	_confirmPass() {
		if (this.state.password != this.state.confirmpassword) {
			throw 'Les mots de passe ne correspondent pas';
		}
	}
	_isEmptyField() {
		return (
			this.state.password == null ||
			this.state.confirmpassword == null ||
			this.state.password == '' ||
			this.state.confirmpassword == ''
		);
	}
	render() {
		return (
			<Content padder contentContainerStyle={{ justifyContent: 'center' }}>
				<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 50 }}>
					<Text style={{ color: '#666' }}>Mot de passe</Text>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="mot de passe"
							style={[loginCss.input, { backgroundColor: 'transparent' }]}
							autoFocus={true}
							secureTextEntry
							onChangeText={password => this.setState({ password })}
						/>
					</View>
					<Text style={{ color: '#666' }}>Confirmer votre mot de passe</Text>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="confirmer mot de passe"
							onChangeText={confirmpassword => this.setState({ confirmpassword })}
							style={[loginCss.input, { backgroundColor: 'transparent' }]}
							secureTextEntry
							returnKeyType="done"
							onEndEditing={this.updateSecurity.bind(this)}
						/>
					</View>
				</View>
				{this.state.loading && (
					<View style={configStyles.indicator}>
						<ActivityIndicator size="large" animating={true} color="#666" />
					</View>
				)}
			</Content>
		);
	}
}

export default Securite;
