import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  ScrollView
} from "react-native";
import getImageForWeather from "../apiData/getImageForWeather";

class DetailsScreen extends Component {
  state = {};

  renderMotivationMessage = weather => {
    console.log("weather", weather);
    switch (weather) {
      case "Showers":
        return "Take your umbrella with you!";
      case "Heavy Cloud":
        return "No sun today!";

      case "Light Cloud":
        return "No sun today or maybe!";
      case "Heavy Rain":
        return "YOU WILL BE WET!";

      case "Light Rain":
        return "Take your umbrella with you!";

      default:
        return null;
    }
  };
  render() {
    const { navigation } = this.props;
    const { weekWeather, location, temp, weather } = navigation.state.params;
    const motivationMessage = this.renderMotivationMessage(weather);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <ScrollView style={{ flex: 1 }}>
            <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
            <Text style={[styles.textStyle, styles.smallText]}>
              {Math.round(temp)}
            </Text>
            <Text style={[styles.textStyle, styles.largeText]}>{weather}</Text>
            {weekWeather.map(day => {
              return <Text>{day.the_temp}</Text>;
            })}
          </ScrollView>
          {motivationMessage && (
            <Text style={[styles.smallText, styles.textStyle]}>
              {motivationMessage}
            </Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

export default DetailsScreen;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    color: "white",
    ...Platform.select({
      ios: {
        fontFamily: "AvenirNext-Regular"
      },
      android: {
        fontFamily: "Roboto"
      }
    })
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: "#34495E"
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }
});
