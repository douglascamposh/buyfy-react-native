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
        <CardSection style={styles.cardSectionStyle}>
          <View style={styles.containerLeft}>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Text style={styles.contentStyle}>
              {description}
            </Text>
            <Text style={styles.titleStyle}>
              Bs. {price}
            </Text>
          </View>
          <View style={styles.containerRigth}>
            <AsyncImage image={imageRoute} style={{ flex: 1, resizeMode: 'contain' }} ></AsyncImage>
          </View>
        </CardSection>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 14,
    paddingLeft: 15,
    marginTop: 10,
    flex: 1,
    fontWeight: 'bold',
  },
  contentStyle: {
    fontSize: 14,
    paddingLeft: 15,
    marginTop: 10,
    flex: 1,
  },
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerLeft: {
    flex: 2
  },
  containerRigth: {
    flex: 1
  }
};

export default ProductListItem;
