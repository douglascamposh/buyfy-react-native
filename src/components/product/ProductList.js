import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View, Text } from 'react-native';
import { productsFetch, productsFetchByStoreId, orderFetchByUserIdAndStoreId } from '../../actions';
import ProductListItem from './ProductListItem';
import { Explorer, Card, FloatButton, AsyncTile } from '../common';
import { FontWeight, Size, Colors } from '../../constants/Styles';

class ProductList extends Component {

  componentWillMount() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    this.props.productsFetchByStoreId(store.uid);
    this.props.orderFetchByUserIdAndStoreId(store.uid);
  }

  productDetailOnClick = (product) => {
    this.props.navigation.navigate('productDetail', { product });
  }

  renderItem = ({item: product}) => {
    return <ProductListItem product={product} productDetailOnClick={this.productDetailOnClick}/>
  }

  viewOrder() {
    //const { uid: orderId } = this.props.order;
    const { storeId } = _.last(this.props.products)
    this.props.navigation.navigate('orderList', { storeId });
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
              <Text style={styles.textStyle}>
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
        { Boolean(this.props.orders.length) && (
          <FloatButton text={'Ver mi pedido'} onPress={this.viewOrder.bind(this)}/>
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
  textStyle: {
    fontSize: Size.descriptionCard,
    marginTop: 10,
    fontWeight: FontWeight.descriptionCard,
    color: Colors.secondaryText
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

export default connect(mapStateToProps, { productsFetch, productsFetchByStoreId, orderFetchByUserIdAndStoreId})(ProductList);
