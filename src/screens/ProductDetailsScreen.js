import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class ProductDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: 'Details',
        headerRight: () => (
          <Button title="Settings" onPress={() => navigation.navigate('Products')}/>
        )
      }
    }

    render() {
      return (
        <View>
          <Text>detail Screen</Text>
          <Text>detail Screen</Text>
          <Text>detail Screen</Text>
          <Text>detail Screen</Text>
          <Text>detail Screen</Text>
          <Text>detail Screen</Text>
        </View>
      );
    }
  }

export default ProductDetailScreen;
