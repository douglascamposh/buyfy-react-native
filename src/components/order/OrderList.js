import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View } from 'react-native';
import { orderFetchByOrderId } from '../../actions';
import OrderListItem from './OrderListItem';

class OrderList extends Component {
  componentWillMount() {
    const { navigation, orderId } = this.props;
    //const userId = navigation.getParam('userId', {})
    this.props.orderFetchByOrderId(orderId);
  }

  removeProductOrderOnClick = (productId) => {
  }

  renderItem = ({ item: product }) => {
    return <OrderListItem product={product} removeProductOrderOnClick={this.removeProductOrderOnClick} />
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.order.products}
          keyExtractor={({ uid }) => String(uid)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { storeId } = state.order;
  const products = _.map(state.order.products, (val, uid) => {
    return { ...val, uid };
  });
  const order = { storeId, products: products};
  return { order };
};

export default connect(mapStateToProps, { orderFetchByOrderId })(OrderList);
