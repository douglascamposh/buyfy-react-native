import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CardSection, Title, Card, Content } from '../common';
import { Icon } from 'react-native-elements';
import { Colors } from '../../constants/Styles';
import { connect } from 'react-redux';
import { invoiceFetchById } from '../../actions';
import _ from 'lodash';

class CurrentOrder extends Component {

  componentWillMount() {
    const invoiceId = this.props.navigation.getParam('invoiceId', {});
    this.props.invoiceFetchById(invoiceId);
  }

  render() {
    const invoice = this.props.invoice;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card>
            <CardSection style={styles.cardSectionTitleStyle}>
              <Title style={styles.titleStyle}>Estado de tu pedido</Title>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-sync'
                type='ionicon'
                color={Colors.primaryGreen}
                iconStyle={styles.iconStyle}
              />
              <Content style={styles.contentStyle}>Estamos procesando tu pedido</Content>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-home'
                type='ionicon'
                color={Colors.primaryBlue}
                iconStyle={styles.iconStyle}
              />
              <Content style={styles.contentStyle}>El Local esta preparando tu pedido</Content>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-bicycle'
                type='ionicon'
                color={Colors.disable}
                iconStyle={styles.iconStyle}
              />
              <Content style={styles.contentStyle}>El repartidor esta en camino</Content>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-gift'
                type='ionicon'
                color={Colors.disable}
                iconStyle={styles.iconStyle}
              />
              <Content style={styles.contentStyle}>El pedido ya llego</Content>
            </CardSection>
          </Card>
          <Card>
            <CardSection style={styles.cardSectionTitleStyle}>
              <Title style={styles.titleStyle}>¿Donde esta mi pedido?</Title>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-map'
                type='ionicon'
                color={Colors.disable}
                iconStyle={styles.iconStyle}
              />
              <Content style={styles.contentStyle}>Ver en el mapa</Content>
            </CardSection>
          </Card>
          <Card>
            <CardSection style={styles.cardSectionTitleStyle}>
              <Title style={styles.titleStyle}>Total</Title>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='logo-usd'
                type='ionicon'
                color={Colors.disable}
                iconStyle={styles.iconStyle}
              />
              <Content style={styles.contentStyle}>Bs. {invoice.subTotal + invoice.deliveryPrice}</Content>
            </CardSection>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  iconStyle: {
    paddingLeft: 15
  },
  contentStyle: {
    marginTop: 0
  },
  cardSectionStyle: {
    alignItems: 'center'
  },
  cardSectionTitleStyle: {
    borderBottomWidth: 0
  }
}

const mapStateToProps = state => {
  const invoice = { ...state.invoice };
  
  return { invoice };
};

export default connect(mapStateToProps, { invoiceFetchById })(CurrentOrder);
