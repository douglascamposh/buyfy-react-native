import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, AsyncImage } from '../common';
import { FontWeight, Size, Colors } from '../../constants/Styles';

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
          <CardSection style={styles.cardSectionStyle}>
            <View style={styles.containerLeft}>
              <Text style={styles.titleStyle}>
                {name}
              </Text>
              <Text numberOfLines={2} style={styles.descriptionStyle}>
                {description}
              </Text>
              <Text style={styles.titleStyle}>
                Bs. {price}
              </Text>
            </View>
            <View style={styles.containerRigth}>
              <AsyncImage image={imageRoute} style={styles.imageStyle} ></AsyncImage>
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: Size.titleCard,
    paddingLeft: 15,
    marginTop: 10,
    flex: 1,
    fontWeight: FontWeight.titleCard,
  },
  descriptionStyle: {
    fontSize: Size.descriptionCard,
    paddingLeft: 15,
    marginTop: 10,
    flex: 1,
    fontWeight: FontWeight.descriptionCard,
    color: Colors.secondaryText
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
  },
  imageStyle: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  }
};

export default ProductListItem;
