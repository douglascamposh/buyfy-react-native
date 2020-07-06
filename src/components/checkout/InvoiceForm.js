import React, { Component } from 'react';
import { connect } from 'react-redux';
import { invoiceUpdateForm } from '../../actions';
import { CardSection, Input, Card, Title, Content } from '../common';
import { Overlay, Icon } from 'react-native-elements';
import { Size, Colors } from '../../constants/Styles';

import { FlatList } from 'react-native-gesture-handler';
import AddressListItem from '../address/AddressListItem';
import { View } from 'react-native';

class InvoiceForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  addressDetailOnClick = ({ uid }) => {
    this.props.invoiceUpdateForm({ prop: 'addressId', value: uid });
    this.setState({ isVisible: false });
  }

  renderItem = ({ item: address }) => {
    return (
      <AddressListItem address={address} addressDetailOnClick={this.addressDetailOnClick} />
    );
  }

  renderModalAddressList() {
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false})}
      >
        <View>
          <Title>
            Selecciona una Dirección
          </Title>
          <FlatList
            enableEmptySections
            renderItem={this.renderItem}
            data={this.props.userAddresses}
            keyExtractor={({ uid }) => String(uid)}
          />
        </View>
      </Overlay>
    );
  }

  showModal = () => {
    this.setState({ isVisible: true });
  }

  render() {
    const address = this.props.addressId ? this.props.userAddresses.filter(address => address.uid === this.props.addressId)[0] || {} : this.props.userAddresses[0] || {};
    const addressText = address.street ? `${address.street} ${address.numberStreet} ${address.streetReference} ${address.departmentNumber || ''} ${address.phone}` : 'Ingresa tu direccion';
    return (
      <Card>
        <CardSection>
          <Title>
            Detalle de Entrega
          </Title>
        </CardSection>
        <CardSection style={styles.cardSectionStyle}>
          <Title>
            Direccion
          </Title>
          <View style={styles.cardAddress}>
            <Content numberOfLines={2} style={styles.addressStyle}>
              {addressText}
            </Content>
            <Icon
              name='ios-create'
              type='ionicon'
              color={Colors.primaryRed}
              size={Size.iconButton}
              onPress={this.showModal}
              containerStyle={styles.iconAddress}
            />
          </View>
        </CardSection>
        <CardSection style={styles.cardSectionStyle}>
          <Title>
            Forma de pago
          </Title>
          <Content>
            Efectivo
          </Content>
        </CardSection>
        <CardSection style={styles.cardSectionStyle}>
          <Title>
            Tipo de Entrega
          </Title>
          <Content>
            Delivery
          </Content>
        </CardSection>
        <CardSection style={styles.cardSectionStyle}>
          <Title>
            Horario
          </Title>
          <Content>
            Entrega Inmediata
          </Content>
        </CardSection>
        <CardSection style={styles.cardSectionStyle}>
          <Input
            label="CI/NIT"
            value={this.props.nit}
            onChangeText={value => this.props.invoiceUpdateForm({ prop: 'nit', value })}
          />
        </CardSection>
        {this.renderModalAddressList()}
      </Card>
    );
  }
}

const styles = {
  cardSectionStyle: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  cardAddress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressStyle: {
    width: '90%'
  },
  iconAddress: {
    width: '10%'
  }
}

const mapStateToProps = (state) => {
  const { addressId, nit, shippingCost } = state.invoiceForm;
  return { addressId, nit, shippingCost };
}

export default connect(mapStateToProps, { invoiceUpdateForm })(InvoiceForm);
