import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native';
import { invoiceFetchByState, invoiceUpdateRiderById, deliveryStatusCreate } from '../../actions';
import InvoiceListRider from './InvoiceListRider';
import { invoiceStates, deliveryStates } from '../../constants/Enum';
import SegmentedControl from '@react-native-community/segmented-control';
import CurrentInvoiceRider from './CurrentInvoiceRider';
import {Spinner} from '../common';

const OrdersRider = (props) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const {ordersRider: pendings, pending} = useSelector(state => state.invoices);

  useEffect(() => {
    dispatch(invoiceFetchByState(invoiceStates.received));
  },[pendings.length]);

  const invoiceButtonOnClick = (invoice) => {
    const { currentUser } = firebase.auth();
    invoice.riderId = currentUser.uid;
    const {uid: invoiceId} = invoice;
    dispatch(invoiceUpdateRiderById(invoice));
    dispatch(deliveryStatusCreate({invoiceId, state: deliveryStates.taken}));
  }

  const getCurrentInvoiceRider = (invoices) => {
    const { currentUser } = firebase.auth();
    const riderId = currentUser.uid;
    return _.last(invoices.filter(invoice => invoice.riderId === riderId));
  }

  const renderCurrentInvoice = (currentInvoiceRider) => {
    //deberia agregar verificacion de si el estado es en camino
    //revisara deliveryStatus ya no validar currentInvoice?
    return (
      <CurrentInvoiceRider/>
    );
  }

  const currentInvoiceRider = getCurrentInvoiceRider(pendings);
  const pendingInvoices = pendings.filter(invoice => !invoice.riderId);
  
  if(pending){
    return <Spinner />
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <SegmentedControl
          values={['Pendientes', 'Pedido en curso']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            const { selectedSegmentIndex } = event.nativeEvent;
            setSelectedIndex(selectedSegmentIndex);
          }}
        >
        </SegmentedControl>
        {selectedIndex === 0 && <InvoiceListRider
          invoices={pendingInvoices}
          invoiceButtonOnClick={!currentInvoiceRider ? invoiceButtonOnClick : null}
        />}
        {selectedIndex === 1 && renderCurrentInvoice(currentInvoiceRider)}
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

export default OrdersRider;
