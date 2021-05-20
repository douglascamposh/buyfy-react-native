import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, FlatList, View } from 'react-native';
import { CardSection, FloatButton, Spinner, Title } from '../common';
import { orderFetchByUserIdAndStoreIdAndState, deleteOrder } from '../../actions';
import OrderListItem from './OrderListItem';
import { orderStates } from './../../constants/Enum';

class OrderList extends Component {
  componentDidMount() {
    const { storeId } = this.props;
    this.props.orderFetchByUserIdAndStoreIdAndState(storeId, orderStates.draft);
  }

  deleteProductOrderOnClick = (orderId) => {
    this.props.deleteOrder(orderId);
  }

  renderItem = ({ item: productOrder }) => {
    return <OrderListItem productOrder={productOrder} deleteProductOrderOnClick={this.deleteProductOrderOnClick} />
  }

  confirmOrder = () => {
    const { navigation, storeId } = this.props;
    navigation.navigate('checkout', {storeId});
  }

  render() {
    if(this.props.pending) {
      return <Spinner/>;
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerDetail}>
          <FlatList
            enableEmptySections
            renderItem={this.renderItem}
            data={this.props.orders}
            keyExtractor={({ uid }) => String(uid)}
            ListFooterComponent={
            <>
              <CardSection style={styles.cardSectionStyle}>
                <Title style={styles.titleStyle}>
                  Subtotal
                </Title>
                <Title style={styles.titleStyle}>
                  Bs. {this.props.totalOrders}
                </Title>
              </CardSection>
            </>}
          />
        </View>
        {Boolean(this.props.orders.length) && (
          <FloatButton text={'Confirmar pedido'} onPress={this.confirmOrder} />)}
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  containerDetail: {
    height: '90%'
  },
  titleStyle: {
    paddingLeft: 15,
  },
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  }
}

const mapStateToProps = state => {
  const orders = _.map(state.orders.data, (val) => {
    return { ...val };
  });
  const {pending} = state.orders.data;
  const totalOrders = _.sumBy(orders, (order) => (order.price * order.quantity) );
  return { orders, totalOrders, pending };
};

export default connect(mapStateToProps, { orderFetchByUserIdAndStoreIdAndState, deleteOrder })(OrderList);
