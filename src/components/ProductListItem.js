import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';

class ProductListItem extends Component {

  onRowPress() {
    consol.log("press button");
  }

  render() {
    const {name, description, price} = this.props.product;
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
