import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, AsyncTile, FloatButton, Title, Content } from '../common';
import { View, ScrollView } from 'react-native';
import ProductOrderForm from './ProductOrderForm';
import { orderCreate } from '../../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ProductDetail extends Component {

  addToOrder() {
    const { uid: productId, price, storeId, name, description } = this.props.product;
    const { quantity, notes } = this.props;
    this.props.orderCreate({ productId, quantity, notes, price, name, description, storeId });
    this.props.navigateTo('productList');
  }

  render() {
    const { product } = this.props;
    const { name, description, price, imageName } = product;
    const imageRoute = imageName ? `images/${imageName}` : 'regalo.jpg';
    return (
      <View style={styles.container}>
        <View style={styles.containerDetail}>
          <ScrollView>
            <KeyboardAwareScrollView>
            <Card>
              <AsyncTile image={imageRoute} title={name}>
                <Content style={styles.descriptionStyle}>
                  {description}
                </Content>
                <Title>
                  {price} Bs.
                </Title>
              </AsyncTile>
            </Card>
            <ProductOrderForm />
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
        <FloatButton text={'Agregar a mi pedido'} onPress={this.addToOrder.bind(this)}/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  containerDetail: {
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  descriptionStyle: {
    marginTop: 0
  }
};

const mapStateToProps = (state) => {
  const { quantity, notes } = state.productOrderForm;
  return { quantity, notes };
}

export default connect(mapStateToProps, { orderCreate })(ProductDetail);
