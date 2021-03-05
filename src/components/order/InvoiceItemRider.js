import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Card, CardSection, Title, Content, Button } from '../common';
import { invoiceStates } from '../../constants/Enum';
import { Colors } from '../../constants/Styles';

class InvoiceItemRider extends Component {

  renderOrder({ item: order }) {
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

  render() {
    const { uid, subTotal, shippingCost, orders, created_at, state, riderId } = this.props.invoice;
    const { invoiceOnClick } = this.props;
    const orderDate = new Date(created_at).toLocaleDateString();
    const orderTime = new Date(created_at).toLocaleTimeString();
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
                  Total
                </Title>
              </View>
              <View style={styles.containerRigth}>
                <Content style={styles.descriptionStyle}>
                  Bs. {Number(subTotal) + Number(shippingCost)}
                </Content>
              </View>
            </CardSection>
            {(!!invoiceOnClick) && <CardSection>
              <Button onPress={() => invoiceOnClick({ uid })}>Tomar pedido</Button>
            </CardSection>
            }
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

export default InvoiceItemRider;
