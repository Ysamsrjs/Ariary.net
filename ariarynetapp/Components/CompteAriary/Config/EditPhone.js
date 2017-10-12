//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert, Modal } from 'react-native';

import { Container, Header, Title, Content, Button, Icon, Left, Right, Body } from 'native-base';

import configStyles from '../../../styles/css/configStyles';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import loginCss from '../../../styles/css/loginCss';
import UserService from '../../../Service/InfoUser/UserService';
// create a component
class EditPhone extends Component {
	constructor() {
		super();
		this.state = {
			oldphone: '',
			newphone: '',
			password: '',
			username: '',
			userInfo: '',
			account_id: '',
			loading: false,
			modalVisible: false
		};
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
	async _validateChangePhone() {
		if (!this._isEmptyPass()) {
			try {
				let dataUser = {
					account_id: this.state.account_id,
					username: this.state.username,
					email: this.state.userInfo.mail,
					phone: this.state.newphone,
					name: this.state.userInfo.nom,
					firstname: this.state.userInfo.prenom,
					birthday: this.state.userInfo.birthday
				};
				await UserService.updateUserInfo(dataUser, this);
			} catch (error) {
				Alert.alert('Erreur', error.toString());
			}
		} else {
			Alert.alert('Veuillez entrer votre mot de passe pour confirmer le changement');
		}
	}
	_isEmptyField() {
		return this.state.newphone == null || this.state.newphone == '';
	}
	_isEmptyPass() {
		return this.state.password == '' || this.state.password == null;
	}
	_renderPasswordView() {
		if (!this._isEmptyField()) {
			this.setState({ modalVisible: true });
		} else {
			Alert.alert('Info', "Vous avez entrér aucun numéro téléphone. Voulez-vous annulez le changement?", [
				{ text: 'Non' },
				{ text: 'Oui', onPress: () => this.props.navigation.goBack() }
			]);
		}
	}

	async closeModal() {
		try {
			await UserService.verifyUser(this.state.username, this.state.password, this);
			await this._validateChangePhone();
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
						<Text style={configStyles.textHeader}>Editer numéro tél</Text>
					</View>
					<View style={{ padding: 15 }}>
						<TextInput
							placeholder="Nouveau Numero"
							keyboardType="phone-pad"
							onChangeText={nom => this.setState({ nom })}
							style={configStyles.input}
							onChangeText={newphone => this.setState({ newphone })}
							returnKeyType="done"
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
									Entrer votre mot de passe pour confirmer le changement de votre téléphone
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
export default EditPhone;
