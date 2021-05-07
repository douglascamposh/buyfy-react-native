import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { invoiceFetchByStoreId, invoiceUpdateById } from '../../actions';
import InvoiceListAdmin from './InvoiceListAdmin';
import { invoiceStates } from '../../constants/Enum';
import SegmentedControl from '@react-native-community/segmented-control';

class OrdersReceivedStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    this.props.invoiceFetchByStoreId(store.uid);
  }

  componentDidUpdate(prevProps) {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    this.props.order && prevProps.order === null ? this.props.invoiceFetchByStoreId(store.uid) : null;
  }

  invoiceButtonOnClick = (invoice) => {
    this.props.invoiceUpdateById(invoice);
    // this.props.navigation.navigate('productDetail', { order });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SegmentedControl
          values={['Pendientes', 'Recibidas', 'Rechazadas']}
          selectedIndex={this.state.selectedIndex}
          onChange={(event) => {
            const { selectedSegmentIndex } = event.nativeEvent;
            this.setState({ selectedIndex: selectedSegmentIndex });
          }}
        >
        </SegmentedControl>
        {this.state.selectedIndex == 0 && <InvoiceListAdmin
          invoices={this.props.pendings}
          invoiceButtonOnClick={this.invoiceButtonOnClick}
        />}
        {this.state.selectedIndex == 1 && <InvoiceListAdmin
          invoices={this.props.accepted}
          showState ={true}
        />}
        {this.state.selectedIndex == 2 && <InvoiceListAdmin
          invoices={this.props.rejected}
        />}
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
  const invoices = _.map(state.invoices.data, (val) => {
    const orders = _.map(val.orders, (order) => { return {...order }; });
    val.orders = orders;
    return { ...val };
  });

  const { order } = state.invoices;
  const pendings = invoices.filter(invoice => invoice.state === invoiceStates.created);
  const accepted = invoices.filter(invoice => invoice.state === invoiceStates.received);//Todo: we should all invoices delivered not only received
  const rejected = invoices.filter(invoice => invoice.state === invoiceStates.rejected);
  return { pendings, accepted, rejected, invoices, order };
};

export default connect(mapStateToProps, { invoiceFetchByStoreId, invoiceUpdateById })(OrdersReceivedStore);
