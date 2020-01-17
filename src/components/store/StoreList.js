import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';
import { storesFetch, orderFetchByUserIdAndStoreIdAndState } from '../../actions';
import StoreListItem from './StoreListItem';
import InvoiceCard from '../checkout/InvoiceCard';

class StoreList extends Component {

  componentWillMount() {
    this.props.storesFetch();
  }

  storeOnClick = (store) => {
    this.props.navigation.navigate('productList', { store });
  }

  renderItem = ({item: store}) => {
    return <StoreListItem store={store} storeOnClick={this.storeOnClick} />
  }

  invoiceCardOnClick = (invoiceId) => {
    this.props.navigation.navigate('currentOrder', { invoiceId });
  }

  render() {
    return (
      <ScrollView>
        <InvoiceCard
          onInvoiceCardClick={this.invoiceCardOnClick}
        />
        <FlatList
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.stores}
          keyExtractor={({uid}) => String(uid)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const stores = _.map(state.stores, (val, uid) => {
    return {...val, uid};
  });

  return { stores };
};

export default connect(mapStateToProps, { storesFetch })(StoreList);
