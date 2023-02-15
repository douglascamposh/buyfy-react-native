import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, Title, Content } from '../common';
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
            <Content style={styles.descriptionStyle}>
              {quantity}x
            </Content>
          </View>
          <View style={styles.containerCenter}>
            <Title style={styles.titleStyle}>
              {name}
            </Title>
            <Content numberOfLines={2} style={styles.descriptionStyle}>
              {description}
            </Content>
          </View>
          <View style={styles.containerRigth}>
            <Content style={styles.descriptionStyle}>
              Bs. {Number(price) * Number(quantity)}
            </Content>
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
    paddingLeft: 15,
    flex: 1,
  },
  descriptionStyle: {
    paddingLeft: 15,
    flex: 1,
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
