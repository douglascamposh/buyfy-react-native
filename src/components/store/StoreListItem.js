import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { CardSection, AsyncImage} from '../common';

class StoreListItem extends Component {

  onRowPress() {
    this.props.storeOnClick(this.props.store);
  }

  render() {
    const { name, deliveryTime, deliveryPrice, imageName } = this.props.store;
    const imageRoute = imageName ? `images/${imageName}` : 'regalo.jpg';
    return(
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Text style={styles.titleStyle}>
              {deliveryTime} min - Bs. {deliveryPrice} envio
            </Text>
            <AsyncImage image={imageRoute} style={{width: '100%', height: 50, resizeMode: 'contain'}} ></AsyncImage>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default StoreListItem;
