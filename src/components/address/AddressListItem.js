import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Title, Content } from '../common';

class AddressListItem extends Component {

  onRowPress() {
    this.props.addressDetailOnClick(this.props.address);
  }

  render() {
    const { street, numberStreet, departmentNumber, streetReference, phone } = this.props.address;
    return(
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={styles.cardSectionStyle}>
            <Content>{`${street} ${numberStreet} ${streetReference} ${departmentNumber || ''} ${phone}`}</Content>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  cardSectionStyle: {
    flexDirection: 'row',
  }
};

export default AddressListItem;
