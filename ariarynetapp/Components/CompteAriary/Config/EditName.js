//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Alert, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body } from 'native-base';

import configStyles from '../../../styles/css/configStyles';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import loginCss from '../../../styles/css/loginCss';
import UserService from '../../../Service/InfoUser/UserService';

// create a component
class EditName extends Component {
	constructor() {
		super();
		this.state = {
			nom: '',
			prenom: '',
			accound_id: '',
			password: '',
			username: '',
			loading: false,
			username: '',
			userInfo: null,
			modalVisible: false
		};
	}
	async _validateChange() {
		if (!this._isEmptyPass()) {
			try {
				let dataUser = {
					account_id: this.state.account_id,
					username: this.state.username,
					email: this.state.userInfo.mail,
					phone: this.state.userInfo.phone,
					name: this.state.nom,
					firstname: this.state.prenom,
					birthday: this.state.userInfo.birthday
				};
				await UserService.updateUserInfo(dataUser, this);
			} catch (error) {
				Alert.alert('Erreur', error);
			}
		} else {
			Alert.alert('Erreur mot de passe', 'Veuillez entrer votre mot de passe pour confirmer le changement');
		}
	}
	async componentWillMount() {
		try {
			let account_id = this.props.navigation.state.params.account_id;
			let pseudo = this.props.navigation.state.params.pseudo;
			const userinfo = await UserService.getUserInfo(account_id, this);
			this.setState({
				account_id: account_id,
				userInfo: userinfo,
				username: pseudo
			});
		} catch (error) {
			console.log(error);
		}
	}
	_isEmptyPass() {
		return this.state.password == '' || this.state.password == null;
	}
	_isEmptyField() {
		return (
			this.state.nom == '' ||
			this.state.prenom == '' ||
			this.state.username == '' ||
			this.state.nom == null ||
			this.state.prenom == null ||
			this.state.username == null
		);
	}
	_renderPasswordView() {
		if (!this._isEmptyField()) {
			this.setState({ modalVisible: true });
		} else {
			Alert.alert('Info', "Des infromation sont videsn. Voulez-vous annulez le changement?", [
				{ text: 'Editer' },
				{ text: 'Oui', onPress: () => this.props.navigation.goBack() }
			]);
		}
	}

	async closeModal() {
		try {
			await UserService.verifyUser(this.state.username, this.state.password, this);
			await this._validateChangeMail();
			this.setState({ modalVisible: false });
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	render() {
		return (
			<View style={configStyles.container}>
				<View style={configStyles.content}>
					<View style={configStyles.header}>
						<Text style={configStyles.textHeader}>Editer votre nom</Text>
					</View>
					<View style={{ padding: 15 }}>
						<TextInput
							placeholder="Votre Nom"
							onChangeText={nom => this.setState({ nom })}
							style={configStyles.input}
						/>
					</View>
					<View style={{ padding: 15 }}>
						<TextInput
							placeholder="Votre Prénom"
							onChangeText={prenom => this.setState({ prenom })}
							style={configStyles.input}
							onEndEditing={() => {
								this._renderPasswordView();
							}}
						/>
					</View>
					<View style={configStyles.footer}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={configStyles.touch}>
							<Text style={configStyles.touchtext}>Annuler</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this._renderPasswordView()} style={configStyles.touch}>
							<Text style={configStyles.touchtext}>Valider</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setState({ modalVisible: false });
					}}
				>
					<TouchableOpacity
						onPress={() => this.setState({ modalVisible: false })}
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'rgba(0,0,0,0.4)'
						}}
					>
						<View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10 }}>
							<View
								style={{
									alignItems: 'center',
									backgroundColor: '#eee',
									paddingVertical: 20,
									borderTopLeftRadius: 10,
									borderTopRightRadius: 10
								}}
							>
								<Text style={{ textAlign: 'center', paddingHorizontal: 20 }}>
									Entrer votre mot de passe pour confirmer le changement de votre nom
								</Text>
							</View>
							<View style={[{ padding: 10, height: 60 }]}>
								<TextInput
									placeholder="Mot de passe de confirmation"
									autoFocus={true}
									secureTextEntry
									style={[loginCss.input, { textAlign: 'center', borderRadius: 10, height: 50 }]}
									onChangeText={password => {
										this.setState({ password: password });
									}}
									onEndEditing={() => {
										this.closeModal();
									}}
								/>
							</View>
						</View>
					</TouchableOpacity>
					{this.state.loading && (
						<View style={configStyles.indicator}>
							<ActivityIndicator size="large" animating={true} color="#666" />
						</View>
					)}
				</Modal>
			</View>
		);
	}
}
//make this component available to the app
export default EditName;
