import React, { Component } from "react";
import { 
    View,
    Text,SafeAreaView,
    StyleSheet
} from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from "react-native-router-flux";
import { Icon, Button } from 'native-base';
import * as theme from '../assets/theme'
class SearchModal extends Component {
    constructor(props){
        super(props)

        
    }
    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor: theme.COLORS.Primary}}>
                <Button transparent onPress={() => {Actions.HomeScreen();}} style={{width:'100%'}}>
                    <Icon name="close" size={22} style={{padding:10,color:'white'}} />
                </Button>
                <GooglePlacesAutocomplete
                    placeholder='Enter city, airport, or address'
                    minLength={1}
                    autoFocus={true}
                    returnKeyType={'search'}
                    fetchDetails={true}
                    currentLocation={false}
                    placeholderTextColor='white'
                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_1']}
                    onSubmitEditing={() => {   } }
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        Actions.HomeScreen();
                        console.log(details.geometry.viewport);
                        Actions.CarList({
                            searchTitle:details.name,
                            northeastLat:details.geometry.viewport.northeast.lat,
                            northeastLng:details.geometry.viewport.northeast.lng,
                            southwestLat:details.geometry.viewport.southwest.lat,
                            southwestLng:details.geometry.viewport.southwest.lng,
                            searchLat:details.geometry.location.lat,
                            searchLng:details.geometry.location.lng
                        })
                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyABDf40Ndekbvz3thzhZUV3-weYCA8vxBg',
                        language: 'en', // language of the results
                        types: '(cities)' // default: 'geocode'
                    }}
                    styles={{
                        poweredContainer:{
                            backgroundColor: '#231f20',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        },
                        description: {
                            fontSize:18,
                            fontWeight: '700',
                            color:'white'
                        },
                        powered: {
                            backgroundColor: '#231f20',
                            color:'white'
                        },
                        listView: {
                            color:'white'
                        },
                        row: {
                            backgroundColor:'#231f20',
                            color:'white'
                        },
                        separator: {
                            backgroundColor:'#231f20'
                        },
                        textInputContainer: {
                            width:'100%',
                            backgroundColor: '#231f20',
                            color: 'white',
                            borderTopWidth: 0
                        },
                        textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 50,width:'90%',
                            color: 'white',
                            backgroundColor: '#231f20',
                            fontSize: 16
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        },
                    }}
                    />
            </SafeAreaView>
        );
    }
}
export default SearchModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});