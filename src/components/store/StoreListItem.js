import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, AsyncImage, Title, Content } from '../common';
import { Size, Colors } from '../../constants/Styles';

class StoreListItem extends Component {

  onRowPress() {
    this.props.storeOnClick(this.props.store);
  }

  render() {
    const { name, deliveryTime, shippingCost, imageName, deleted } = this.props.store;
    const imageRoute = imageName ? `images/${imageName}` : null;
    return(
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={styles.cardSectionStyle}>
            <View style={styles.containerLeft}>
              {Boolean(deleted) && (<Title style={styles.closedStyle}>
                Cerrado
              </Title>)}
              <Title style={styles.titleStyle}>
                {name}
              </Title>
              <Content numberOfLines={2} style={styles.descriptionStyle}>
                {deliveryTime} min - Bs. {shippingCost} envio
              </Content>
            </View>
            {Boolean(imageRoute) && (
              <View style={Boolean(deleted) ? styles.containerRigthDisable : styles.containerRigth}>
                <AsyncImage image={imageRoute} style={styles.imageStyle}></AsyncImage>
              </View>
            )}
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  closedStyle: {
    flex: 1,
    color: Colors.primaryRed,
    marginTop: 5,
    fontSize: Size.descriptionCard
  },
  titleStyle: {
    flex: 1
  },
  descriptionStyle: {
    flex: 1
  },
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerLeft: {
    flex: 2,
    paddingLeft: 15
  },
  containerRigth: {
    flex: 1
  },
  containerRigthDisable: {
    flex: 1,
    opacity: 0.5
  },
  imageStyle: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  }
};

export default StoreListItem;
