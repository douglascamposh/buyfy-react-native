import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { invoiceFetchByUserId } from '../../actions';
import { Carrousel, Card } from '../common';
import InvoiceCardItem from './InvoiceCardItem';

class InvoiceCards extends Component {

  componentDidMount() {
    this.props.invoiceFetchByUserId();
  }

  invoiceOnPress = ({ uid }) => {
    this.props.onInvoiceCardClick(uid);
  }

  renderItem = (invoice) => {
    const onPress = () => this.invoiceOnPress(invoice);
    return (
      <InvoiceCardItem invoice={invoice} onPress={onPress}/>
    );
  }

  render() {
    return (
      <View>
        { Boolean(this.props.invoices.length) && (
          <Card>
            <Carrousel
              style={styles.carrouselStyle}
              data={this.props.invoices}
              renderItem={this.renderItem}
              keyExtractor={({ uid }) => String(uid)}
            />
        </Card>
      )}
      </View>
    );
  }
}


const styles = {
  carrouselStyle: {
    height: 140
  }
};

const mapStateToProps = state => {
  const invoices = _.map(state.invoices, (val) => {
    return { ...val };
  });
  return { invoices };
};

export default connect(mapStateToProps, { invoiceFetchByUserId })(InvoiceCards);
