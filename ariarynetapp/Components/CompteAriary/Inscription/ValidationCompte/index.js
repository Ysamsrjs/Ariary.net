import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, StatusBar, Alert, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, ListItem, Badge, Left, Right, Body, Separator } from 'native-base';

import ViewPager from 'react-native-viewpager';
const deviceWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import StepIndicator from 'react-native-step-indicator';
import Profile from './Profile/';
import Addresse from './Addresse';
import Recuperation from './Recuperation';
import InscriptionService from '../../../../Service/Connexion/InscriptionService';
import Utils from '../../../../Service/Utilities/Utils';
import styles from './styles';

const firstIndicatorStyles = {
	stepIndicatorSize: 30,
	currentStepIndicatorSize: 40,
	separatorStrokeWidth: 3,
	currentStepStrokeWidth: 3,
	separatorFinishedColor: '#4aae4f',
	separatorUnFinishedColor: '#a4d4a5',
	stepIndicatorFinishedColor: '#4aae4f',
	stepIndicatorUnFinishedColor: '#a4d4a5',
	stepIndicatorCurrentColor: '#ffffff',
	stepIndicatorLabelFontSize: 15,
	currentStepIndicatorLabelFontSize: 15,
	stepIndicatorLabelCurrentColor: '#000000',
	stepIndicatorLabelFinishedColor: '#ffffff',
	stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
	labelColor: '#666666',
	labelSize: 15,
	currentStepLabelColor: '#4aae4f'
};
class MainValidation extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 0,
			text: 'Suivant',
			next: true,
			back: false,
			account_id: null,
			profile: null,
			addresse: null,
			recuperation: null,
			data: null,
			loading: false,
			username: '',
			optionRequest: false,
			message: ''
		};
	}
	_getPage() {
		return this.state.page;
	}
	_goNext() {
		try {
			InscriptionService._validationCompte(this);
		} catch (error) {
			Alert.alert('Info', error.toString());
		}
	}
	_goBack() {
		try {
			this.setState({ optionRequest: false });
			InscriptionService._goBack(this);
		} catch (error) {
			this.setState({ error_message: error.toString(), optionRequest: true });
		}
	}
	updateProfile(profile) {
		this.setState({ profile: profile });
	}
	updateAddresse(addresse) {
		this.setState({ addresse: addresse });
	}
	updateRecuperation(validationdata) {
		this.setState({ data: validationdata });
	}
	renderViewPagerPage(data) {
		return data;
	}
	getDataUser() {
		return this.state.data;
	}
	getDataPages() {
		let dataSource = new ViewPager.DataSource({
			pageHasChanged: (p1, p2) => p1 !== p2
		});
		const PAGES = [
			<Profile updateProfile={this.updateProfile.bind(this)} activity={this} />,
			<Addresse updateAddresse={this.updateAddresse.bind(this)} activity={this} />,
			<Recuperation updateRecuperation={this.updateRecuperation.bind(this)} activity={this} />
		];
		return dataSource.cloneWithPages(PAGES);
	}
	renderPageIndicators() {
		return <View />;
	}
	async componentWillMount() {
		try {
			let data = await Utils.getItem('dataUser');
			if (data != null) {
				let datajson = JSON.parse(data);
				this.setState({ account_id: datajson.code, username: datajson.pseudo });
			}
		} catch (error) {
			Console.log(error);
		}
	}
	render() {
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<StatusBar hidden={true} />
				<Header style={styles.header}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Materialcon name="arrow-back" color="#fff" size={30} style={{ fontWeight: '900' }} />
						</Button>
					</Left>
					<Body>
						<Title>Validation de Compte</Title>
					</Body>
				</Header>
				<Image
					source={require('../../../../assets/images/back2.jpg')}
					style={{
						flex: 1,
						width: null,
						height: null
					}}
					resizeMode="cover"
				>
					<View style={[style.container, { backgroundColor: 'transparent' }]}>
						<View style={style.stepIndicator}>
							<StepIndicator
								customStyles={firstIndicatorStyles}
								currentPosition={this._getPage()}
								labels={['Profile', 'Addresse', 'Récupération']}
								stepCount={3}
							/>
						</View>

						<ViewPager
							ref="viewpager"
							style={{ flex: 1 }}
							dataSource={this.getDataPages()}
							renderPageIndicator={this.renderPageIndicators}
							onChangePage={page => {
								this.setState({ page: page });
							}}
							locked
							renderPage={this.renderViewPagerPage.bind(this)}
						/>
						<View style={style.bottom}>
							<TouchableOpacity
								style={[style.button, { width: '48%' }]}
								onPress={() => {
									this._goBack();
								}}
							>
								<View style={style.contenuebtn}>
									<Materialcon name="keyboard-arrow-left" size={30} color="#fff" />
									<Text style={style.buttonText}>Précédent</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								style={[style.button, { width: '48%' }]}
								onLongPress={() => {
									this._goNext();
								}}
								onPress={() => {
									this._goNext();
								}}
								disabled={!this.state.next}
							>
								<View style={style.contenuebtn}>
									<Text style={style.buttonText}>{this.state.text}</Text>
									<Materialcon name="keyboard-arrow-right" size={30} color="#fff" />
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<Modal
						animationType="slide"
						transparent={true}
						visible={this.state.optionRequest}
						onRequestClose={() => {
							this.setState({ optionRequest: false });
						}}
					>
						<TouchableOpacity
							onPress={() => this.setState({ optionRequest: false })}
							style={style.modalBody}
						>
							<View style={{ width: '90%', backgroundColor: '#eee', borderRadius: 10 }}>
								<View style={style.modalHeader}>
									<Text style={style.modalHeadertex}>Informations sur les champs</Text>
								</View>
								<View style={{ padding: 10, justifyContent: 'center' }}>
									<Text style={{ textAlign: 'center', padding: 10 }}>{this.state.message}</Text>
								</View>
								<View
									style={{
										flexDirection: 'row',
										padding: 0,
										alignContent: 'center',
										borderRadius: 10
									}}
								>
									<TouchableOpacity
										onPress={() => {
											this.setState({ optionRequest: false });
										}}
										style={[
											style.modalButton,
											{
												borderBottomLeftRadius: 10
											}
										]}
									>
										<Text style={{ textAlign: 'center', padding: 15 }}>Editer</Text>
									</TouchableOpacity>

									{this.state.optionRequest && (
										<TouchableOpacity
											onPress={() => {
												this.setState({ optionRequest: false });
												this._goNext();
											}}
											style={[
												style.modalButton,
												{
													borderBottomRightRadius: 10
												}
											]}
										>
											<Text style={{ textAlign: 'center', padding: 15 }}>Poursuivre</Text>
										</TouchableOpacity>
									)}
								</View>
							</View>
						</TouchableOpacity>
					</Modal>
				</Image>
			</Container>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1
	},
	page: {
		width: deviceWidth
	},
	button: {
		padding: 10,
		margin: 2,
		backgroundColor: '#00BF9A'
	},
	buttonText: {
		color: '#fff',
		alignSelf: 'center'
	},
	bottom: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	contenuebtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	modalBody: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	modalHeader: {
		alignItems: 'center',
		backgroundColor: 'green',
		paddingVertical: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	modalHeadertex: {
		textAlign: 'center',
		paddingHorizontal: 20,
		color: 'white',
		fontSize: 20,
		fontWeight: '900'
	},
	modalButton: {
		width: '49%',
		backgroundColor: 'white',
		margin: '0.5%'
	}
});

export default MainValidation;
