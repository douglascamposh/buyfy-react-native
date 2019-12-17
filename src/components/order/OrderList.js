import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View } from 'react-native';
import { orderFetchByUserIdAndStoreId } from '../../actions';
import OrderListItem from './OrderListItem';

class OrderList extends Component {
  componentWillMount() {
    const { navigation, storeId } = this.props;
    //const userId = navigation.getParam('userId', {})
    this.props.orderFetchByUserIdAndStoreId(storeId);
  }

  removeProductOrderOnClick = (productId) => {
  }

  renderItem = ({ item: productOrder }) => {
    return <OrderListItem product={productOrder} removeProductOrderOnClick={this.removeProductOrderOnClick} />
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.orders}
          keyExtractor={({ uid }) => String(uid)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const orders = _.map(state.order, (val, uid) => {
    return { ...val, uid };
  });
  return { orders };
};

export default connect(mapStateToProps, { orderFetchByUserIdAndStoreId })(OrderList);
