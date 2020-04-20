import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, View } from 'react-native';
import { Card, CardSection, FloatButton, Title } from '../common';
import { orderFetchByUserIdAndStoreIdAndState, deleteOrder } from '../../actions';
import OrderListItem from './OrderListItem';
import { orderStates } from './../../constants/Enum';

class OrderList extends Component {
  componentWillMount() {
    const { navigation, storeId } = this.props;
    //const userId = navigation.getParam('userId', {})
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
    return (
      <View style={styles.container}>
        <View style={styles.containerDetail}>
          <ScrollView>
            <Card>
              <FlatList
                enableEmptySections
                renderItem={this.renderItem}
                data={this.props.orders}
                keyExtractor={({ uid }) => String(uid)}
              />
            </Card>
            <Card>
              <CardSection style={styles.cardSectionStyle}>
                <Title style={styles.titleStyle}>
                  Subtotal
                </Title>
                <Title style={styles.titleStyle}>
                  Bs. {this.props.totalOrders}
                </Title>
              </CardSection>
            </Card>
          </ScrollView>
        </View>
        <FloatButton text={'Confirmar pedido'} onPress={this.confirmOrder} />
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
  const orders = _.map(state.order, (val, uid) => {
    return { ...val, uid };
  });
  const totalOrders = _.sumBy(orders, (order) => (order.price * order.quantity) );
  return { orders, totalOrders };
};

export default connect(mapStateToProps, { orderFetchByUserIdAndStoreIdAndState, deleteOrder })(OrderList);
