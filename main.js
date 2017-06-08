import Expo, { MapView, Permissions, Location } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


class App extends React.Component {
  state = {
    region: {
      latitude: 37.525729,
      longitude: 15.072030,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    },
    location: {
      coords: {
        latitude: 37.525729,
        longitude: 15.072030
      }
    },
    errorMessage: null
  };

  componentWillMount() {
    this.retrieveUserLocation()
  }

  retrieveUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status != 'granted') {
      this.setState({ errorMessage: 'Permesso negato'});
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    this.setState({
      region: {
        ...this.state.region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
       }
     });
    console.log("location: ", location);
    this.marker.showCallout();
  }

  render() {
    const { width, height } = Dimensions.get('window');
    console.log("region: ", this.state.region);
    return (
      <View style={styles.container}>
        <MapView
          style={{ width, height }}
          initialRegion={this.state.region}
          region={this.state.region}
        >
          <MapView.Marker
              ref={ref => { this.marker = ref }}
              title="Current location"
              description="Somewhere where I am"
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
              }}
              pinColor="blue"
            />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

Expo.registerRootComponent(App);
