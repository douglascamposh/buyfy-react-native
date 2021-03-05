import React from 'react';
import { FlatList } from 'react-native';
import InvoiceItemRider from './InvoiceItemRider';

const InvoiceListRider = ({ invoices, invoiceButtonOnClick }) => {

  const renderItem = ({ item: invoice }) => {
    return (
      <InvoiceItemRider invoice={invoice} invoiceOnClick={invoiceButtonOnClick} />
    );
  }

  return (
    <FlatList
      enableEmptySections
      renderItem={renderItem}
      data={invoices}
      keyExtractor={({ uid }) => String(uid)}
      refreshing={true}
    />
  );
}

export default InvoiceListRider;
