import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, Text, View } from 'react-native';
import { Card, CardSection, FloatButton } from '../common';
import { orderFetchByUserIdAndStoreId, deleteOrder } from '../../actions';
import OrderListItem from './OrderListItem';
import { FontWeight, Size } from '../../constants/Styles';

class OrderList extends Component {
  componentWillMount() {
    const { navigation, storeId } = this.props;
    //const userId = navigation.getParam('userId', {})
    this.props.orderFetchByUserIdAndStoreId(storeId);
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
              <Text style={styles.titleStyle}>
                Subtotal
              </Text>
              <Text style={styles.titleStyle}>
                Bs. {this.props.total}
              </Text>
            </CardSection>
          </Card>
        </ScrollView>
        <FloatButton text={'Confirmar pedido'} onPress={this.confirmOrder} />
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
  titleStyle: {
    fontSize: Size.titleCard,
    paddingLeft: 15,
    marginTop: 10,
    fontWeight: FontWeight.titleCard,
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
  const total = _.sumBy(orders, (order) => (order.price * order.quantity) );
  return { orders, total };
};

export default connect(mapStateToProps, { orderFetchByUserIdAndStoreId, deleteOrder })(OrderList);
