//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';

// create a component
class Page3 extends Component {
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
				>
					<Text style={{textAlign: 'center' }}>Condition d'utilisation</Text>
				</View>
				<View style={{ borderBottomColor: '#fff', borderBottomWidth: 1, height: 10,backgroundColor:'#fff' }} />
				<View style={styles.textbienvenue}>
					<Text style={{paddingLeft: 10 }}>
						Notez bien que vous accepter les conditions d'utilisation de votre compte Ariary.net une fois que vous avez un numéro de compte
					</Text>
				</View>
				<View style={{ borderBottomColor: '#fff', borderBottomWidth: 1, height: 10 }} />
				<View style={styles.textbienvenue}>
					<Text style={{paddingLeft: 10 }}>
						L'équipe d'Ariary.net vous souhaite une bonne utilisation de notre application
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
		alignItems: 'center',
	},
	textbienvenue: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 40,
		justifyContent: 'center'
	}
});

//make this component available to the app
export default Page3;
