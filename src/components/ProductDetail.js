import React from 'react';
import { CardSection, AsyncTile, FloatButton } from './common';
import { Dimensions, View, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Image, Text, Input } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'

const deviceWidth = Dimensions.get('window').width;

const ProductDetail = (props) => {
  const { product } = props;
  
  const { name, description, price, imageName } = product;
  const imageRoute = imageName ? `images/${imageName}` : 'regalo.jpg';
  return (
    <View>
      <ScrollView>
        <AsyncTile image={imageRoute} title={description}>
          <Text style={{marginBottom: 10}}>
            {price} Bs.
          </Text>
        </AsyncTile>
        <Card>
          <CardSection>
            <Text h4>
              Unidades
            </Text>
          </CardSection>
          <CardSection>
            <NumericInput 
              onChange={value => console.log(value)}
              onLimitReached={(isMax,msg) => console.log(isMax,msg)}
              minValue={1}
              maxValue={10}
              initValue={1}
              totalWidth={110} 
              totalHeight={40}
              separatorWidth={0}
              iconSize={20}
              valueType='integer'
              rounded
              borderColor='red'
              textColor='red' 
              iconStyle={{ color: 'red' }} 
              rightButtonBackgroundColor='white' 
              leftButtonBackgroundColor='white'/>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Text h4>
              ¿Quieres aclarar algo?
            </Text>
          </CardSection>
          <CardSection>
            <Input
              placeholder="Notas al producto"
            />
          </CardSection>
        </Card>
      </ScrollView>
      <FloatButton text={'Agregar a pedido'}/>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
};

export default ProductDetail;
