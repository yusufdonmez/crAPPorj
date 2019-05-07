import React, { Component } from 'react';
import {StyleSheet, Dimensions} from "react-native";
import { Container, Tabs, Tab, ScrollableTab} from 'native-base';
import ActivityTrips from '../SubTabs/ActivityTrips';
import BookedTrips from '../SubTabs/BookedTrips';
import HistoryTrips from '../SubTabs/HistoryTrips';
import * as theme from '../assets/theme'

const dimen = Dimensions.get('window');
class TripsPage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Container >
                <Tabs tabBarUnderlineStyle={{backgroundColor: global.programSecondaryColor}} renderTabBar={()=>
                    <ScrollableTab style={{backgroundColor:theme.COLORS.Primary}}/>}>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        heading="Activity">
                        <ActivityTrips />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}}  
                        heading="Booked">
                        <BookedTrips />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}}  
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