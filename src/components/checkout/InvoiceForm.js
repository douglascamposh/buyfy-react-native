import React, { Component } from 'react';
import { connect } from 'react-redux';
import { invoiceUpdateForm } from '../../actions';
import { CardSection, Input, Card, Title, Content } from '../common';

class InvoiceForm extends Component {

  render() {
    return (
      <Card>
        <CardSection>
          <Title>
            Detalle de Entrega
          </Title>
        </CardSection>
        <CardSection style={styles.cardSectionStyle}>
          <Input
            label="Direccion"
            placeholder="calle man cesped edif. patmos 6f"
            value={this.props.deliveryAddress}
            onChangeText={value => this.props.invoiceUpdateForm({ prop: 'deliveryAddress', value })}
          />
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
      </Card>
    );
  }
}

const styles = {
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  }
}

const mapStateToProps = (state) => {
  const { deliveryAddress, nit, deliveryPrice } = state.invoiceForm;
  return { deliveryAddress, nit, deliveryPrice };
}

export default connect(mapStateToProps, { invoiceUpdateForm })(InvoiceForm);
