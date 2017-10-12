import { AsyncStorage } from 'react-native';
import Utils from '../Utilities/Utils';
import UserService from '../InfoUser/UserService';

const BASEURL = 'http://54.229.79.45/ariary2API/web/api/';

let instance = null;
// create a component
class AuthentificationService {
	static getInstance() {
		if (!instance) {
			instance = new AuthentificationService();
		}
		return instance;
	}
	async _loginUser(dataUser, activity) {
		activity.setState({ loading: true });
		let url = BASEURL + 'login';
		try {
			await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: dataUser.username,
					password: dataUser.password
				})
			})
				.then(response => response.json())
				.then(responseJson => {
					if (responseJson.error_message != null) {
						throw responseJson.error_message;
					} else {
						let users = {
							auth: 'YHHTHTHHT12354885566',
							pseudo: responseJson.username,
							code: responseJson.code
						};
						Utils._saveItem('dataUser', JSON.stringify(users));
						activity.props.navigation.navigate('App');
					}
				});
			activity.setState({ loading: false });
		} catch (error) {
			activity.setState({ loading: false });
			throw error;
		}
	}
	async doLogin(activity) {
		activity.setState({ loading: true });
		try {
			let userInfo = await UserService.getUserInfo(activity.state.account_id, activity);
			await Utils._saveItem('userInfo', JSON.stringify(userInfo));
			let users = {
				token: activity.state.token,
				pseudo: userInfo.username,
				code: activity.state.account_id
			};
			await Utils._saveItem('dataUser', JSON.stringify(users));
			activity.props.navigation.navigate('App',{avatar:null});
		} catch (error) {
			throw error.toString();
		} finally {
			activity.setState({ loading: false });
		}
	}
	async _logout(key) {
		try {
			await Utils.removeItem(key);
		} catch (error) {
			throw error;
		}
	}
}
export default AuthentificationService.getInstance();
