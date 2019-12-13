import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View, Text } from 'react-native';
import { productsFetch, productsFetchByStoreId, orderFetchByUserIdAndStoreId } from '../../actions';
import ProductListItem from './ProductListItem';
import { Explorer, Card, FloatButton, AsyncTile } from '../common';

class ProductList extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    this.props.productsFetchByStoreId(store.uid);
    this.props.orderFetchByUserIdAndStoreId(store.uid);
  }

  componentWillReceiveProps(nextProps) {
  }

  productDetailOnClick = (product) => {
    const {order} = this.props;
    this.props.navigation.navigate('productDetail', { product, order });
  }

  renderItem = ({item: product}) => {
    return <ProductListItem product={product} productDetailOnClick={this.productDetailOnClick}/>
  }

  viewOrder() {
    const { uid: orderId } = this.props.order;
    this.props.navigation.navigate('orderList', { orderId });
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
        {Boolean(this.props.order) && (
          <FloatButton text={'Mi pedido'} onPress={this.viewOrder.bind(this)}/>
        )}
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
  const orders = _.map(state.order, (val, uid) => {
    return { ...val, uid };
  });
  let order = null;
  if (orders.length) {
    const orderItem = _.last(orders);
    const { storeId, products, uid } = orderItem;
    const productOrders = _.map(products, (val, uid) => {
      return { ...val, uid };
    });
    order = { uid, storeId, products: productOrders };
  }  

  return { products, order };
};

export default connect(mapStateToProps, { productsFetch, productsFetchByStoreId, orderFetchByUserIdAndStoreId})(ProductList);
