import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productUpdateForm } from '../../actions';
import { View } from 'react-native';
import { CardSection } from '../common';
import { Card, Text, Input } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';

class ProductOrderForm extends Component {

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Text h4>
              Unidades
            </Text>
          </CardSection>
          <CardSection>
            <NumericInput
              value={this.props.quantity}
              onChange={value => this.props.productUpdateForm({prop: 'quantity', value})}
              onLimitReached={(isMax,msg) => console.log(isMax,msg)}
              minValue={1}
              maxValue={10}
              initValue={1}
              totalWidth={110} 
              totalHeight={40}
              separatorWidth={0}
              iconSize={20}
              valueType='integer'
              rounded
              borderColor='red'
              textColor='red' 
              iconStyle={{ color: 'red' }} 
              rightButtonBackgroundColor='white' 
              leftButtonBackgroundColor='white'/>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Text h4>
              ¿Quieres aclarar algo?
            </Text>
          </CardSection>
          <CardSection>
            <Input
              placeholder="Notas al producto"
              value={this.props.notes}
              onChangeText={value => this.props.productUpdateForm({prop: 'notes', value})}
            />
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { quantity, notes } = state.productOrderForm;
  return { quantity, notes };
}

export default connect(mapStateToProps, {productUpdateForm})(ProductOrderForm);
