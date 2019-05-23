import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";

import {Actions} from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Container, Content ,Button, List, ListItem, Left, Thumbnail, Body, Icon, Right } from "native-base";

class ActivityTrips extends Component {
    
    render() {
        const data = Array.from({length: 10});
        return (
            <Container>
                <Content>
                    <View style={{margin:5,padding:5,borderBottomWidth:1,borderBottomColor:'gray'}}>
                        <Text style={{textAlign:"center",fontSize:15,fontWeight: '700'}}>
                            NOTIFICATIONS
                        </Text>
                    </View>
                    <List>
                        {data.map((item, i) =>
                            <ListItem key={Math.random()} avatar onPress={() => {Actions.TripDetail();}}>
                                <Left>
                                    <Thumbnail source={require('../assets/user.jpeg')} />
                                </Left>
                                <Body>
                                    <Text style={{fontWeight: '700',color:'black',fontSize:16}}>Ali Zeynelabidin UZAR</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text note>Very nice car great owner he has very cool and helpful very good guy I will sure rent from in near feture.</Text>
                                    </View>

                                    <Text style={{fontWeight: '400',color:'gray',fontSize:14}} note>Fri, Feb 15 2:33 PM</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                        )}
                    </List>
                </Content>
            </Container>
        );
    }
}
export default ActivityTrips;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});