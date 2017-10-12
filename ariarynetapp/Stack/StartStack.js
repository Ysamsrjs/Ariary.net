//import liraries
//RJS
import React from 'react';
import { Platform } from 'react-native';
import { Root } from 'native-base';
import { StackNavigator } from 'react-navigation';


import Main from '../Components/CompteAriary/Inscription/InscriptionTemporaire/Main';
import Bienvenue from '../Components/CompteAriary/Inscription/InscriptionTemporaire/Bienvenue';
import AppStack from './AppStack';
import Validation from '../Components/CompteAriary/Inscription/InscriptionNormale/Recap/';
import MainInscription from '../Components/CompteAriary/Inscription/InscriptionNormale/MainInscription';

const StartStack = StackNavigator(
	{
		Main: { screen: Main },
		Bienvenue: { screen: Bienvenue },
		App: { screen: AppStack },
		MainInscription:{ screen: MainInscription },
		ValidationInscription:{screen:Validation},
	},
	{
		headerMode: 'none'
	}
);

export default StartStack;
