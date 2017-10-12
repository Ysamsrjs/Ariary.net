//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Alert, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body } from 'native-base';

import configStyles from '../../../styles/css/configStyles';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import loginCss from '../../../styles/css/loginCss';
import UserService from '../../../Service/InfoUser/UserService';
import Utils from '../../../Service/Utilities/Utils';
// create a component
class EditPassword extends Component {
	constructor() {
		super();
		this.state = {
			password: '',
			newpassword: '',
			confirmpassword: '',
			account_id: '',
			username: '',
			loading: false,
			haserror: false,
			modalVisible: false,
			erreur: ''
		};
	}
	async _validateChangePass() {
		let dataUser = {
			account_id: this.state.account_id,
			last_password: this.state.password,
			new_password: this.state.newpassword
		};
		try {
			await UserService.updateUserPass(dataUser, this);
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	componentWillMount() {
		this.setState({
			account_id: this.props.navigation.state.params.data.account_id,
			username: this.props.navigation.state.params.data.pseudo
		});
	}
	_isEmptyField() {
		return (
			this.state.newpassword == null ||
			this.state.newpassword == '' ||
			this.state.confirmpassword == null ||
			this.state.confirmpassword == ''
		);
	}
	_validatePass() {
		try {
			Utils._isValidPass(this.state.newpassword);
			this.setState({ haserror: false });
		} catch (error) {
			this.setState({ haserror: true, erreur: error.toString() });
		}
	}
	_confirmPass() {
		if (this.state.newpassword == this.state.confirmpassword) {
			this.setState({ haserror: false });
			this._renderPasswordView();
		} else {
			this.setState({ haserror: true, erreur: 'Les mots de passe ne correspondent pas' });
		}
	}

	_renderPasswordView() {
		if (!this._isEmptyField()) {
			this.setState({ modalVisible: true });
		} else {
			Alert.alert('Info', 'Aucune informations saisie. Voulez-vous annuler le changement?', [
				{ text: 'Editer' },
				{ text: 'Oui', onPress: () => this.props.navigation.goBack() }
			]);
		}
	}

	async closeModal() {
		try {
			await UserService.verifyUser(this.state.username, this.state.password, this);
			await this._validateChangePass();
			this.setState({ modalVisible: false });
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	render() {
		return (
			<View style={configStyles.container}>
				<View style={configStyles.content}>
					{this.state.haserror && (
						<View style={{ padding: 15, backgroundColor: 'red' }}>
							<Text style={{ color: 'white', textAlign: 'center' }}>{this.state.erreur}</Text>
						</View>
					)}
					<View style={configStyles.header}>
						<Text style={configStyles.textHeader}>Cheanger votre mot de passe</Text>
					</View>
					<View style={{ padding: 15 }}>
						<TextInput
							placeholder="Nouveau mot de passe"
							secureTextEntry
							onChangeText={newpassword => this.setState({ newpassword })}
							style={configStyles.input}
							onEndEditing={() => {
								this._validatePass();
							}}
						/>
					</View>
					<View style={{ padding: 15 }}>
						<TextInput
							placeholder="Confirmer votre nouveau mot de passe"
							secureTextEntry
							onChangeText={confirmpassword => this.setState({ confirmpassword })}
							style={configStyles.input}
							onEndEditing={() => {
								this._confirmPass();
							}}
						/>
					</View>
					<View style={configStyles.footer}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={configStyles.touch}>
							<Text style={configStyles.touchtext}>Annuler</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this._confirmPass()} style={configStyles.touch}>
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
									Entrer votre mot de passe pour confirmer le changement de votre mot de passe
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
// define your styles

//make this component available to the app
export default EditPassword;
