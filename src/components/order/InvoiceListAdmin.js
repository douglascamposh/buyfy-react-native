import React from 'react';
import { FlatList } from 'react-native';
import OrderReceivedItem from './OrderReceivedItem';

const InvoiceListAdmin = ({ invoices, invoiceButtonOnClick }) => {

  const renderItem = ({ item: invoice }) => {
    return (
      <OrderReceivedItem invoice={invoice} invoiceOnClick={invoiceButtonOnClick} />
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

export default InvoiceListAdmin;
