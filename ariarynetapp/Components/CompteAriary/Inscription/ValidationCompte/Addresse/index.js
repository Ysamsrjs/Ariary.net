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
	Modal
} from 'react-native';
import { Container, Header, Title, Content, Button, Footer, FooterTab, Body, Left, Right } from 'native-base';
//import Phone from 'react-phone-number-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';

import loginCss from '../../../../../styles/css/loginCss';

import styles from './styles';

class Addresse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numadresses: 'andresee1',
			rue: '322 est',
			lot: 'lot 11 b',
			codepostal: '101',
			ville: 'Antananarivo',
			pays: 'Madagascar',
			precision_addr: 'Ato ety',
			loading: false,
			cca2: 'mg',
			modalVisible: false,
		};
	}

	showCountries() {
		this.refs.countryPicker.openModal();
	}

	selectCountry(country) {
		this.setState({ pays: country.name });
	}

	updateAddresse() {
		this.setState({ modalVisible: false });
		this.updateStateAdresse();
	}
	updateStateAdresse() {
		let addresse = {
			numadresses: this.state.numadresses,
			rue: this.state.rue,
			lot: this.state.lot,
			codepostal: this.state.codepostal,
			ville: this.state.ville,
			pays: this.state.pays,
			precision_addr: this.state.precision_addr
		};
		this.props.updateAddresse(addresse);
	}

	_isEmptyField() {
		return (
			this.state.lot == '' ||
			this.state.codepostal == '' ||
			this.state.ville == '' ||
			this.state.pays == '' ||
			this.state.lot == null ||
			this.state.codepostal == null ||
			this.state.ville == null ||
			this.state.pays == null 
		);
	}
	render() {
		return (
			<Content padder contentContainerStyle={{ justifyContent: 'center' }}>
				<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>

				<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Pays"
							onChangeText={pays => this.setState({ pays })}
							value={this.state.pays}
							style={[loginCss.input, { backgroundColor: 'transparent', textAlign: 'center' }]}
							returnKeyType="done"
							onEndEditing={() => {
								this.updateStateAdresse();
							}}
						/>
						<TouchableOpacity
							style={{
								backgroundColor: '#2c3e50',
								justifyContent: 'center',
								borderRadius: 5
							}}
							onPress={() => {
								this.showCountries();
							}}
						>
							<View
								style={{
									flexDirection: 'row'
								}}
							>
								<Text style={{ color: 'white', paddingVertical: 10, paddingLeft: 5 }}>Pays</Text>
								<Materialcon
									name="arrow-forward"
									color="#fff"
									size={20}
									style={{ fontWeight: '900', paddingVertical: 10 }}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<CountryPicker
						ref="countryPicker"
						onChange={value => this.selectCountry(value)}
						translation="fra"
						closeable={true}
						cca2={this.state.cca2}
					>
						<View />
					</CountryPicker>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Code Postal"
							keyboardType="numeric"
							value={this.state.codepostal}
							onChangeText={codepostal => this.setState({ codepostal })}
							style={[loginCss.input, { backgroundColor: 'transparent', textAlign: 'center' }]}
							returnKeyType="done"
							onEndEditing={() => {
								this.updateStateAdresse();
							}}
						/>
					</View>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Ville"
							value={this.state.ville}
							onChangeText={ville => this.setState({ ville })}
							style={[loginCss.input, { backgroundColor: 'transparent', textAlign: 'center' }]}
							returnKeyType="done"
							onEndEditing={() => {
								this.updateStateAdresse();
							}}
						/>
					</View>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Rue"
							value={this.state.rue}
							onChangeText={rue => this.setState({ rue })}
							style={[loginCss.input, { backgroundColor: 'transparent', textAlign: 'center' }]}
							returnKeyType="done"
							onEndEditing={() => {
								this.updateStateAdresse();
							}}
						/>
					</View>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Lot"
							onChangeText={lot => this.setState({ lot })}
							value={this.state.lot}
							style={[loginCss.input, { backgroundColor: 'transparent', textAlign: 'center' }]}
							returnKeyType="done"
							onEndEditing={() => {
								this.updateStateAdresse();
							}}
						/>
					</View>
					
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Numéro de l'adresse"
							style={[loginCss.input, { backgroundColor: 'transparent', textAlign: 'center' }]}
							keyboardType="numeric"
							value={this.state.numadresses}
							onChangeText={numadresses => this.setState({ numadresses })}
							returnKeyType="done"
							onEndEditing={() => {
								this.updateStateAdresse();
							}}
						/>
					</View>
					<View style={loginCss.inputWrap}>
						<TextInput
							placeholder="Précision de l'addresse"
							value={this.state.precision_addr}
							onChangeText={precision_addr => this.setState({ precision_addr })}
							style={[loginCss.input, { backgroundColor: 'transparent', textAlign: 'center' }]}
							returnKeyType="done"
							onEndEditing={() => {
								this.updateAddresse();
							}}
						/>
					</View>
				</View>
			</Content>
		);
	}
}

export default Addresse;
