import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { invoiceFetchByStateAndRiderId, deliveryStatusFetchByUserIdAndInvoiceId, deliveryStatusCreate } from '../../actions';
import { FlatList, View } from 'react-native';
import { Card, CardSection, Title, Content, Button,Spinner } from '../common';
import { deliveryStates, invoiceStates } from '../../constants/Enum';
import { Colors } from '../../constants/Styles';

const CurrentInvoiceRider = props => {
  const dispatch = useDispatch();

  const {invoice, loading} = useSelector((invoices) => invoices.invoicesRider);
  const {deliveryStatusList, pending} = useSelector((deliveryStatus) => deliveryStatus.deliveryStatusList);

  console.log('currentInvoiceRider', invoice);
  
  useEffect(() => {
    dispatch(invoiceFetchByStateAndRiderId(invoiceStates.processed));
  }, [invoice.uid]);

  // useEffect(() => {
  //   if(ordersRider.length > 0 && ordersPending) {
  //     console.log('fetching delivery status');
  //     const invoice = ordersRider[0];
  //     dispatch(deliveryStatusFetchByUserIdAndInvoiceId(invoice.uid));
  //   }
  // }, [ordersRider.length]);


  console.log('deliveryStatusList length', deliveryStatusList.length);
  
  const renderOrder = ({ item: order }) => {
    return (
      <View style={styles.cardSectionStyle}>
        <View style={styles.containerLeft}>
          <Content style={styles.descriptionStyle}>
            {order.quantity}x
            </Content>
        </View>
        <View style={styles.containerCenter}>
          <Content style={styles.titleStyle}>
            {order.name}
          </Content>
        </View>
        <View style={styles.containerRigth}>
          <Content style={styles.descriptionStyle}>
            Bs. {Number(order.price) * Number(order.quantity)}
          </Content>
        </View>
      </View>
    );
  }

  const renderNoCurrentInvoice = () => {
    return (
      <View style={styles.containerNoCurrentInvoice}>
        <Title>No hay Pedidos en curso</Title>
      </View>
    );
  };

  const invoiceButtonOnClick = ({uid: invoiceId, state}) => {
    dispatch(deliveryStatusCreate({invoiceId, state}));
  }

  const renderInvoiceRider = (currentInvoice) => {
    const { uid, subTotal, shippingCost, orders, createdAt, state } = currentInvoice;
    const orderDate = new Date(createdAt).toLocaleDateString();
    const orderTime = new Date(createdAt).toLocaleTimeString();
    return (
      <FlatList
        ListHeaderComponent={
          <CardSection>
            <Title>
  
            </Title>
            <Content>Orden recibida en {orderDate} {orderTime}</Content>
          </CardSection>
        }
        ListFooterComponent={
          <Card>
            <CardSection style={styles.cardSectionStyle}>
              <View style={styles.containerLeft}>
                <Content style={styles.descriptionStyle}>
                </Content>
              </View>
              <View style={styles.containerCenter}>
                <Title style={styles.titleStyle}>
                  Subtotal
                </Title>
              </View>
              <View style={styles.containerRigth}>
                <Content style={styles.descriptionStyle}>
                  Bs. {subTotal}
                </Content>
              </View>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <View style={styles.containerLeft}>
                <Content style={styles.descriptionStyle}>
                </Content>
              </View>
              <View style={styles.containerCenter}>
                <Title style={styles.titleStyle}>
                  Costo de envío
                </Title>
              </View>
              <View style={styles.containerRigth}>
                <Content style={styles.descriptionStyle}>
                  Bs. {shippingCost}
                </Content>
              </View>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <View style={styles.containerLeft}>
                <Content style={styles.descriptionStyle}>
                </Content>
              </View>
              <View style={styles.containerCenter}>
                <Title style={styles.titleStyle}>
                  Total
                </Title>
              </View>
              <View style={styles.containerRigth}>
                <Content style={styles.descriptionStyle}>
                  Bs. {Number(subTotal) + Number(shippingCost)}
                </Content>
              </View>
            </CardSection>
            {(!!invoiceButtonOnClick) && <CardSection>
              <Button onPress={() => invoiceButtonOnClick({ uid, state: deliveryStates.picked })}>Recoger pedido</Button>
              <Button onPress={() => invoiceButtonOnClick({ uid, state: deliveryStates.rejected })}>Rechazar pedido</Button>
              {/* TODO: al rechazar el pedido se deberia agregar una nota y deberia ser obligatorio*/}
              {/* TODO: despues de recogear el pedido se deberia mostrar el boton de entrega*/}
            </CardSection>
            }
          </Card>
        }
        enableEmptySections
        renderItem={renderOrder}
        data={orders}
        keyExtractor={({ uid }) => String(uid)}
      />
    );
  }

  if(loading) {
    return <Spinner />;
  } else {
    return invoice && invoice.uid ? renderInvoiceRider(invoice) : renderNoCurrentInvoice();
  }
};

const styles = {
  titleStyle: {
    paddingLeft: 15,
    flex: 1,
  },
  receivedStyle: {
    color: Colors.primaryRed
  },
  processedStyle: {
    color: Colors.primaryGreen
  },
  descriptionStyle: {
    paddingLeft: 15,
    flex: 1,
  },
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerLeft: {
    flex: 0.1
  },
  containerRigth: {
    flex: 0.3
  },
  containerCenter: {
    flex: 0.6
  },
  imageStyle: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  }
};

export default CurrentInvoiceRider;
