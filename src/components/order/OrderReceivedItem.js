import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Card, CardSection, Title, Content, Button } from '../common';
import { invoiceStates } from '../../constants/Enum';
import { Colors } from '../../constants/Styles';

class OrderReceivedItem extends Component {

  statesText = {
    2: "Sin Despachar",
    3: "Despachado"
  }

  renderState = (state) => {
    //Todo: improve in order to reuse this, maybe we should receive the style according the style
    return (
      <CardSection style={styles.cardSectionStyle}>
        <Title style={ state===2 ? styles.receivedStyle : styles.processedStyle}>
          {this.statesText[state]}
        </Title>
      </CardSection>
    );
  }

  renderOrder ({item: order}) {
    return(
      <View>
        <CardSection style={styles.cardSectionStyle}>
          <View style={styles.containerLeft}>
            <Content style={styles.descriptionStyle}>
              {order.quantity}x
            </Content>
          </View>
          <View style={styles.containerCenter}>
            <Title style={styles.titleStyle}>
              {order.name}
            </Title>
          </View>
          <View style={styles.containerRigth}>
            <Content style={styles.descriptionStyle}>
              Bs. {Number(order.price) * Number(order.quantity)}
            </Content>
          </View>
        </CardSection>
      </View>
    );
  }

  render() {
    const { uid, subTotal, shippingCost, orders, created_at, state } = this.props.invoice;
    const { invoiceOnClick, showState } = this.props;
    const orderDate = new Date(created_at).toLocaleDateString();
    const orderTime = new Date(created_at).toLocaleTimeString();
    return (
      <FlatList
        ListHeaderComponent={
          <>
            <CardSection>
              <Title>
                Orden recibida en {orderDate} {orderTime}
              </Title>
            </CardSection>
          </>
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
            {(state === invoiceStates.created) && <CardSection>
              <Button onPress={() => invoiceOnClick({ uid, state: invoiceStates.received})}>Aceptar</Button>
              <Button onPress={() => invoiceOnClick({ uid, state: invoiceStates.rejected})}>Rechazar</Button>
            </CardSection>
            }
            {showState && this.renderState(state)}
          </Card>
        }
        enableEmptySections
        renderItem={this.renderOrder}
        data={orders}
        keyExtractor={({ uid }) => String(uid)}
      />
    );
  }
}

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

export default OrderReceivedItem;
