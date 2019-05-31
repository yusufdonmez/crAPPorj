import React, { Component } from "react";
import { View, Text, StyleSheet,Dimensions} from "react-native";
import { Container, Content,Grid,Col,Row,Icon,Item, Tabs, Tab, ScrollableTab} from 'native-base';

const {width,height} = Dimensions.get('window')
const _from= "8 Şubat Cum 17:00"
const _to= "10 Şubat Cum 18:30"
const _loc = "Derince, KOCAELİ"
const _cost = "500.00SAR"
const _protetion = "Premium"
const _plate = "41ABC001"

class TripInfo extends Component {
    render() {
        return (
        <Content>
            <Grid style={{paddingHorizontal:10}}>
                <Row style={[styles.infoRow,{justifyContent: 'center',paddingVertical:30}]}>
                    <View style={{}}>                
                        <Text numberOfLines={2} style={styles.dateText}>{_from}</Text>
                    </View>
                    <View style={{}}>
                        <Icon name="arrow-right" type="Entypo" />
                    </View>
                    <View style={{}}>                
                        <Text numberOfLines={2} style={styles.dateText}>{_to}</Text>
                    </View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>LAX -Los Angeles, CA</Text></View>
                    <Icon name="location-on" type="MaterialIcons" style={{color:'#aaa',alignSelf:'center'}} />                    
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Miles included</Text></View>
                    <View style={styles.value}><Text style={styles.valueText}>1,0000</Text></View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Total cost</Text></View>
                    <View style={styles.value}><Text style={styles.valueText}>0.00SAR</Text></View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Protection</Text></View>
                    <View style={styles.value}><Text style={styles.valueText}>Basic</Text></View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>Yusuf Dönmez's Toyota Corolla sedan</Text></View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.valueText}>41ABC001</Text>
                        <Icon name="chevron-right" type="MaterialIcons" style={styles.valueText}/>
                    </View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Status</Text></View>
                    <View style={styles.value}><Text style={styles.valueText}>Accepted</Text></View>
                </Row>
                <Row style={styles.infoRow}>
                    <View style={styles.title}><Text style={styles.titleText}>Reservation ID</Text></View>
                    <View style={styles.value}><Text style={styles.valueText}>#4121</Text></View>
                </Row>
            </Grid>
        </Content>
        );
    }
}
export default TripInfo;

const styles = StyleSheet.create({
    infoRow:{
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        paddingVertical:15,
        borderBottomWidth:1,
        borderBottomColor:'#aaa',
    },
    title:{
        maxWidth: 0.7*width,
    },
    value:{
    },
    dateText:{
        fontFamily: 'FontAwesome',
        fontSize:24,
        fontWeight: 'bold',
        color:'#000',
        width: 0.4 * width,
        textAlign: 'center'
        
    },
    titleText:{
        fontFamily: 'FontAwesome',
        fontSize:18,
        fontWeight: '400',
        color:'#000',
    },
    valueText:{
        fontFamily: 'FontAwesome',
        fontSize:18,
        fontWeight: '400',
        color:'#aaa',
    }
});