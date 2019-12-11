import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View, Text } from 'react-native';
import { productsFetch, productsFetchByStoreId } from '../../actions';
import ProductListItem from './ProductListItem';
import { Explorer, Card, FloatButton, AsyncTile } from '../common';

class ProductList extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    this.props.productsFetchByStoreId(store.uid);
  }

  componentWillReceiveProps(nextProps) {
  }

  productDetailOnClick = (product) => {
    this.props.navigation.navigate('productDetail', { product });
  }

  renderItem = ({item: product}) => {
    return <ProductListItem product={product} productDetailOnClick={this.productDetailOnClick}/>
  }

  viewOrder() {
    this.props.navigation.navigate('orderList');
  }

  render() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    const imageRoute = store.imageName ? `images/${store.imageName}` : 'regalo.jpg';
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card>
            <AsyncTile image={imageRoute} title={store.name}>
              <Text style={{ marginBottom: 10 }}>
                Tiempo de entrega aproximado {store.deliveryTime}
              </Text>
              <Text style={styles.textStyle}>
                Costo de envio {store.deliveryPrice}
              </Text>
            </AsyncTile>
          </Card>
          <Card>
            <Explorer data={this.props.products}/>
          </Card>
          <FlatList
            enableEmptySections
            renderItem={this.renderItem}
            data={this.props.products}
            keyExtractor={({uid}) => String(uid)}
          />
        </ScrollView>
        <FloatButton text={'Mi pedido'} onPress={this.viewOrder.bind(this)} />
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
}

const mapStateToProps = state => {
  const products = _.map(state.products, (val, uid) => {
    return {...val, uid};
  });
  return {products};
};

export default connect(mapStateToProps, {productsFetch, productsFetchByStoreId})(ProductList);
