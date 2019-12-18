import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from '../common';
import { FontWeight, Size, Colors } from '../../constants/Styles';
import { Icon } from 'react-native-elements';

class OrderListItem extends Component {

  onDeletePress() {
    const { uid: orderId } = this.props.productOrder;
    this.props.deleteProductOrderOnClick(orderId);
  }

  render() {
    const { price, quantity, name, description } = this.props.productOrder;
    return (
      <View>
        <CardSection style={styles.cardSectionStyle}>
          <View style={styles.containerLeft}>
            <Text style={styles.descriptionStyle}>
              {quantity}x
            </Text>
          </View>
          <View style={styles.containerCenter}>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Text numberOfLines={2} style={styles.descriptionStyle}>
              {description}
            </Text>
          </View>
          <View style={styles.containerRigth}>
            <Text style={styles.descriptionStyle}>
              Bs. {Number(price) * Number(quantity)}
            </Text>
          </View>
          <View>
            <Icon
              name='ios-trash'
              type='ionicon'
              color={Colors.primaryRed}
              onPress={this.onDeletePress.bind(this) } />
          </View>
        </CardSection>
      </View>
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
    flex: 0.1
  },
  containerRigth: {
    flex: 0.3
  },
  containerCenter: {
    flex: 0.6
  },
  imageStyle: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  }
};

export default OrderListItem;
