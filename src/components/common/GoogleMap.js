import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions, Alert } from 'react-native';
import { Spinner } from './Spinner';

class GoogleMap extends Component {

  // _isGranted = '';

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    }
  }

  verifyPermission = async() => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    return status;
  }

  componentDidMount() {
    // this._isGranted = this.verifyPermission();
    // if (this._isGranted !== 'granted') { // ToDo: We should render a page to display an alert
    //   this.showAlert()
    // }
    navigator.geolocation.getCurrentPosition(
      ({coords: { latitude, longitude }}) => {
        this.setState({ latitude, longitude })
      },
      (positionError) => console.log('Error at get position', positionError)
    );
  }

  showAlert = () => {
    Alert.alert(
      'Permisos',
      'Necesitas dar permisos para ver tu posicion en el mapa',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'OK', onPress: () => this._isGranted = this.verifyPermission() }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { latitude, longitude } = this.state;
    if(latitude) {
      return (
        <View style={styles.container}>
          <MapView
            showsUserLocation
            style={styles.mapStyle}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.006757,
              longitudeDelta: 0.008866
            }}
            showsCompass={true}
        />
        </View>
      );
    }
    return <Spinner size="large"/>;
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
};

export { GoogleMap };
