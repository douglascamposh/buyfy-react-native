import React from 'react';
import { CardSection, AsyncImage } from './common';
import { Card, Button, Image, Text } from 'react-native-elements';

const ProductDetail = (props) => {
  const { navigation } = props;
  const product = navigation.getParam('product', {});
  
  const {name, description, price, imageName} = product;
  const imageRoute = imageName ? `images/${imageName}` : 'regalo.jpg';

  return (
    <Card>
      <AsyncImage
        image={imageRoute}
        style={{width: '100%', height: 100, resizeMode: 'contain'}} />
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

export default ProductDetail;
