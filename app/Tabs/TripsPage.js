import React, { Component } from 'react';
import {StyleSheet, Dimensions} from "react-native";
import { Container, Tabs, Tab, ScrollableTab} from 'native-base';
import ActivityTrips from '../SubTabs/ActivityTrips';
import BookedTrips from '../SubTabs/BookedTrips';
import HistoryTrips from '../SubTabs/HistoryTrips';

const dimen = Dimensions.get('window');
class TripsPage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Container >
                <Tabs tabBarUnderlineStyle={{backgroundColor: global.programSecondaryColor}} renderTabBar={()=>
                    <ScrollableTab style={{backgroundColor:global.programPrimaryColor}}/>}>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:global.programPrimaryColor}} 
                        activeTabStyle={{backgroundColor:global.programPrimaryColor}} 
                        heading="Activity">
                        <ActivityTrips />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:global.programPrimaryColor}} 
                        activeTabStyle={{backgroundColor:global.programPrimaryColor}}  
                        heading="Booked">
                        <BookedTrips />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:global.programPrimaryColor}} 
                        activeTabStyle={{backgroundColor:global.programPrimaryColor}}  
                        heading="History">
                        <HistoryTrips />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default TripsPage;