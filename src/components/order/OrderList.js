import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View } from 'react-native';
import { ordersFetchByUserId } from '../../actions';
import OrderListItem from './OrderListItem';

class OrderList extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    //const userId = navigation.getParam('userId', {});
    this.props.ordersFetchByUserId();
  }

  removeProductOrderOnClick = (orderId) => {
  }

  renderItem = ({ item: order }) => {
    return <OrderListItem order={order} removeProductOrderOnClick={this.removeProductOrderOnClick} />
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
  const orders = _.map(state.orders, (val, uid) => {
    return { ...val, uid };
  });
  return { orders };
};

export default connect(mapStateToProps, { ordersFetchByUserId })(OrderList);
