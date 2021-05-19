import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Title, Card, CardSection, FloatButton, Button } from '../common';
import { orderFetchByUserIdAndStoreIdAndState, invoiceCreate, addressListFetchByUserId, storeFetchById } from '../../actions';
import InvoiceForm from './InvoiceForm';
import Invoice from './Invoice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { orderStates } from './../../constants/Enum';
import { Overlay } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Colors } from '../../constants/Styles';
class CheckoutDetail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  componentDidMount() {
    const { storeId } = this.props;
    this.props.orderFetchByUserIdAndStoreIdAndState(storeId, orderStates.draft);
    this.props.addressListFetchByUserId();
    this.props.storeFetchById(storeId);
  }

  confirmOrder = () => {
    const { addressId, nit, orders, shippingCost = 10, totalOrders: subTotal, storeId } = this.props;// get delivery price from the store or calculate
    this.props.invoiceCreate({ addressId, nit, orders, shippingCost, subTotal, storeId });
    this.setState({ isVisible: true });
  }

  navigateToProductList = () => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate('productList');
  }

  navigateToCurrentProduct = () => {
    this.setState({ isVisible: false });
    const invoiceId = this.props.invoiceId;
    this.props.navigation.navigate('currentOrder', { invoiceId });
  }

  //TODO move this modal to a screen instead of use Modal
  renderModal() {
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={this.navigateToProductList}
      >
        <View style={styles.modalStyle}>
          <Icon
            name='ios-checkmark-circle-outline'
            type='ionicon'
            color={Colors.primaryGreen}
            size={200}
          />
          <Title style={[styles.titleStyle, styles.centerContent]}>Orden recibida!</Title>
          <Title style={styles.centerContent}>Vamos a procesar tu pedido.</Title>
          <CardSection>
            <Button style={styles.modalButtonStyle} onPress={this.navigateToCurrentProduct}>Ver mi pedido</Button>
          </CardSection>
        </View>
      </Overlay>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerDetail}>
          <ScrollView>
            <KeyboardAwareScrollView>
              <Card>
                <CardSection style={styles.cardSectionStyle}>
                  <Title>
                    {this.props.name}
                  </Title>
                </CardSection>
              </Card>
              <Card>
                <Invoice {...this.props}></Invoice>
              </Card>
              <InvoiceForm {...this.props}/>
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
        <FloatButton text={'Enviar mi pedido'} onPress={this.confirmOrder} />
        {this.renderModal()}
      </View>
    );
  }
}

const styles = {
  container:{
    flex: 1
  },
  containerDetail: {
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 25,
    marginTop: 10,
    color: Colors.primaryText
  },
  centerContent: {
    textAlign: 'center',
    paddingLeft: 0
  },
  modalStyle: {
    justifyContent: 'center',
    flex: 1
  },
  modalButtonStyle: {
    color: Colors.primaryRed
  }
}

const mapStateToProps = state => {
  const ordersProducts = _.map(state.orders.data, (val ) => {
    return { ...val };
  });
  const userAddresses = _.map(state.addresses.data, (val) => {
    return { ...val };
  });;
  const userAddress = _.last(userAddresses) || { uid: '' };

  const { name, shippingCost } = state.store;
  
  const orders = _.map(state.orders.data, ({ name, quantity, price, uid }) => {
    return { name, quantity, price, uid };
  });
  const totalOrders = _.sumBy(ordersProducts, (order) => (order.price * order.quantity));
  let { addressId: newAddressId, nit, /*invoiceId*/ } = state.invoiceForm;
  const {invoiceId} = state.invoices;
  console.log('invice id ', invoiceId);
  const addressId = newAddressId || userAddress.uid;
  return { totalOrders, addressId, nit, orders, shippingCost, invoiceId, userAddresses, name };
};

export default connect(mapStateToProps, {
  orderFetchByUserIdAndStoreIdAndState,
  addressListFetchByUserId,
  invoiceCreate,
  storeFetchById
})(CheckoutDetail);
