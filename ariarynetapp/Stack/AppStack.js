//import liraries
//RJS
import React from 'react';

import { Platform } from 'react-native';
import { Root } from 'native-base';
import { StackNavigator } from 'react-navigation';

import Drawer from '../Components/NavigationAriary/Drawer';
import MainAchat from '../Components/Transaction/Achat/MainAchat';
import Offrir from '../Components/Transaction/Offrir/Offrir';
import ProfileAriary from '../Components/CompteAriary/Profile/ProfileAriary';
import EditPassword from '../Components/CompteAriary/Config/EditPassword';
import EditPhone from '../Components/CompteAriary/Config/EditPhone';
import MainConfig from '../Components/CompteAriary/Config/MainConfig';
import EditMail from '../Components/CompteAriary/Config/EditMail';
import EditName from '../Components/CompteAriary/Config/EditName';
import EditBirthday from '../Components/CompteAriary/Config/EditBirthday';
import EditPseudo from '../Components/CompteAriary/Config/EditPseudo';
import MainInscription from '../Components/CompteAriary/Inscription/InscriptionNormale/MainInscription';
import MainValidation from '../Components/CompteAriary/Inscription/ValidationCompte/';
import Apropos from '../Components/Apropos';
import Validation from '../Components/CompteAriary/Inscription/InscriptionNormale/Recap/';
import ValidationCompte from '../Components/CompteAriary/Inscription/ValidationCompte/Recap/';
import Shownotif from '../Components/Shownotif';

const AppStack = StackNavigator(
	{
		Drawer: { screen: Drawer },

		Achat: { screen: MainAchat },
		Offrir: { screen: Offrir },

		Inscription: { screen: MainInscription },
		Validation: { screen: MainValidation },
		ValidationCompte: { screen: ValidationCompte },
		ValidationInscription: { screen: Validation },

		Config: { screen: MainConfig },
		EditPassword: { screen: EditPassword },
		EditPhone: { screen: EditPhone },
		EditPseudo: { screen: EditPseudo },
		EditMail: { screen: EditMail },
		EditName: { screen: EditName },
		EditBirthday: { screen: EditBirthday },

		About: { screen: Apropos },
		Profile: { screen: ProfileAriary },
		Notification: { screen: Shownotif }
	},
	{
		initialRouteName: 'Drawer',
		headerMode: 'none'
	}
);
export default AppStack;
