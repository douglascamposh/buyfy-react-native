import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { invoiceFetchByState, invoiceUpdateById } from '../../actions';
import InvoiceListRider from './InvoiceListRider';
import { invoiceStates } from '../../constants/Enum';
import SegmentedControl from '@react-native-community/segmented-control';
import CurrentInvoiceRider from './CurrentInvoiceRider';

class OrdersRider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

  componentDidMount() {
    this.props.invoiceFetchByState(invoiceStates.received); //pending orders
  }

  componentDidUpdate(prevProps){
    if(this.props.pendings.length !== prevProps.pendings.length){
      this.props.invoiceFetchByState(invoiceStates.received);
    }
  }

  invoiceButtonOnClick = (invoice) => {
    const { currentUser } = firebase.auth();
    invoice.riderId = currentUser.uid;
    this.props.invoiceUpdateById(invoice);
    // this.props.navigation.navigate('productDetail', { order });
  }

  getCurrentInvoiceRider = (invoices) => {
    const { currentUser } = firebase.auth();
    const riderId = currentUser.uid;
    return _.last(invoices.filter(invoice => invoice.riderId === riderId));
  }

  renderCurrentInvoice = (currentInvoiceRider) => {
    return Boolean(currentInvoiceRider) ? (
      <CurrentInvoiceRider
        invoice={currentInvoiceRider}
        invoiceButtonOnClick={this.invoiceButtonOnClick}
      />
    ) : null;
  }

  render() {
    const currentInvoiceRider = this.getCurrentInvoiceRider(this.props.pendings);
    const pendingInvoices = this.props.pendings.filter(invoice => !invoice.riderId);
    return (
      <SafeAreaView style={styles.container}>
        <SegmentedControl
          values={['Pendientes', 'Pedido en curso']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            const { selectedSegmentIndex } = event.nativeEvent;
            this.setState({ selectedIndex: selectedSegmentIndex });
          }}
        >
        </SegmentedControl>
        {this.state.selectedIndex === 0 && <InvoiceListRider
          invoices={pendingInvoices}
          invoiceButtonOnClick={!currentInvoiceRider ? this.invoiceButtonOnClick : null}
        />}
        {this.state.selectedIndex === 1 && this.renderCurrentInvoice(currentInvoiceRider)}
      </SafeAreaView>
    );
  }
}
const styles = {
  containerProduct: {
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1
  }
}

const mapStateToProps = state => {
  const pendings = _.map(state.invoices.ordersRider, (val) => {
    const orders = _.map(val.orders, (order) => { return { ...order }; });
    val.orders = orders;
    return { ...val};
  });
  return { pendings };
};

export default connect(mapStateToProps, { invoiceFetchByState, invoiceUpdateById })(OrdersRider);
