import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Button, Body, Left, Right } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import Materialcon from 'react-native-vector-icons/MaterialIcons';
import ViewPager from 'react-native-viewpager';

import styles from './styles';
import loginCss from '../../../../styles/css/loginCss';
import Page1 from './Page/Page1';
import Page2 from './Page/Page2';
import Page3 from './Page/Page3';

const deviceWidth = Dimensions.get('window').width;
const PAGES = [<Page1 />, <Page2 />, <Page3 />];
const count = 0;

const Bienvenue = React.createClass({
	getInitialState: function() {
		let dataSource = new ViewPager.DataSource({
			pageHasChanged: (p1, p2) => p1 !== p2
		});

		return {
			dataSource: dataSource.cloneWithPages(PAGES),
			page: 0,
			text: 'Suivant',
			code: '',
			nom: '',
			solde: '',
			username: ''
		};
	},
	componentWillMount(){
		let data=this.props.navigation.state.params.data;
		this.setState({code:data.code,username:data.pseudo,solde:data.solde});
	},
	renderPageIndicators: function() {
		return <View />;
	},
	render: function() {
		return (
			<Container style={styles.container}>
				<StatusBar hidden={true} />
				<Header style={{ backgroundColor: '#00BF9A' }}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Materialcon name="done" color="#fff" size={30} style={{ fontWeight: '900' }} />
						</Button>
					</Left>
					<Body>
						<Title>Bienvenue {this.username}</Title>
					</Body>
					<Right>
						<Title>Ariary.net</Title>
					</Right>
				</Header>
				<View style={css.container}>
					<ViewPager
						ref={viewpager => {
							this.viewpager = viewpager;
						}}
						style={{ justifyContent: 'center' }}
						dataSource={this.state.dataSource}
						renderPage={this._renderPage}
						isLoop={false}
						autoPlay={false}
						locked
						renderPageIndicator={this.renderPageIndicators}
					/>
					<View
						style={{
							justifyContent: 'center',
							flexDirection:'row',
							alignItems: 'center',
							paddingHorizontal:20,
						}}
					>
						<TouchableOpacity
							style={[loginCss.toutchable, { width: '50%' }]}
							onPress={() => {
								if (count == 0) {
									this.props.navigation.goBack();
								} else {
									this.viewpager.goToPage(count - 1);
									count = count - 1;
								}
							}}
						>
							<View
								style={[
									loginCss.buttonLogin,
									{
										backgroundColor: '#00BF9A',
										borderWidth: 1,
										borderColor: '#fff',
										padding:10
									}
								]}
							>
								<Materialcon
									name="keyboard-arrow-left"
									size={30}
									color="#FFF"
									style={{ fontWeight: '900' }}
								/>
								<Text style={{ color: '#fff', paddingRight: 5 }}>Précédent</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={[loginCss.toutchable, { width: '50%' }]}
							onPress={() => {
								if (count == PAGES.length - 1) {
									this.state.text = 'Continuer';
									this.props.navigation.navigate('App');
								} else {
									this.viewpager.goToPage(count + 1);
									count = count + 1;
								}
							}}
						>
							<View
								style={[
									loginCss.buttonLogin,
									{
										backgroundColor: '#00BF9A',
										borderWidth: 1,
										borderColor: '#fff',
										padding:10
									}
								]}
							>
								<Text style={{ color: '#fff', paddingRight: 5 }}>{this.state.text}</Text>
								<Materialcon
									name="keyboard-arrow-right"
									size={30}
									color="#FFF"
									style={{ fontWeight: '900' }}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Container>
		);
	},

	_renderPage: function(data) {
		return data;
	}
});

const css = StyleSheet.create({
	container: {
		flex: 1
	},
	page: {
		width: deviceWidth,
		flex: 1
	},
	button: {
		padding: 10
	}
});
export default Bienvenue;
