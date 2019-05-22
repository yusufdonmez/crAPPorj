import React, { Component } from "react";

import {StyleSheet, Dimensions} from "react-native";
import { Container, Tabs, Tab, ScrollableTab} from 'native-base';
import TripInfo from './TripInfo'
import TripMessages from './TripMessages'
import TripUserInfo from './TripUserInfo'
import * as theme from '../../assets/theme'

class TripDetail extends Component {
    constructor(props){
        super(props)

    }

    componentDidMount(){
        {/* With this.props.tripID 
            => Fetch trip details and pass these info to Trip Tabs*/}
    }

    render() {
        return (
            <Container >
                <Tabs initialPage={this.props.initialPage} tabBarUnderlineStyle={{backgroundColor: global.programSecondaryColor}} 
                    renderTabBar={()=>
                    <ScrollableTab style={{backgroundColor:theme.COLORS.Primary}}/>}>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        heading="Trip">
                        <TripInfo />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}}  
                        heading="Messages">
                        <TripMessages />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}}  
                        heading="User">
                        <TripUserInfo />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
export default TripDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});