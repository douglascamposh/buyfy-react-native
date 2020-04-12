import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddressForm from './AddressForm';
import { addressCreate, addressUpdate } from '../../actions';
// import { ScrollView } from 'react-native-gesture-handler';

import { ScrollView, View, SafeAreaView } from 'react-native';
import { Title, CardSection, Button } from '../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Overlay, Icon } from 'react-native-elements';
import { Size, FontWeight, Colors } from '../../constants/Styles';

class AddressCreateUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  saveAddress = ({ name, street, numberStreet, departmentNumber, city, town, streetReference, phone, uid }) => {
    !uid ? this.props.addressCreate({ name, street, numberStreet, departmentNumber, city, town, streetReference, phone }) :
      this.props.addressUpdate({ name, street, numberStreet, departmentNumber, city, town, streetReference, phone, uid });
    this.setState({ isVisible: true });
  }

  navigateTo = (route) => {
    this.setState({ isVisible: false });
    const addressId = this.props.addressId;
    this.props.navigation.navigate(route, { addressId });
  }

  renderModal() {
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={this.navigateToProductList}
      >
        <View style={styles.modalStyle}>
          <Icon
            name='ios-checkmark-circle-outline'
            type='ionicon'
            color={Colors.primaryGreen}
            size={200}
          />
          <Title style={[styles.titleStyle, styles.centerContent]}>Se guardo la Direccion!</Title>
          <CardSection>
            <Button style={styles.modalButtonStyle} onPress={(route) => this.navigateTo('addressList')}>Ver mis direcciones</Button>
          </CardSection>
        </View>
      </Overlay>
    );
  }

  render() {
    const { street, numberStreet, departmentNumber, city, town, streetReference, phone, uid } = this.props.address ? this.props.address : this.props;
    const address = { street, numberStreet, departmentNumber, city, town, streetReference, phone, uid };
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAwareScrollView>
            <Title style={styles.titleStyleHeader}>
              {this.props.title}
            </Title>
            <AddressForm
              address={address}
              saveAddress={this.saveAddress}
            />
            {this.renderModal()}
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { name, street, numberStreet, departmentNumber, city, town, streetReference, phone, uid } = state.addressForm;
  return { name, street, numberStreet, departmentNumber, city, town, streetReference, phone, uid };
};

const styles = {
  container: {
    flex: 1,
    marginLeft: 15
  },
  titleStyleHeader: {
    fontSize: Size.header,
    fontWeight: FontWeight.header
  },
  titleStyle: {
    fontSize: 25,
    marginTop: 10,
    color: Colors.primaryText
  },
  centerContent: {
    textAlign: 'center',
    paddingLeft: 0
  },
  modalStyle: {
    justifyContent: 'center',
    flex: 1
  },
  modalButtonStyle: {
    color: Colors.primaryRed
  }
}

export default connect(mapStateToProps, { addressCreate, addressUpdate })(AddressCreateUpdate);