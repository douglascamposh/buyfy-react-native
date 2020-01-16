import React from 'react';
import { View } from 'react-native';
import { Title, Content, CardSection } from '../common';

const Invoice = (props) => {

  return (
    <View>
      <CardSection style={styles.cardSectionStyle}>
        <Title>
          Subtotal
        </Title>
        <Title>
          Bs. {props.totalOrders}
        </Title>
      </CardSection>
      <CardSection style={styles.cardSectionStyle}>
        <Title>
          Costo de Envio
        </Title>
        <Content>
          Bs. 10
        </Content>
      </CardSection>
      <CardSection style={styles.cardSectionStyle}>
        <Title>
          Total
        </Title>
        <Title>
          Bs. {props.totalOrders + 10}
        </Title>
      </CardSection>
    </View>
  );
}

const styles = {
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  }
}

export default Invoice;
