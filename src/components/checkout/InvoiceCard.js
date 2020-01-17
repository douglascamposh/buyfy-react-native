import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { invoiceFetchByUserId } from '../../actions';
import { Card, CardSection, Title, Content, Carrousel } from '../common';
import { Icon } from 'react-native-elements';

class InvoiceCard extends Component {

  componentWillMount() {
    this.props.invoiceFetchByUserId();
  }

  invoiceOnPress = ({ uid }) => {
    this.props.onInvoiceCardClick(uid);
  }

  renderItem = (item) => {
    const onPress = () => this.invoiceOnPress(item);
    return (
      <Card style={styles.cardStyle} onPress={onPress}>
        <CardSection>
          <View>
            <Title>Estamos procesando tu pedido</Title>
            <Content>Direccion de pollos pacocabana</Content>
          </View>
        </CardSection>
        <CardSection style={styles.cardSectionStyle}>
          <Icon
            name='ios-timer'
            type='ionicon'
          />
          <Content>20:15 - 22:30</Content>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <View>
        { Boolean(this.props.invoices.length) && (
          <Carrousel
            style={styles.carrouselStyle}
            data={this.props.invoices}
            renderItem={this.renderItem}
            keyExtractor={({ uid }) => String(uid)}
          />
        )}
      </View>
    );
  }
}


const styles = {
  cardStyle: {
    borderBottomWidth: 2,
    borderWidth: 2,
    borderRadius: 10
  },
  carrouselStyle: {
    height: 140,
    paddingLeft: 10
  },
  cardSectionStyle: {
    borderBottomWidth: 0
  }
};

const mapStateToProps = state => {
  const invoices = _.map(state.invoices, (val, uid) => {
    return { ...val, uid };
  });
  return { invoices };
};

export default connect(mapStateToProps, { invoiceFetchByUserId })(InvoiceCard);
