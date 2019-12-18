import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { Card, CardSection, FloatButton } from '../common';
import { orderFetchByUserIdAndStoreId } from '../../actions';
import { FontWeight, Size, Colors } from '../../constants/Styles';

class CheckoutDetail extends Component {

  componentWillMount() {
    const { navigation, storeId } = this.props;
    this.props.orderFetchByUserIdAndStoreId(storeId);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card>
            <CardSection style={styles.cardSectionStyle}>
              <Text style={styles.titleStyle}>
                Pollos Pacocabana
              </Text>
            </CardSection>
          </Card>
          <Card>
            <CardSection style={styles.cardSectionStyle}>
              <Text style={styles.titleStyle}>
                Subtotal
              </Text>
              <Text style={styles.titleStyle}>
                Bs. {this.props.total}
              </Text>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Text style={styles.titleStyle}>
                Costo de Envio
              </Text>
              <Text style={styles.titleStyle}>
                Bs. 10
              </Text>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Text style={styles.titleStyle}>
                Total
              </Text>
              <Text style={styles.titleStyle}>
                Bs. {this.props.total + 10}
              </Text>
            </CardSection>
          </Card>
          <Card>
            <CardSection>
              <Text style={styles.titleStyle}>
                Detalle de Entrega
              </Text>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Text style={styles.titleStyle}>
                Direccion
              </Text>
              <Text style={styles.contentStyle}>
                calle man cesped edif. patmos 6f
              </Text>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Text style={styles.titleStyle}>
                Forma de pago
              </Text>
              <Text style={styles.contentStyle}>
                Efectivo
              </Text>
            </CardSection>
          </Card>
        </ScrollView>
        <FloatButton text={'Enviar mi pedido'} onPress={this.confirmOrder} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  titleStyle: {
    fontSize: Size.titleCard,
    paddingLeft: 15,
    marginTop: 10,
    fontWeight: FontWeight.titleCard,
  },
  contentStyle: {
    fontSize: Size.descriptionCard,
    paddingLeft: 15,
    marginTop: 10,
    fontWeight: FontWeight.descriptionCard,
    color: Colors.secondaryText
  },
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  }
}

const mapStateToProps = state => {
  const orders = _.map(state.order, (val, uid) => {
    return { ...val, uid };
  });
  const total = _.sumBy(orders, (order) => (order.price * order.quantity));
  return { total };
};

export default connect(mapStateToProps, { orderFetchByUserIdAndStoreId })(CheckoutDetail);
