import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View } from 'react-native';
import { productsFetchByStoreId, orderFetchByUserIdAndStoreIdAndState } from '../../actions';
import ProductListItem from './ProductListItem';
import { Explorer, Card, FloatButton, AsyncTile, CardSection, Title, Content } from '../common';
import { orderStates } from './../../constants/Enum';

class ProductList extends Component {

  componentWillMount() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    this.props.productsFetchByStoreId(store.uid);
    this.props.orderFetchByUserIdAndStoreIdAndState(store.uid, orderStates.draft);
  }

  productDetailOnClick = (product) => {
    this.props.navigation.navigate('productDetail', { product });
  }

  renderItem = ({item: product}) => {
    return <ProductListItem product={product} productDetailOnClick={this.productDetailOnClick}/>
  }

  viewOrder() {
    const { storeId } = _.last(this.props.products)
    this.props.navigation.navigate('orderList', { storeId });
  }

  render() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    const imageRoute = store.imageName ? `images/${store.imageName}` : 'regalo.jpg';
    return (
      <View style={styles.container}>
        <View style={this.props.orders.length ? styles.containerProduct : styles.container}>
          <ScrollView>
            <Card>
              <AsyncTile image={imageRoute} title={store.name}>
                <Content>
                  Tiempo de entrega aproximado {store.deliveryTime} min.
                </Content>
                <Content>
                  Costo de envio {store.deliveryPrice} Bs.
                </Content>
              </AsyncTile>
            </Card>
            <Card>
              <Explorer data={this.props.products}/>
            </Card>
            <FlatList
              enableEmptySections
              renderItem={this.renderItem}
              data={this.props.products}
              keyExtractor={({ uid }) => String(uid)}
            />
          </ScrollView>
        </View>
        {Boolean(this.props.orders.length) && (
          <FloatButton text={'Ver mi pedido'} onPress={this.viewOrder.bind(this)} />
        )}
      </View>
    );
  }
}

const styles = {
  containerProduct: {
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1
  }
}

const mapStateToProps = state => {
  const products = _.map(state.products, (val, uid) => {
    return {...val, uid};
  });
  const orders = _.map(state.order, (val, uid) => {
    return { ...val, uid };
  });

  return { products, orders };
};

export default connect(mapStateToProps, { productsFetchByStoreId, orderFetchByUserIdAndStoreIdAndState})(ProductList);
