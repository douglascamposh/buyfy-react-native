import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, AsyncImage} from '../common';
import { FontWeight, Size } from '../../constants/Styles';

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
          <CardSection style={styles.cardSectionStyle}>
            <View style={styles.containerLeft}>
              <Text style={styles.titleStyle}>
                {name}
              </Text>
              <Text numberOfLines={2} style={styles.descriptionStyle}>
                {deliveryTime} min - Bs. {deliveryPrice} envio
              </Text>
            </View>
            <View style={styles.containerRigth}>
              <AsyncImage image={imageRoute} style={styles.imageStyle}></AsyncImage>
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

export default StoreListItem;
