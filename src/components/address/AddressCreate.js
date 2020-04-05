import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddressForm from './AddressForm';
import { addressCreate, addressUpdateForm, addressUpdate } from '../../actions';
// import { ScrollView } from 'react-native-gesture-handler';

import { ScrollView, View } from 'react-native';
import { Title, CardSection, Button } from '../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Overlay, Icon } from 'react-native-elements';
import { Size, FontWeight, Colors } from '../../constants/Styles';

class AddressCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  componentWillMount() {
    if(this.props.address) {
      console.log('componentWillMount',this.props.address.uid);
      _.each(this.props.address, (value, prop) => {
        this.props.addressUpdateForm({prop, value});
      });
    }    
  }

  saveAddress = () => {
    const { street, numberStreet, departmentNumber, city, town, streetReference, phone, uid } = this.props;
    console.log('uid', uid);
    !uid ? this.props.addressCreate({ street, numberStreet, departmentNumber, city, town, streetReference, phone }) :
      this.props.addressUpdate({ street, numberStreet, departmentNumber, city, town, streetReference, phone, uid });
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
    return (
      <View>
        <ScrollView>
          <KeyboardAwareScrollView>
            <Title style={styles.titleStyleHeader}>
              {this.props.title}
            </Title>
            <AddressForm/>
            {this.renderModal()}
            <Button style={styles.modalButtonStyle} onPress={this.saveAddress}>Guardar</Button>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { street, numberStreet, departmentNumber, city, town, streetReference, phone, uid } = state.addressForm;
  return { street, numberStreet, departmentNumber, city, town, streetReference, phone, uid };
};

const styles = {
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

export default connect(mapStateToProps, { addressCreate, addressUpdate, addressUpdateForm })(AddressCreate);