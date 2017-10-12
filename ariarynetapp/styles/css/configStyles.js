import { StyleSheet, Dimensions } from 'react-native';
const configStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(54,34,30,0.4)'
	},
	content: {
		justifyContent: 'center',
		alignContent: 'center',
		width: '90%',
		backgroundColor: '#eee'
	},
	header: {
		padding: 15,
		backgroundColor: 'green'
	},
	footer: {
		flexDirection: 'row',
		padding: 15,
		alignContent: 'center'
	},
	input: {
		height: 50,
		textAlign: 'center'
	},
	touch: {
		width: '49%',
		backgroundColor: '#fff',
		marginRight: '1%'
	},
	touchtext: {
		textAlign: 'center',
		padding: 15
	},
	textHeader: {
		textAlign: 'center',
		textAlign: 'center',
		fontSize: 25,
		color: '#fff'
	},
	indicator: {
		backgroundColor: 'rgba(44, 62, 80,0.1)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});
export default configStyles;