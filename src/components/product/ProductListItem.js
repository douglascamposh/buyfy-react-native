import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, AsyncImage} from '../common';

class ProductListItem extends Component {

  onRowPress() {
    this.props.productDetailOnClick(this.props.product);
  }

  render() {
    const {name, description, price, imageName} = this.props.product;
    const imageRoute = imageName ? `images/${imageName}` : 'regalo.jpg';
    return(
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Text style={styles.titleStyle}>
              {description}
            </Text>
            <Text style={styles.titleStyle}>
              {price}
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

export default ProductListItem;
