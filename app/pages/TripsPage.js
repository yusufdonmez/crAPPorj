import React, { Component } from 'react';
import {Button,View,Text,Platform,StyleSheet, Dimensions, StatusBar} from "react-native";
import { Actions } from 'react-native-router-flux';
import { Container, Tabs, Tab, ScrollableTab, Left, Header, Body, Right, Title } from 'native-base';
import ActivityTrips from './ActivityTrips';
import BookedTrips from './BookedTrips';
import HistoryTrips from './HistoryTrips';

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