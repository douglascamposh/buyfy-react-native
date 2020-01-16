import _ from 'lodash';
import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { invoiceFetchByUserId } from '../../actions';
import { Card, CardSection, Title, Content } from '../common';
import { Icon } from 'react-native-elements';

class InvoiceCard extends Component {

  componentWillMount() {
    this.props.invoiceFetchByUserId();
  }

  onPress = () => {
    this.props.onInvoiceCardClick(this.props.invoice.uid);
  }

  render() {
    return (
      <View>
        { this.props.invoice && (
          <Card onPress={this.onPress}>
            <CardSection>
              <View>
                <Title>Estamos procesando tu pedido</Title>
                <Content>Direccion de pollos pacocabana</Content>
              </View>
            </CardSection>
            <CardSection>
              <Icon
                name='ios-timer'
                type='ionicon'
              />
              <Content>20:15 - 22:30</Content>
            </CardSection>
          </Card>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log("state.invoices", state.invoices);
  const invoices = _.map(state.invoices, (val, uid) => {
    return { ...val, uid };
  });
  console.log("invoices", invoices);
  const invoice = invoices.length ? _.last(invoices) : null;
  return { invoice };
};

export default connect(mapStateToProps, { invoiceFetchByUserId })(InvoiceCard);
