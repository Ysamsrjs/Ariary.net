
import UserService from '../InfoUser/UserService';
const BASEURL='http://54.229.79.45/ariary2API/web/api/';
let instance = null;
// create a component
class SoldeService {
    static getInstance() {
        if (!instance) {
            instance = new SoldeService()
        }
        return instance
    }
    async getSolde(account_id,activity){
        let url=BASEURL +'balence/'+account_id;
        let solde=0;
        try {
            await UserService.verifyUser(
                activity.props.navigation.state.params.username,
                activity.state.password,
                activity
            );
            await fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson);
                    if (responseJson.error_message != null) {
                        throw responseJson.error_message;
                    } else {
                       solde=responseJson.balence;
                    }
                });
        } catch (error) {
            throw error;
        }
        return solde;
    }
}
export default SoldeService.getInstance();
