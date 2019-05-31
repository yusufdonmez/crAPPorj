import React, { Component } from "react";

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
                        <TripInfo tripID={this.props.tripID} />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}}  
                        heading="Messages">
                        <TripMessages tripID={this.props.tripID} />
                    </Tab>
                    <Tab activeTextStyle={{color:'white'}} textStyle={{color:'gray'}} 
                        tabStyle={{backgroundColor:theme.COLORS.Primary}} 
                        activeTabStyle={{backgroundColor:theme.COLORS.Primary}}  
                        heading="User">
                        <TripUserInfo
                        photo={this.props.photo}
                        userName={this.props.userName}
                        mobile={this.props.mobile}
                        joinDate={this.props.joinDate}
                        isVerified={this.props.isVerified} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
export default TripDetail;