import React, { Component } from 'react'
import { Text, View, Platform, Dimensions, StatusBar , StyleSheet } from 'react-native';
import { Router, Scene, Actions, Modal } from 'react-native-router-flux';

import HomeScreen from '../Tabs/HomeScreen';
import TripsPage from '../Tabs/TripsPage';
import MessagesPage from '../Tabs/MessagesPage';
import HostPage from '../Tabs/HostPage';
import ProfileTab from '../Tabs/ProfileTab';

import CarDetails from './CarDetails';
import CarList from './CarList';
import CheckoutPage from './CheckoutPage';
import ProfilePage from './ProfilePage';
import Favorites from './Favorites';
import Account from './Account';
import MapViewComponent from './MapViewComponent';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../locales/i18n'

import ActivityTrips from '../SubTabs/ActivityTrips';
import BookedTrips from '../SubTabs/BookedTrips';
import HistoryTrips from '../SubTabs/HistoryTrips';

import Guidelines from '../SubPages/Guidelines';
import FAQuestions from '../SubPages/FAQuestions';
import FeatureList from '../SubPages/FeatureList'
import ReviewList from '../SubPages/ReviewList'
import PickupAndReturn from '../SubPages/PickupAndReturn'

import SignIn from '../Modals/SignIn';

import { Icon, Button } from 'native-base';
import { TouchableHighlight } from 'react-native-gesture-handler';
import SearchModal from '../Modals/SearchModal';

import * as theme from '../assets/theme'

const dimen = Dimensions.get('window');

class Routing extends Component {
	constructor(props) {
		super(props);


	}

	render() {
		return (
			<Router 
				navBarButtonColor='white'
				navigationBarStyle={{ backgroundColor: theme.COLORS.Primary }}>
				<Modal  hideNavBar>
					<Scene key="root" backTitleEnabled={false}>
					{/* Tab Container */}
						<Scene 
						key="tabbar"
						tabs={true} 
						backTitleEnabled={false}
						hideNavBar
						inactiveTintColor='white'
						activeTintColor={theme.COLORS.Secondary}
						tabBarStyle={{ backgroundColor: theme.COLORS.Primary,color:'white' }}>

							{/* Tabs */}
							<Scene key="HomeScreen" title={strings('tabs.search')} component={HomeScreen} hideNavBar initial={true} onEnter={() => {Actions.refs.HomeScreen.onEnter();}}
								backTitleEnabled={false} icon={({ focused }) => (<FontAwesomeIcon name='search' color={focused ? theme.COLORS.Secondary : 'white'} size={24} />)} />
						
							<Scene key="Trips" title={strings('tabs.trips')} title="TRIPS" wrap component={TripsPage}
								backTitleEnabled={false} tabBarOnPress={() => { global.isLogin ? Actions.Trips() : Actions.SignIn() }}
								icon={({ focused }) => (<FontAwesomeIcon name='road' color={focused ? theme.COLORS.Secondary : 'white'} size={24} />)} />

							<Scene key="Messages" title={strings('tabs.messages')} component={MessagesPage} wrap
								backTitleEnabled={false} tabBarOnPress={() => { global.isLogin ? Actions.Messages() : Actions.SignIn() }}
								icon={({ focused }) => (<FontAwesomeIcon name='comments' color={focused ? theme.COLORS.Secondary : 'white'} size={24} />)} />

							<Scene key="Host" title={strings('tabs.host')} component={HostPage} wrap
								backTitleEnabled={false} tabBarOnPress={() => { global.isLogin ? Actions.Host() : Actions.SignIn() }}
								icon={({ focused }) => (<FontAwesomeIcon name='car' color={focused ? theme.COLORS.Secondary : 'white'} size={24} />)} />

							<Scene key="Profile" title={strings('tabs.profile')} component={ProfileTab} wrap 
								onEnter={() => {Actions.refs.Profile.onEnter(global.isLogin)}}
								backTitleEnabled={false} icon={({ focused }) => (<FontAwesomeIcon name='user' color={focused ? theme.COLORS.Secondary : 'white'} size={24} />)} />

						</Scene>

						<Scene
							titleStyle={styles.programTitleStyle}
							direction="vertical"
							key="CarDetails"
							component={CarDetails} 
							backTitleEnabled={false}
							renderRightButton={() => (
								<TouchableHighlight onPress={() => {Actions.refs.CarDetails.shareCar()} }>
									<Icon name='share' size={24} style={{ color: 'white', paddingRight: 10 }} />
								</TouchableHighlight>)}
						/>

						<Scene
							titleStyle={styles.programTitleStyle}
							backTitleEnabled={false}
							key="MapViewComponent"
							component={MapViewComponent}
							title="Map"
						/>
						

						<Scene
							titleStyle={styles.programTitleStyle}
							clone
							backButtonTextStyle={{color:'#231f20'}}
							direction="vertical"
							key="CarList"
							backTitle=''
							component={CarList}
						/>

						<Scene
							backTitle=''
							titleStyle={styles.programTitleStyle}
							direction="vertical"
							key="ActivityTrips"
							backTitleEnabled={false}
							component={ActivityTrips}
							title="Activity Trips"
						/>
						<Scene
							titleStyle={styles.programTitleStyle}
							direction="vertical"
							key="BookedTrips"
							backTitleEnabled={false}
							component={BookedTrips}
							title="Booked Trips"
						/>

						<Scene
							direction="vertical"
							key="HistoryTrips"
							backTitleEnabled={false}
							component={HistoryTrips}
							title="History Trips"
						/>

						<Scene
							titleStyle={styles.programTitleStyle}
							direction="vertical"
							key="Features"
							backTitleEnabled={false}
							component={FeatureList}
							title="Features"
						/>

						<Scene
							titleStyle={styles.programTitleStyle}
							titleStyle={styles.programTitleStyle}
							backTitleEnabled={false}
							direction="vertical"
							key="Reviews"
							component={ReviewList}
							title="Reviews from guests"
						/>

						<Scene
							titleStyle={styles.programTitleStyle}
							clone
							backTitleEnabled={false}
							direction="vertical"
							key="ProfilePage"
							component={ProfilePage}
							title="Profile"
							renderRightButton={() => (
								<TouchableHighlight style={{backgroundColor:'#231f20'}} onPress={() => {Actions.refs.ProfilePage.editProfileModal()} }>
									<Icon name="create" size={24} style={{ color: 'white',backgroundColor:'#231f20', paddingRight: 10 }} />
								</TouchableHighlight>)}
						/>

						<Scene
							titleStyle={styles.programTitleStyle}
							backTitleEnabled={false}
							direction="vertical"
							key="CheckoutPage"
							component={CheckoutPage}
							title="Checkout"
						/>
						<Scene
							titleStyle={styles.programTitleStyle}
							backTitleEnabled={false}
							direction="vertical"
							key="FAQuestions"
							component={FAQuestions}
							title="FAQ"
						/>
						<Scene
							titleStyle={styles.programTitleStyle}
							backTitleEnabled={false}
							direction="vertical"
							key="Guidelines"
							component={Guidelines}
							title="Guidelines"
						/>
						<Scene
							titleStyle={styles.programTitleStyle}
							clone
							backTitleEnabled={false}
							direction="vertical"
							key="Favorites"
							component={Favorites}
							title="Favorites"
						/>
						<Scene
							titleStyle={styles.programTitleStyle}
							clone
							backTitleEnabled={false}
							direction="vertical"
							key="Account"
							component={Account}
							title="Account"
						/>

					</Scene>

					<Scene
						key="SignIn"
						direction="vertical"
						component={SignIn}
						title="Sign In"
						hideNavBar
					/>

					<Scene
						titleStyle={styles.programTitleStyle}
						backTitleEnabled={false}
						direction="vertical"
						key="PickupAndReturn"
						component={PickupAndReturn}
						title="Pickup And Return"
					/>

					<Scene 
						hideNavBar hideTabBar
						titleStyle={styles.programTitleStyle}
						backTitleEnabled={false}
						direction="vertical"
						key="SearchModal"
						modal={false}
						component={SearchModal}
						title="Search"
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
	},
	programTitleStyle: {
		fontWeight: '900',
		fontSize:16,
		textTransform: 'uppercase'
	}
});