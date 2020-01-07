import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Title, Card, CardSection, FloatButton, Button } from '../common';
import { orderFetchByUserIdAndStoreIdAndState, invoiceCreate } from '../../actions';
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
  }

  confirmOrder = () => {
    const { deliveryAddress, nit, orders, deliveryPrice = 10 } = this.props;// get delivery price from the store or calculate
    //this.props.invoiceCreate({ deliveryAddress, nit, orders, deliveryPrice });
    this.setState({ isVisible: true });
  }

  navigateToProductList = () => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate('productList');
  }

  //TODO move this modal to components use Modal instead of Overlay component
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
            <Button style={styles.modalButtonStyle} onPress={this.navigateToProductList}>Ver mi pedido</Button>
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
  const orders = _.mapValues(state.order, 'name');
  const total = _.sumBy(ordersProducts, (order) => (order.price * order.quantity));

  const { deliveryAddress, nit, deliveryPrice } = state.invoiceForm;

  return { total, deliveryAddress, nit, orders, deliveryPrice };
};

export default connect(mapStateToProps, { orderFetchByUserIdAndStoreIdAndState, invoiceCreate })(CheckoutDetail);
