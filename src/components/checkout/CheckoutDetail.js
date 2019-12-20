import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Title, Card, CardSection, FloatButton } from '../common';
import { orderFetchByUserIdAndStoreId, invoiceCreate } from '../../actions';
import InvoiceForm from './InvoiceForm';
import Invoice from './Invoice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class CheckoutDetail extends Component {

  componentWillMount() {
    const { storeId } = this.props;
    this.props.orderFetchByUserIdAndStoreId(storeId);
  }

  confirmOrder = () => {
    const { deliveryAddress, nit, orders, deliveryPrice = 10 } = this.props;// get delivery price from the store or calculate
    this.props.invoiceCreate({ deliveryAddress, nit, orders, deliveryPrice });
    this.props.navigation.navigate('productList');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAwareScrollView>
            <Card>
              <CardSection style={styles.cardSectionStyle}>
                <Title style={styles.titleStyle}>
                  Pollos Pacocabana
                </Title>
              </CardSection>
            </Card>
            <Card>
              <Invoice {...this.props}></Invoice>
            </Card>
            <InvoiceForm {...this.props}/>
          </KeyboardAwareScrollView>
        </ScrollView>
        <FloatButton text={'Enviar mi pedido'} onPress={this.confirmOrder} />
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
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  }
}

const mapStateToProps = state => {
  const ordersProducts = _.map(state.order, (val, uid) => {
    return { ...val, uid };
  });
  const total = _.sumBy(ordersProducts, (order) => (order.price * order.quantity));

  const { deliveryAddress, nit, orders, deliveryPrice } = state.invoiceForm;

  return { total, deliveryAddress, nit, orders, deliveryPrice };
};

export default connect(mapStateToProps, { orderFetchByUserIdAndStoreId, invoiceCreate })(CheckoutDetail);
