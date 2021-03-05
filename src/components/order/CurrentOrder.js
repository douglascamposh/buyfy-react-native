import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { CardSection, Title, Card, Content } from '../common';
import { Icon } from 'react-native-elements';
import { Colors } from '../../constants/Styles';
import { connect } from 'react-redux';
import { invoiceFetchById } from '../../actions';
import { invoiceStates } from '../../constants/Enum';
import _ from 'lodash';

class CurrentOrder extends Component {

  componentDidMount() {
    const invoiceId = this.props.navigation.getParam('invoiceId', {});
    this.props.invoiceFetchById(invoiceId);
  }

  getColorByState = (state) => {
    return { color: this.getColor(state)};
  }
  
  getColor = (state) => {
    currentState = this.props.invoice.state;
    if (currentState > state) {
      return Colors.primaryGreen;
    }
    if (currentState == state) {
      return Colors.primaryBlue;
    }
    return Colors.disable;
  }

  viewMyOrderPosition = () => {
    this.props.navigation.navigate('map')
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
                color={this.getColor(invoiceStates.created)}
                iconStyle={styles.iconStyle}
              />
              <Content style={[styles.contentStyle, this.getColorByState(invoiceStates.created)]}>
                Estamos procesando tu pedido
              </Content>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-home'
                type='ionicon'
                color={this.getColor(invoiceStates.received)}
                iconStyle={styles.iconStyle}
              />
              <Content style={[styles.contentStyle, this.getColorByState(invoiceStates.received)]}>
                El Local esta preparando tu pedido
              </Content>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-bicycle'
                type='ionicon'
                color={this.getColor(invoiceStates.processed)}
                iconStyle={styles.iconStyle}
              />
              <Content style={[styles.contentStyle, this.getColorByState(invoiceStates.processed)]}>
                El repartidor esta en camino
              </Content>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-gift'
                type='ionicon'
                color={this.getColor(invoiceStates.delivered)}
                iconStyle={styles.iconStyle}
              />
              <Content style={[styles.contentStyle, this.getColorByState(invoiceStates.delivered)]}>
                El pedido ya llego
                </Content>
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
              {/* Todo: verify if the rider is delivering */}
              <TouchableOpacity onPress={this.viewMyOrderPosition}>
                <Content style={styles.contentStyle}>Ver en el mapa</Content>
              </TouchableOpacity>
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
              <Content style={styles.contentStyle}>Bs. {Number(invoice.subTotal) + Number(invoice.shippingCost)}</Content>
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
    marginTop: 0,
    paddingLeft: 10
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
