import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, StatusBar, Alert } from 'react-native';
import {
	Container,
	Header,
	Title,
	Content,
	Button,
	ListItem,
	Badge,
	Left,
	Right,
	Body,
	Switch,
	Radio,
	Picker,
	Separator
} from 'native-base';

import ViewPager from 'react-native-viewpager';
const deviceWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import StepIndicator from 'react-native-step-indicator';
import Indentite from './Identite/';
import Contact from './Contact';
import Securite from './Securite';
import Validation from './Recap';
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
class MainInscription extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 0,
			text: 'Suivant',
			next: true,
			back: false,
			account_id:null,
			identity: null,
			contact: null,
			security: null,
			data: {
				username: '',
				name: '',
				firstname: '',
				birthday: '',
				email: '',
				phone:'',
				password: ''
			},
			loading: false
		};
	}

	_getPage() {
		return this.state.page;
	}
	_goNext() {
		try {
			InscriptionService._validateUser(this);
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	_goBack() {
		try {
			InscriptionService._goBack(this);
		} catch (error) {
			Alert.alert('Erreur', error.toString());
		}
	}
	updateIdentity(identity) {
		this.setState({ identity: identity });
	}
	updateContact(contact) {
		this.setState({ contact: contact });
	}
	updateSecurity(data) {
		this.setState({ data:data });
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
			<Indentite updateIdentityState={this.updateIdentity.bind(this)} activity={this}/>,
			<Contact updateContactState={this.updateContact.bind(this)} activity={this}/>,
			<Securite updateSecurityState={this.updateSecurity.bind(this)} activity={this} />
		];
		return dataSource.cloneWithPages(PAGES);
	}
	renderPageIndicators() {
		return <View />;
	}
	async componentWillMount(){
		try {
		 let data=await Utils.getItem('dataUser');
		 if(data!=null){
			 let datajson=JSON.parse(data);
			 this.setState({account_id:datajson.code});
		 }
		} catch (error) {
			console.log(error);
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
						<Title>Inscription Ariary.net</Title>
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
								labels={['Identité', 'Contact', 'Sécurité']}
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
								style={style.button}
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
								style={style.button}
								onLongPress={() => {
									this._goNext();
								}}
								onPress={() => {
									this._goNext();
								}}
								disabled={!this.state.next}
							>
								<View style={style.contenuebtn}>
									<Text style={style.buttonText}>Suivant</Text>
									<Materialcon name="keyboard-arrow-right" size={30} color="#fff" />
								</View>
							</TouchableOpacity>
						</View>
					</View>
					{this.state.loading && (
						<View
							style={{
								backgroundColor: 'rgba(44, 62, 80,0.5)',
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0
							}}
						>
							<ActivityIndicator size="large" animating={true} color="#FFF" />
							<Text style={{ textAlign: 'center', fontWeight: '900', fontSize: 20, color: '#FFF' }}>
								Enregistrement encours...
							</Text>
						</View>
					)}
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
		margin: 10,
		width: 150,
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
	}
});

export default MainInscription;
