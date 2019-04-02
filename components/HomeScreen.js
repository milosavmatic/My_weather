import React, { Component } from 'react';
import { View ,Text ,Button, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { fetchLocationId, fetchWeather } from '../apiData/api'
import SearchInput from '../components/SearchInput'

class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            location: '',
            temperature: 0,
            weather: '',
            error: false
        }
    }

    componentDidMount(){
        // this.handleUpdateLocation('San Francisco')
    }
    
    handleUpdateLocation = async city => {
        if(!city) return;
      
        this.setState(async () => {
          try {
            const locationId = await fetchLocationId(city)
            const { location, weather, temperature, weekWeather} = await fetchWeather(locationId)
    
            this.setState({
              error: false,
              location,
              weather,
              temperature,
              weekWeather,
            })
          } catch (e) {
            this.setState({
              error: true
            })
          }
        })
      }
      
    loadWheather = () => {
      // 1. load from server
      // 2. present in new screen
      const { location, weather, temperature, weekWeather } = this.state
      if (location.length < 1) {
        return
      }
      this.props.navigation.navigate('Details', {
        location: location,
        temp: temperature,
        weather: weather,
        weekWeather,
      });
    };


    render() { 
        const {location, weather, temperature} = this.state
        // console.log(location)
        // console.warn(weather)
        return ( 
            <KeyboardAvoidingView style = {styles.container}>
            <Text style = {{color: 'white'}}>{location}</Text>
            <SearchInput 
              onSubmit = {this.handleUpdateLocation}
            />
                
                <Button 
                title = 'Save'
                onPress = {this.loadWheather}
                />
            </KeyboardAvoidingView>
         );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    })
