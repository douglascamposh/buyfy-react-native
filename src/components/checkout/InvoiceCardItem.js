import _ from 'lodash';
import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { storeFetchById } from '../../actions';
import { Card, CardSection, Title, Content } from '../common';
import { Icon } from 'react-native-elements';
import { Size, Colors, Padding } from '../../constants/Styles';

class InvoiceCardItem extends Component {

  componentDidMount() {
    const { invoice } = this.props;
    this.props.storeFetchById(invoice.storeId);
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
    
  }
  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  render() {
    const { invoice, onPress, store } = this.props;
    const date = new Date(invoice.created_at);
    const h = this.addZero(date.getHours());
    const m = this.addZero(date.getMinutes());
    const date2 = this.addMinutes(date, Number(store.deliveryTime));
    const h2 = this.addZero(date2.getHours());
    const m2 = this.addZero(date2.getMinutes());
    return (
      <Card style={styles.cardStyle}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View>
            <CardSection>
              <View>
                <Title>Estamos procesando tu pedido</Title>
                <Content>{store.name}</Content>
              </View>
            </CardSection>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-timer'
                type='ionicon'
                size={Size.iconInput}
                color={Colors.secondaryText}
                iconStyle={styles.iconStyle}
              />
              <Content style={styles.textStyle}>{`${h}:${m} - ${h2}:${m2}`}</Content>
            </CardSection>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}

const styles = {
  cardStyle: {
    borderBottomWidth: 2,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 10
  },
  cardSectionStyle: {
    borderBottomWidth: 0
  },
  iconStyle: {
    paddingRight: Padding.headerLeft
  },
  textStyle: {
    marginTop: 0,
    alignSelf: 'center'
  }
};

const mapStateToProps = state => {
  const store = { ...state.store };
  return { store };
};

export default connect(mapStateToProps, { storeFetchById })(InvoiceCardItem);
