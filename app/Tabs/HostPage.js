import React, { Component } from 'react';
import {StyleSheet, Dimensions} from "react-native";
import { Container, Tabs, Tab, ScrollableTab} from 'native-base';
import HostCars from '../HostTab/HostCars';
import HostReviews from '../HostTab/HostReviews';
import HostEarnings from '../HostTab/HostEarnings';
import * as theme from '../assets/theme'

export default class HostPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Container >
                <Tabs tabBarUnderlineStyle={{backgroundColor: global.programSecondaryColor}} renderTabBar={()=>
                    <ScrollableTab style={{backgroundColor:theme.COLORS.Primary}}/>}>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        heading="Cars">
                        <HostCars />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}}  
                        heading="Reviews">
                        <HostReviews userID={global.userId} />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}}  
                        heading="Earnings">
                        <HostEarnings />
                    </Tab>
                </Tabs>
            </Container>
        );
    }

}