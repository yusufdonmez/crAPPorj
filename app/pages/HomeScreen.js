import React, { Component } from 'react';
import {
    Animated,
    StatusBar,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,} from "react-native";
    
import {Actions} from 'react-native-router-flux'
import HorizontalScrollCards from '../components/HorizontalScrollCards'
import { strings } from '../locales/i18n';

class HomeScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
            mySearchText:''
        };
        global.headerMaxHeight = 350;
        global.headerMinHeight = 120;
        global.headerScrollDistance = 230;
        
        this.searchCar = this.searchCar.bind(this)
    }
    
    _renderScrollViewContent() {
        const data = Array.from({length: 30});
        return (
          <View style={styles.scrollViewContent}>
            {data.map((_, i) =>
              <View key={i} style={styles.row}>
                <Text>{i}</Text>
              </View>
            )}
          </View>
        );
    }

    openCarDetails(item){
        Actions.CarDetails({title:item.name,itemDetails:item});
    }

    searchCar (){
        Actions.CarList({title:this.state.mySearchText});
    }

    render(){
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance],
            outputRange: [global.headerMaxHeight, headerMinHeight],
            extrapolate: 'clamp',
        });
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance / 2, headerScrollDistance],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });
        const searchMargin = this.state.scrollY.interpolate({
            inputRange: [0, headerScrollDistance-90],
            outputRange: [150, 30],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.fill}>
                <StatusBar barStyle="light-content" />
                <ScrollView style={styles.fill} 
                            scrollEventThrottle={16}
                            onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: { y: this.state.scrollY}}}]
                            )}>
                    <Animated.View style={{marginTop: headerHeight}}>
                        <HorizontalScrollCards openCarDetailsNav={this.openCarDetails.bind(this)}></HorizontalScrollCards>
                    </Animated.View>
                    <View style={{height:1000}}>
                        <Text>TEST</Text>
                    </View>
                </ScrollView>

                <Animated.View style={[styles.header, {height: headerHeight}]}>
                    <Animated.Image style={[ styles.backgroundImage,
                            {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                            ]}
                            source={require('../assets/homescreen.jpeg')}
                        />
                    <Animated.View style={[styles.bar, {marginTop:searchMargin}]}>
                        <Animated.Text style={[styles.title, {opacity:imageOpacity}]}>Way better than a rental car</Animated.Text>
                        <TextInput style={styles.searchText} secureTextEntry={false}
                            placeholder={strings('search')}
                            value={this.state.mySearchText}
                            onChangeText={text => this.setState({mySearchText:text})} 
                            onSubmitEditing={() => this.searchCar()} 
                            />

                    </Animated.View>
                </Animated.View>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor:'white'
  },
  insurancePartner: {
      borderRadius:20,
      width:200,
      height:40,
      backgroundColor:'white',
      fontSize:18,
      color:'gray',
      textAlign:'center'
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTitle:{
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#231f20',
    overflow: 'hidden',
  },
  bar: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 35,
    width:'100%',
    justifyContent:'center',
    textAlign:'center'
  },
  searchText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#9BA2A7',
    width:'90%',
    backgroundColor:'white',
    height:50,
    margin: 10,
  },
  scrollViewContent: {
    marginTop: global.headerMaxHeight,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: 350,
    resizeMode:'cover'
  },
});



export default HomeScreen;