//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity, Alert, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body } from 'native-base';

import configStyles from '../../../styles/css/configStyles';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import loginCss from '../../../styles/css/loginCss';
import UserService from '../../../Service/InfoUser/UserService';
// create a component
class EditPseudo extends Component {
	constructor() {
		super();
		this.state = {
			password: '',
			userInfo: '',
			account_id: '',
			username: '',
			loading: false,
			modalVisible: false
		};
	}

	async _validateChangePseudo() {
		if (!this._isEmptyPass()) {
			try {
				let dataUser = {
					account_id: this.userInfo.code,
					username: this.state.username,
					email: this.userInfo.mail,
					phone: this.state.userInfo.phone,
					name: this.state.userInfo.nom,
					firstname: this.state.userInfo.prenom,
					birthday: this.state.userInfo.birthday
				};
				await UserService.updateUserInfo(dataUser, this);
			} catch (error) {
				Alert.alert('Erreur', error.toString());
			}
		} else {
			Alert.alert('Info', 'Veuillez entrer votre mot de passe pour confirmer le changement');
		}
	}
	_isEmptyField() {
		return this.state.username == null || this.state.username == '';
	}
	_isEmptyPass() {
		return this.state.password == '' || this.state.password == null;
	}
	async componentWillMount() {
		try {
			let account_id = this.props.navigation.state.params.account_id;
			const userinfo = await UserService.getUserInfo(account_id, this);
			this.setState({
				account_id: account_id,
				userInfo: userinfo
			});
		} catch (error) {
			console.log(error);
		}
	}
	_renderPasswordView() {
		if (!this._isEmptyField()) {
			this.setState({ modalVisible: true });
		} else {
			Alert.alert('Info', 'Il existe des champs vides. Voulez-vous annulez le changement?', [
				{ text: 'Non' },
				{ text: 'Oui', onPress: () => this.props.navigation.goBack() }
			]);
		}
	}

	async closeModal() {
		try {
			await UserService.verifyUser(this.state.username, this.state.password, this);
			await this._validateChangePseudo();
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
						<Text style={configStyles.textHeader}>Editer votre pseudo</Text>
					</View>
					<View style={{ padding: 15 }}>
						<TextInput
							placeholder="Nouveau Pseudo"
							style={configStyles.input}
							onChangeText={username => this.setState({ username })}
							returnKeyType="next"
							onEndEditing={() => {
								this._renderPasswordView();
							}}
						/>
					</View>
					<View style={configStyles.footer}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={configStyles.touch}>
							<Text style={configStyles.touchtext}>Annuler</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this._renderPasswordView()}
							style={{ width: '49%', backgroundColor: '#fff', marginLeft: '1%' }}
						>
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
									Entrer votre mot de passe pour confirmer le changement de votre pseudo
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
export default EditPseudo;
