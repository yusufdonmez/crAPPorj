import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Router, Scene, Actions, Modal } from 'react-native-router-flux';

import HomeScreen from './HomeScreen';
import TripsPage from './TripsPage';
import MessagesPage from './MessagesPage';
import HostPage from './HostPage';
import ProfilePage from './ProfilePage';
import CarDetails from './CarDetails';
import CarList from './CarList';
import SignIn from './SignIn';
import FeatureList from './FeatureList'
import ReviewList from './ReviewList'
import PickupAndReturn from './PickupAndReturn'
import CheckoutPage from './CheckoutPage';

import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../locales/i18n'

import { Container, Content, CardItem, Card, Left, Body, Right, ListItem } from "native-base";

class Routing extends Component {
	constructor(props) {
		super(props);

		this.shareCar = this.shareCar.bind(this)

	}

	shareCar() {
		console.warn('Sahre Car');
	}

	render() {
		return (
			<Router
				navBarButtonColor='white'
				navigationBarStyle={{ backgroundColor: global.programPrimaryColor }}>
				<Scene key="root">
					{/* Tab Container */}
					<Scene
						hideNavBar
						key="tabbar"
						tabs={true}
						inactiveTintColor='white'
						activeTintColor={global.programSecondaryColor}
						tabBarStyle={{ backgroundColor: global.programPrimaryColor }}>

						{/* Tabs */}
						<Scene key="HomeScreen" title={strings('tabs.search')} component={HomeScreen} hideNavBar
							icon={({ focused }) => (<Icon name='search' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

						<Scene key="Trips" title={strings('tabs.trips')} component={TripsPage} hideNavBar
							tabBarOnPress={() => { this.props.SignedIn ? Actions.Trips() : Actions.SignIn() }}
							icon={({ focused }) => (<Icon name='road' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

						<Scene key="Messages" title={strings('tabs.messages')} component={MessagesPage} hideNavBar
							tabBarOnPress={() => { this.props.SignedIn ? Actions.Messages() : Actions.SignIn() }}
							icon={({ focused }) => (<Icon name='comments' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

						<Scene key="Host" title={strings('tabs.host')} component={HostPage} hideNavBar
							tabBarOnPress={() => { this.props.SignedIn ? Actions.Host() : Actions.SignIn() }}
							icon={({ focused }) => (<Icon name='car' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

						<Scene key="Profile" title={strings('tabs.profile')} component={ProfilePage} hideNavBar
							icon={({ focused }) => (<Icon name='user' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

					</Scene>

					<Scene
						key="SignIn"
						direction="vertical"
						component={SignIn}
						title="Sign In"
						hideNavBar
					/>
					
					<Scene
						hideTabBar
						direction="vertical"
						key="CarDetails"
						component={CarDetails}
						renderRightButton={() => (<Icon name='share' size={24} style={{ color: 'white', paddingRight: 10 }} />)}
						onRight={() => this.shareCar}
					/>

					<Scene
						direction="vertical"
						key="CarList"
						component={CarList}
						title="Car List"
					/>

					<Scene
						direction="vertical"
						key="Features"
						component={FeatureList}
						title="FEATURES"
					/>

					<Scene
						backTitleEnabled={false}
						direction="vertical"
						key="Reviews"
						component={ReviewList}
						title="REVIEWS FROM GUESTS"
					/>
					<Scene
						backTitleEnabled={false}
						direction="vertical"
						key="PickupAndReturn"
						component={PickupAndReturn}
						title="Pickup And Return"
					/>

					<Scene
						backTitleEnabled={false}
						direction="vertical"
						key="ProfilePage"
						component={ProfilePage}
						title="PROFILE"
					/>

					<Scene
						backTitleEnabled={false}
						direction="vertical"
						key="CheckoutPage"
						component={CheckoutPage}
						title="CHECKOUT"
					/>
				</Scene>
			</Router>
			

		);
	}

}

export default Routing;