//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AuthentificationService from '../../../Service/Connexion/AuthentificationService';

// create a component
class LogOut extends Component {
	constructor() {
		super();
		this.state = {
			hasToken: true
		};
	}
	async _logOut() {
		try {
			await AuthentificationService._logout('dataUser');
			this.props.navigation.navigate('Loader');
		} catch (error) {
			Alert.alert('Erreur', error);
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{justifyContent: 'center', alignContent: 'center',width:'90%',backgroundColor:'#eee'}}>
					<View style={{padding:15,backgroundColor:'green'}}>
					<Text style={{textAlign:'center',textAlign:'center',fontSize:25,color:'#fff'}}>Se déconnecter</Text>
					</View>
					<View style={{padding:15}}>
						<Text style={{textAlign:'center'}}>Vous allez être déconnecté,Voulez-vous continuer?</Text>
					</View>
					<View style={{ flexDirection: 'row',padding:15,alignContent:'center'}}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Achat')} style={{width:'49%',backgroundColor:'#fff',marginRight:'1%'}}>
							<Text style={{textAlign:'center',padding:15}}>Annuler</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this._logOut()} style={{width:'49%',backgroundColor:'#fff',marginLeft:'1%'}}>
						<Text style={{textAlign:'center',padding:15}}>Je confirme</Text>
						</TouchableOpacity>
					</View>
				</View>
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
export default LogOut;
