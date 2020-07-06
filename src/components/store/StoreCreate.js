import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeCreate, storeUpdate } from '../../actions';
import { Card } from '../common';
import StoreForm from '../store/StoreForm';
import { ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class StoreCreate extends Component {
  
  onButtonPress = (store) => {
    !store.uid ? this.props.storeCreate({ ...store }) : this.props.storeUpdate({ ...store });
    this.props.navigateTo();
  }

  render() {
    const { name, description, deliveryTime, shippingCost, category, image, imageName, uid, minimumCost,
      street, numberStreet, departmentNumber, city, town, streetReference, phone, latitude, longitude } = this.props.store ? this.props.store : this.props;
    return (
      <SafeAreaView>
        <ScrollView>
          <KeyboardAwareScrollView>
            <Card>
              <StoreForm store={{ name, description, deliveryTime, shippingCost, category, image, imageName, uid, minimumCost, street, numberStreet, departmentNumber, city, town, streetReference, phone, latitude, longitude }} saveStore={this.onButtonPress} />
            </Card>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, description, deliveryTime, shippingCost, category, image, imageName, uid, minimumCost, street, numberStreet, departmentNumber, city, town, streetReference, phone, latitude, longitude } = state.storeForm;
  return { name, description, deliveryTime, shippingCost, category, image, imageName, uid, minimumCost, street, numberStreet, departmentNumber, city, town, streetReference, phone, latitude, longitude };
}

export default connect(mapStateToProps, { storeCreate, storeUpdate })(StoreCreate);
