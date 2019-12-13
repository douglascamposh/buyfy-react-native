import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, AsyncImage } from '../common';
import { FontWeight, Size } from '../../constants/Styles';

class OrderListItem extends Component {

  onRowPress() {
    //this.props.removeProductOnClick(this.props.order.uid);
  }

  render() {
    const { price, quantity, name, description } = this.props.product;
    return (
      <View>
        <CardSection style={styles.cardSectionStyle}>
          <View style={styles.containerLeft}>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Text numberOfLines={2} style={styles.descriptionStyle}>
              {description}
            </Text>
          </View>
          <View style={styles.containerRigth}>
            <Text style={styles.descriptionStyle}>
              Bs. {price}
            </Text>
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

export default OrderListItem;
