import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, AsyncImage, Title, Content } from '../common';

class StoreListItem extends Component {

  onRowPress() {
    this.props.storeOnClick(this.props.store);
  }

  render() {
    const { name, deliveryTime, shippingCost, imageName } = this.props.store;
    const imageRoute = imageName ? `images/${imageName}` : null;
    return(
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={styles.cardSectionStyle}>
            <View style={styles.containerLeft}>
              <Title style={styles.titleStyle}>
                {name}
              </Title>
              <Content numberOfLines={2} style={styles.descriptionStyle}>
                {deliveryTime} min - Bs. {shippingCost} envio
              </Content>
            </View>
            { Boolean(imageRoute) && (
              <View style={styles.containerRigth}>
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
  imageStyle: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  }
};

export default StoreListItem;
