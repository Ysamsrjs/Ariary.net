//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Loader from '../Components/Home/';
import StartStack from './StartStack';
import AppStack from './AppStack';
import Login from '../Components/CompteAriary/Login/';
import Accueil from '../Components/Home/Accueil';
import MainInscription from '../Components/CompteAriary/Inscription/InscriptionNormale/MainInscription';
import Validation from '../Components/CompteAriary/Inscription/InscriptionNormale/Recap/';

const MainStack = StackNavigator(
	{
		Loader: { screen: Loader },
		StartAriary: { screen: StartStack },
		App: { screen: AppStack },
		Login: { screen: Login },
		Accueil:{ screen: Accueil },
		MainInscription:{ screen: MainInscription },
		ValidationInscription:{screen:Validation},

	},
	{
		headerMode: 'none'
	}
);
export default MainStack;
