//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';

// create a component
class Page2 extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<View
						style={{
							backgroundColor: '#FFF',
							borderRadius: 100,
							width: 100,
							padding: 10
						}}
					>
						<Image
							style={{ width: 80, height: 80 }}
							source={require('../../../../../assets/images/ariary.png')}
							resizeMode="contain"
						/>
					</View>
				</View>
				<View
					style={{
						backgroundColor: 'transparent',
						justifyContent: 'center',
						paddingLeft: 20,
						padding: 10
					}}
				/>
				<View
					style={{ borderBottomColor: '#fff', borderBottomWidth: 1, height: 10, backgroundColor: '#fff' }}
				/>
				<View style={styles.textbienvenue}>
					<Text style={{ paddingLeft: 10 }}>
						Un numéro de compte vous a été attribué. Retenez le bien car vous en aurez besoin lorsque vous
						allez effectuer une transaction ariary.
					</Text>
				</View>
				<View style={{ borderBottomColor: '#fff', borderBottomWidth: 1, height: 10 }} />
				<View style={styles.textbienvenue}>
					<Text style={{ paddingLeft: 10 }}>
						Memoriser bien votre pseudo et votre mot de passe. Vous pouvez les changer dans les paramètres
						une fois que aurai fini de completer votre inscription.
					</Text>
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
		alignItems: 'center'
	},
	textbienvenue: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 40,
		justifyContent: 'center'
	}
});

//make this component available to the app
export default Page2;
