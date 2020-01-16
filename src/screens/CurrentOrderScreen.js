import React, { Component } from 'react';
import CurrentOrder from '../components/order/CurrentOrder';
import { connect } from 'react-redux';
import { invoiceFetchById } from '../actions';
import _ from 'lodash';
class CurrentOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Tu pedido'
    }
  }

  componentWillMount() {
    const invoiceId = this.props.navigation.getParam('invoiceId', {});
    this.props.invoiceFetchById(invoiceId);
  }

  render() {
    return <CurrentOrder navigation={this.props.navigation} invoice={this.props.invoice} />;
  }
}

const mapStateToProps = state => {
  const invoices = _.map(state.invoices, (val, uid) => {
    return { ...val, uid };
  });
  const invoice = _.last(invoices);
  return { invoice };
};

export default connect(mapStateToProps, { invoiceFetchById })(CurrentOrderScreen);
