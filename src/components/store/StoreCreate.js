import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeCreate, storeUpdate, storeCategoryListFetch } from '../../actions';
import { Card, Spinner } from '../common';
import StoreForm from '../store/StoreForm';
import _ from 'lodash';
import { ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class StoreCreate extends Component {
  componentDidMount(){
    this.props.storeCategoryListFetch();
  }
  
  onButtonPress = (store) => {
    !store.uid ? this.props.storeCreate({ ...store }) : this.props.storeUpdate({ ...store });
    this.props.navigateTo();
  }

  render() { 
    if(this.props.pending){
      return <Spinner/>
    }
    const store = this.props.store ? 
    { ...this.props.store, categories: this.props.categories } : 
    { ...this.props.newStore, categories: this.props.categories };
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

const mapStateToProps = (state) => {
  const newStore = state.storeForm;
  const categories = _.map(state.categoriesStore.data, (val) => {
    return { ...val };
  });
  const { pending } = state.categoriesStore;
  return { newStore, categories, pending };
}

export default connect(mapStateToProps, { storeCreate, storeUpdate, storeCategoryListFetch })(StoreCreate);
