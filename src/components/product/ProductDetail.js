import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, AsyncTile, FloatButton } from '../common';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import ProductOrderForm from './ProductOrderForm';
import { productOrderCreate } from '../../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontWeight, Size } from '../../constants/Styles';

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
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAwareScrollView>
          <Card>
            <AsyncTile image={imageRoute} title={name}>
              <Text style={{marginBottom: 10}}>
                {description}
              </Text>
              <Text style={styles.textStyle}>
                {price} Bs.
              </Text>
            </AsyncTile>
          </Card>
          <ProductOrderForm {...this.props}/>
          </KeyboardAwareScrollView>
        </ScrollView>
        <FloatButton text={'Mi pedido'} onPress={this.addToOrder.bind(this)}/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  textStyle: {
    fontWeight: FontWeight.footerTile,
    fontSize: Size.footerTile,
    marginBottom: 10
  }
};

const mapStateToProps = (state) => {
  const { quantity, notes } = state.productOrderForm;
  return { quantity, notes };
}

export default connect(mapStateToProps, {productOrderCreate})(ProductDetail);
