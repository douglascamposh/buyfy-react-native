import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View } from 'react-native';
import { productsFetchByStoreId, orderFetchByUserIdAndStoreIdAndState, deleteProduct } from '../../actions';
import ProductListItem from './ProductListItem';
import { Explorer, Card, FloatButton, AsyncTile, Content, AppleStyleSwipeableRow, RightActions } from '../common';
import { orderStates } from './../../constants/Enum';
import { Colors, Size } from '../../constants/Styles';
import { Icon } from 'react-native-elements';

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

  productEditOnClick = (product) => {
    this.props.navigation.navigate('editProduct', { product });
  }

  productDeleteOnClick = (product) => {
    this.props.deleteProduct(product.uid);
  }

  renderRightActions = (progress, item, close) => {
    const buttonActions = [
      {
        onPress: () => { close(); this.productEditOnClick(item); }, color: Colors.primaryBlue, item: item,
        icon: (
          <Icon
            name='ios-create'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
            iconStyle={styles.iconStyle}
          />
        )
      },
      {
        onPress: () => { this.productDeleteOnClick(item); close(); }, color: Colors.primaryRed, item: item,
        icon: (
          <Icon
            name='ios-trash'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
            iconStyle={styles.iconStyle}
          />
        )
      }
    ];
    return (
      <RightActions progress={progress} buttonActions={buttonActions} />
    )
  };

  renderItem = ({item: product}) => {
    return (
      <AppleStyleSwipeableRow
        renderRightActions={this.renderRightActions}
        item={product}>
        <ProductListItem product={product} productDetailOnClick={this.productDetailOnClick} />
      </AppleStyleSwipeableRow>
    );
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
                  Costo de envío {store.shippingCost} Bs. - Pedido mínimo {store.minimumCost} Bs.
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

export default connect(mapStateToProps, { productsFetchByStoreId, orderFetchByUserIdAndStoreIdAndState, deleteProduct })(ProductList);
