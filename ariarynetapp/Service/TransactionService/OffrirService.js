
const BASEURL = 'http://54.229.79.45/ariary2API/web/api/';

// create a component
let instance=null;
class OffrirService {
	static getInstance() {
		if (!instance) {
			instance = new OffrirService();
		}
		return instance;
	}
	async _validerOffre(activity) {
		activity.setState({ loading: true, erreur: '' });
		let url = BASEURL + 'transaction';
		try {
			let param_to_send = {
				senderId: activity.state.sender,
				recipientId: activity.state.recipient,
				amount: activity.state.amount,
				comment: activity.state.message
			};
			let options = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(param_to_send)
			};
			await fetch(url, options)
				.then(response => response.json())
				.then(responseJson => {
					console.log(responseJson);
					if (responseJson.error_message != null) {
						throw responseJson.error_message;
					} else {
						let success = responseJson.result;
						if (success == 'success') {
							activity._onsSuccess(activity.state.amount, responseJson.balence);
						}
					}
				});
			activity.setState({ loading: false });
		} catch (error) {
			activity.setState({ loading: false });
			throw error;
		}
	}
}
//make this component available to the app
export default OffrirService.getInstance();
