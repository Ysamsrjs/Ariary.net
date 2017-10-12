/* @flow */

import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import MainAchat from '../Transaction/Achat/MainAchat';
import Offrir from '../Transaction/Offrir/Offrir';
import ProfileAriary from '../CompteAriary/Profile/ProfileAriary';
import SideBar from '../SideBar/';
import Apropos from '../Apropos';
import LogOut from '../CompteAriary/SignOut/LogOut';
import MainConfig from '../CompteAriary/Config/MainConfig';

const DrawerExample = DrawerNavigator(
	{
		Profile: { screen: ProfileAriary },
		Achat: { screen: MainAchat },
		Offrir: { screen: Offrir },
		Profile: { screen: ProfileAriary },
		Config: { screen: MainConfig },
		Apropos: { screen: Apropos },
		Deconnexion: { screen: LogOut }
	},
	{
		initialRouteName: 'Profile',
		contentOptions: {
			activeTintColor: '#00C853'
		},
		contentComponent: props => <SideBar {...props} />
	}
);

export default DrawerExample;
