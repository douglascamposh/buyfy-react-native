import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncTile, FloatButton } from '../common';
import { Dimensions, View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import ProductOrderForm from './ProductOrderForm';
import { productOrderCreate } from '../../actions';

const deviceWidth = Dimensions.get('window').width;

class ProductDetail extends Component {

  addToOrder() {
    const { uid: productId, price } = this.props.product;
    const {quantity, notes} = this.props;
    this.props.productOrderCreate({quantity, notes, price, productId});
    this.props.navigateTo('productList');
  } 

  render() {
    const { product } = this.props;
    const { name, description, price, imageName } = product;
    const imageRoute = imageName ? `images/${imageName}` : 'regalo.jpg';
    return (
      <View>
        <ScrollView>
          <AsyncTile image={imageRoute} title={name}>
            <Text style={{marginBottom: 10}}>
              {description}
            </Text>
            <Text style={{marginBottom: 10}}>
              {price} Bs.
            </Text>
          </AsyncTile>
          <ProductOrderForm {...this.props}/>
        </ScrollView>
        <FloatButton text={'Agregar a pedido'} onPress={this.addToOrder.bind(this)}/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
};

const mapStateToProps = (state) => {
  const { quantity, notes } = state.productOrderForm;
  return { quantity, notes };
}

export default connect(mapStateToProps, {productOrderCreate})(ProductDetail);
