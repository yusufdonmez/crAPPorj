import  React, {Component} from 'react'
import { Text } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';

import HomeScreen from './HomeScreen';
import TripsPage from './TripsPage';
import MessagesPage from './MessagesPage';
import HostPage from './HostPage';
import ProfilePage from './ProfilePage';
import CarDetails from './CarDetails';
import SignIn from './SignIn';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/FontAwesome'
import { strings } from '../locales/i18n'

class Routing extends Component {
  constructor(props){
    super(props);

    this.shareCar = this.shareCar.bind(this)

  }

  shareCar(){
    console.warn('Sahre Car');
  }

  render(){
    return (
      <Router 
        navBarButtonColor='white'
        navigationBarStyle={{ backgroundColor: global.programPrimaryColor}}>
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
                  icon={({focused}) => (<Icon name='search' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

            <Scene key="Trips" title={strings('tabs.trips')} component={TripsPage} hideNavBar
                   tabBarOnPress={() => { this.props.SignedIn ? Actions.Trips() : Actions.SignIn()}} 
                   icon={({focused}) => (<Icon name='road' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

            <Scene key="Messages" title={strings('tabs.messages')} component={MessagesPage} hideNavBar
                   tabBarOnPress={() => { this.props.SignedIn ? Actions.Messages() : Actions.SignIn()}} 
                   icon={({focused}) => (<Icon name='comments' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

            <Scene key="Host" title={strings('tabs.host')} component={HostPage} hideNavBar
                   tabBarOnPress={() => { this.props.SignedIn ? Actions.Host() : Actions.SignIn()}} 
                   icon={({focused}) => (<Icon name='car' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

            <Scene key="Profile" title={strings('tabs.profile')} component={ProfilePage} hideNavBar
                  icon={({focused}) => (<Icon name='user' color={focused ? global.programSecondaryColor : 'white'} size={24} />)} />

          </Scene>

          <Scene
            key="SignIn"
            direction="vertical"
            component={SignIn}
            title="Sign In"
            hideNavBar
            hideTabBar
          />
          <Scene
            hideTabBar
            direction="vertical"
            key="CarDetails"
            component={CarDetails}
            title="Car Details"
            renderRightButton={() => (<Icon name='share' size={24} style={{color:'white',paddingRight:10}} />)}
            onRight={() => this.shareCar}
          />
        </Scene>
      </Router>

    );
  }

}

export default Routing;