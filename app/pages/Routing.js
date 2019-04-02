import React, { Component } from 'react'
import { Text, View, Platform, Dimensions, StatusBar , StyleSheet } from 'react-native';
import { Router, Scene, Actions, Modal } from 'react-native-router-flux';

import HomeScreen from './HomeScreen';
import TripsPage from './TripsPage';
import MessagesPage from './MessagesPage';
import HostPage from './HostPage';
import ProfileTab from './ProfileTab';
import CarDetails from './CarDetails';
import CarList from './CarList';
import SignIn from './SignIn';
import FeatureList from './FeatureList'
import ReviewList from './ReviewList'
import PickupAndReturn from './PickupAndReturn'
import CheckoutPage from './CheckoutPage';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../locales/i18n'

import BookedTrips from './BookedTrips';
import ActivityTrips from './ActivityTrips';
import Guidelines from './Guidelines';
import FAQuestions from './FAQuestions';
import ProfilePage from './ProfilePage';
import Favorites from './Favorites';
import Account from './Account';

import { Icon } from 'native-base';
import { TouchableHighlight } from 'react-native-gesture-handler';
import HistoryTrips from './HistoryTrips';

const dimen = Dimensions.get('window');

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
				<Modal  hideNavBar>
					<Scene key="root">
					{/* Tab Container */}
						<Scene 
						key="tabbar"
						tabs={true} 
						hideNavBar
						inactiveTintColor='white'
						activeTintColor={global.programSecondaryColor}
						tabBarStyle={{ backgroundColor: global.programPrimaryColor,color:'white' }}>

						{/* Tabs */}
						<Scene key="HomeScreen" title={strings('tabs.search')} component={HomeScreen} hideNavBar initial={true}
							icon={({ focused }) => (<FontAwesomeIcon name='search' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />
					
						<Scene key="Trips" title={strings('tabs.trips')} title="TRIPS" wrap component={TripsPage}
							tabBarOnPress={() => { this.props.SignedIn ? Actions.Trips() : Actions.SignIn() }}
							icon={({ focused }) => (<FontAwesomeIcon name='road' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

						<Scene key="Messages" title={strings('tabs.messages')} component={MessagesPage} wrap
							tabBarOnPress={() => { this.props.SignedIn ? Actions.Messages() : Actions.SignIn() }}
							icon={({ focused }) => (<FontAwesomeIcon name='comments' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

						<Scene key="Host" title={strings('tabs.host')} component={HostPage} wrap
							tabBarOnPress={() => { this.props.SignedIn ? Actions.Host() : Actions.SignIn() }}
							icon={({ focused }) => (<FontAwesomeIcon name='car' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

						<Scene key="Profile" title={strings('tabs.profile')} component={ProfileTab} wrap
							icon={({ focused }) => (<FontAwesomeIcon name='user' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

					</Scene>

						<Scene
							direction="vertical"
							key="CarDetails"
							component={CarDetails}
							renderRightButton={() => (
								<TouchableHighlight onPress={() => {Actions.refs.CarDetails.shareCar()} }>
									<Icon name='share' size={24} style={{ color: 'white', paddingRight: 10 }} />
								</TouchableHighlight>)}
						/>

						<Scene
							clone
							direction="vertical"
							key="CarList"
							component={CarList}
							title="Car List"
						/>

						<Scene
							direction="vertical"
							key="ActivityTrips"
							component={ActivityTrips}
							title="Activity Trips"
						/>
						<Scene
							direction="vertical"
							key="BookedTrips"
							component={BookedTrips}
							title="Booked Trips"
						/>

						<Scene
							direction="vertical"
							key="HistoryTrips"
							component={HistoryTrips}
							title="History Trips"
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
							renderRightButton={() => (
								<TouchableHighlight style={{backgroundColor:'#231f20'}} onPress={() => {Actions.refs.ProfilePage.editProfileModal()} }>
									<Icon name="create" size={24} style={{ color: 'white',backgroundColor:'#231f20', paddingRight: 10 }} />
								</TouchableHighlight>)}
						/>

						<Scene
							backTitleEnabled={false}
							direction="vertical"
							key="CheckoutPage"
							component={CheckoutPage}
							title="CHECKOUT"
						/>
						<Scene
							backTitleEnabled={false}
							direction="vertical"
							key="FAQuestions"
							component={FAQuestions}
							title="FAQ"
						/>
						<Scene
							backTitleEnabled={false}
							direction="vertical"
							key="Guidelines"
							component={Guidelines}
							title="GUIDELINES"
						/>
						<Scene
							backTitleEnabled={false}
							direction="vertical"
							key="Favorites"
							component={Favorites}
							title="FAVORITES"
						/>
						<Scene
							backTitleEnabled={false}
							direction="vertical"
							key="Account"
							component={Account}
							title="ACCOUNT"
						/>

					</Scene>


					<Scene
						key="SignIn"
						direction="vertical"
						component={SignIn}
						title="Sign In"
						hideNavBar
					/>
				</Modal>
			</Router>
		);
	}

}

export default Routing;


const styles = StyleSheet.create({
    tabBarStyle: {
        marginTop: ( Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896)) ) ? 
		( 44 ) : StatusBar.currentHeight,
		backgroundColor:'#231f20',
		justifyContent: 'center'
    }
});