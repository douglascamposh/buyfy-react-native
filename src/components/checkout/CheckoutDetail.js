import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Title, Card, CardSection, FloatButton, Button } from '../common';
import { orderFetchByUserIdAndStoreIdAndState, invoiceCreate, addressFetchByUserId } from '../../actions';
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

  componentWillMount() {
    const { storeId } = this.props;
    this.props.orderFetchByUserIdAndStoreIdAndState(storeId, orderStates.draft);
    this.props.addressFetchByUserId();
  }

  confirmOrder = () => {
    const { deliveryAddress, nit, orders, deliveryPrice = 10, totalOrders: subTotal, storeId } = this.props;// get delivery price from the store or calculate
    this.props.invoiceCreate({ deliveryAddress, nit, orders, deliveryPrice, subTotal, storeId });
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
        <ScrollView>
          <KeyboardAwareScrollView>
            <Card>
              <CardSection style={styles.cardSectionStyle}>
                <Title>
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
        {this.renderModal()}
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
  const ordersProducts = _.map(state.order, (val, uid) => {
    return { ...val, uid };
  });
  const userAddress = _.last(_.map(state.addresses, (val, uid) => {
    return { ...val, uid };
  })) || { address: '', phone: '' };

  const orders = _.mapValues(state.order, 'name');
  const totalOrders = _.sumBy(ordersProducts, (order) => (order.price * order.quantity));

  const { deliveryAddress: newAddress, nit, deliveryPrice, invoiceId } = state.invoiceForm;
  const deliveryAddress = newAddress || userAddress.address;
  return { totalOrders, deliveryAddress, nit, orders, deliveryPrice, invoiceId, userAddress };
};

export default connect(mapStateToProps, { orderFetchByUserIdAndStoreIdAndState, addressFetchByUserId, invoiceCreate })(CheckoutDetail);
