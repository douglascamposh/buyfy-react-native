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
    const emptyStore = {
      name:'', description:'', deliveryTime:'', shippingCost:'', category:'', image:'', imageName:'', logo:'', logoName:'', uid:'', minimumCost:'', street:'', numberStreet:'', departmentNumber:'', city:'', town:'', streetReference:'', phone:'', latitude:'', longitude:''
    };
    const store = this.props.store ? this.props.store : emptyStore;
    return (
      <SafeAreaView>
        <ScrollView>
          <KeyboardAwareScrollView>
            <Card>
              <StoreForm store={store} saveStore={this.onButtonPress} />
            </Card>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = () => {
  return {};
}

export default connect(mapStateToProps, { storeCreate, storeUpdate })(StoreCreate);
