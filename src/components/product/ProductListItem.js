import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, AsyncImage, Title, Content } from '../common';

class ProductListItem extends Component {

  onRowPress() {
    this.props.productDetailOnClick(this.props.product);
  }

  render() {
    const {name, description, price, imageUri} = this.props.product;
    return(
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={styles.cardSectionStyle}>
            <View style={styles.containerLeft}>
              <Title style={styles.titleStyle}>
                {name}
              </Title>
              <Content numberOfLines={2} style={styles.descriptionStyle}>
                {description}
              </Content>
              <Title style={styles.titleStyle}>
                Bs. {price}
              </Title>
            </View>
            {Boolean(imageUri) && (
              <View style={styles.containerRigth}>
                <AsyncImage uri={imageUri} style={styles.imageStyle} ></AsyncImage>
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
    flex: 1,
  },
  descriptionStyle: {
    flex: 1,
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

export default ProductListItem;
