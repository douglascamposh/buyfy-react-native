import React from 'react';
import { CardSection, AsyncImage } from './common';
import { Dimensions } from 'react-native';
import { Card, Button, Image, Text } from 'react-native-elements';

const deviceWidth = Dimensions.get('window').width;

const ProductDetail = (props) => {
  const { navigation } = props;
  const product = navigation.getParam('product', {});
  
  const {name, description, price, imageName} = product;
  const imageRoute = imageName ? `images/${imageName}` : 'regalo.jpg';

  return (
    <Card
    >
      <AsyncImage
        image={imageRoute}
        style={styles.image} />
      <Text h4 style={{marginBottom: 10}}>
        {name}
      </Text>
      <Text style={{marginBottom: 10}}>
        {description}
      </Text>
      <Text style={{marginBottom: 10}}>
        {price} Bs.
      </Text>
    </Card>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  item: {
    width: deviceWidth / 2,
    height: deviceWidth / 2
  },

  image: {
    width: '100%',
    height: 200,
    alignSelf: 'stretch',
    resizeMode: 'cover'
  }
};

export default ProductDetail;
