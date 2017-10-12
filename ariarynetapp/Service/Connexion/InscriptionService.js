import Utils from '../Utilities/Utils';

const BASEURL = 'http://54.229.79.45/ariary2API/web/api/';
import ImageUpload from '../Upload/ImageUpload';
let instance = null;
class InscriptionService {
	static getInstance() {
		if (!instance) {
			instance = new InscriptionService();
		}
		return instance;
	}
	/**
	 * Inscription Normale Ariary
	 * @param {*} dataInscription 
	 * @param {*} activity 
	 */
	async _registerUser(dataInscription, activity) {
		let msg = null;
		activity.setState({ loading: true });
		let url = BASEURL + 'register';
		try {
			await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataInscription)
			})
				.then(response => response.json())
				.then(responseJson => {
					console.log(responseJson);
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
			throw error.toString();
		}
	}
	/**
	 * Etape de l'inscription Normale
	 * @param {*} dataUser 
	 * @param {*} activity 
	 */
	_validateUser(activity) {
		let msg = null;
		try {
			console.log('page====' + activity.state.page);
			switch (activity.state.page) {
				case 0:
					if (activity.state.identity != null) {
						activity.refs['viewpager'].goToPage(activity.state.page + 1);
					} else {
						msg =
							'Toutes les information sont obligatoires. Veuillez verifier si vos identité sont exactes!!!! ';
						throw msg;
					}
					break;
				case 1:
					if (activity.state.contact != null) {
						activity.refs['viewpager'].goToPage(activity.state.page + 1);
					} else {
						msg =
							'Assurez-vous que tous les champs de contact sont remplis et que toutes les information sont exactes!!!';
						throw msg;
					}
					break;

				case 2:
					if (activity.state.data != null) {
						activity.props.navigation.navigate('ValidationInscription', { data: activity.state.data });
					} else {
						msg = "Merci de verifier vos informations d'inscriptions!!!";
						throw msg;
					}
					break;
			}
		} catch (error) {
			throw error;
		}
	}
	_goBack(activity) {
		try {
			switch (activity.state.page) {
				case 0:
					activity.props.navigation.goBack();
					break;
				case 1:
					activity.refs['viewpager'].goToPage(activity.state.page - 1);
					break;
				case 2:
					activity.refs['viewpager'].goToPage(activity.state.page - 1);
					break;
			}
		} catch (error) {
			throw error;
		}
	}
	_isEmptyField(data) {
		return (
			data.lot == '' ||
			data.codepostal == '' ||
			data.ville == '' ||
			data.pays == '' ||
			data.lot == null ||
			data.codepostal == null ||
			data.ville == null ||
			data.pays == null ||
			data.rue == null ||
			data.rue == ''
		);
	}
	isOptionalFieldEmpty(data) {
		return (
			data.precision_addr == '' ||
			data.numadresses == '' ||
			data.precision_addr == null ||
			data.numadresses == null
		);
	}
	hasOptionalFieldEmpty(data) {
		return (
			data.beneficiaire == null ||
			data.beneficiaire == '' ||
			data.numrec == '' ||
			data.numrec == null ||
			data.mailrec == '' ||
			data.mailrec == null
		);
	}
	_validationCompte(activity) {
		let msg = null;
		try {
			switch (activity.state.page) {
				case 0:
					if (activity.state.profile != null) {
						activity.refs['viewpager'].goToPage(activity.state.page + 1);
					} else {
						msg =
							"Veuillez verifier tous les information avant de passer à l'étape suivante, toutes les informations sont obligatoires";
						throw msg;
					}
					break;
				case 1:
					if (activity.state.addresse != null) {
						let data = activity.state.addresse;
						if (!this._isEmptyField(data)) {
							if (this.isOptionalFieldEmpty(data)) {
								msg =
									'Des informations concernant votre adresse sont vides. Il est preférable que vous completiez toutes les informations, Mais vous pouvez en passe se tel est votre choix';
								activity.setState({ optionRequest: true, message: msg });
							} else {
								activity.refs['viewpager'].goToPage(activity.state.page + 1);
							}
						} else {
							msg =
								'Veuillez renseigner sur les champs lot,code postal, ville, pays . Il sont obligatoires!!!!';
							throw msg;
						}
					} else {
						msg = 'Assurez-vous que toutes informations sont exactes!!!';
						throw msg;
					}
					break;

				case 2:
					if (activity.state.data != null) {
						let data = activity.state.data;
						if (this.hasOptionalFieldEmpty(data)) {
							msg =
								'Nous vous conseillons de bien remplir tous les champs pour completer vos identitées.Voulez vous poursuivre ?';
							activity.setState({ optionRequest: true, message: msg });
						} else {
							activity.setState({ optionRequest: false });
							activity.props.navigation.navigate('ValidationCompte', {
								data: activity.state.data,
								pseudo: activity.state.username
							});
						}
					} else {
						msg = 'Assurez-vous que toutes informations sont exactes!!!';
						throw msg;
					}
					break;
			}
		} catch (error) {
			throw error.toString();
		}
	}
	/**
	 * Inscription Temporaire
	 * @param {*} activity 
	 */
	async _registrationTemporaire(activity) {
		activity.setState({ loading: true });
		let dataInscription = {
			username: activity.state.pseudo,
			password: activity.state.password
		};
		let url = BASEURL + 'register1';
		try {
			Utils._isValidPass(activity.state.password);
			await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataInscription)
			})
				.then(response => response.json())
				.then(responseJson => {
					console.log(responseJson);
					if (responseJson.error_message != null) {
						throw responseJson.error_message;
					} else {
						let users = {
							auth: 'ds5d74ds56f4ds56f4sd5f4d65s',
							pseudo: responseJson.username,
							code: responseJson.code
						};
						Utils._saveItem('dataUser', JSON.stringify(users));
						activity.setState({ isLoggedIn: false });
						let data = {
							compte: responseJson.code + '',
							solde: responseJson.solde + '',
							pseudo: responseJson.username + ''
						};
						activity.props.navigation.navigate('Bienvenue', { data: data });
					}
				});
			activity.setState({ loading: false });
		} catch (error) {
			activity.setState({ loading: false });
			throw error.toString();
		}
	}
	async _saveUserValidation(data, activity) {
		activity.setState({ loading: true });
		let uploadResponse, uploadResult;
		let dataValidation = {
			account_id: data.account_id,
			rue: data.rue,
			lot: data.lot,
			code_postal: data.codepostal,
			ville: data.ville,
			pays: data.pays,
			precision: data.precision_addr,
			cin: data.cin,
			beneficiaire: data.beneficiaire,
			num_recup: data.numrec,
			mail_recup: data.mailrec
		};
		try {
			/**
			 * Upload Avatar Image
			 */
			let uploadResponseAv, uploadResultaV;
			uploadResponseAv = await ImageUpload.doUpload(
				data.pickerResultAvatar.uri,
				data.pickerResultCin.uri,
				dataValidation
			);
			uploadResultaV = await uploadResponseAv.json();

			console.log(uploadResultaV);

			if (uploadResultaV.error_message != null) {
				throw uploadResultaV.error_message;
			}
			//activity.props.navigation.navigate('Profile', { avatar: uploadResultaV.location });
		} catch (error) {
			throw error.toString();
		} finally {
			activity.setState({ loading: false });
		}
	}
}

export default InscriptionService.getInstance();
