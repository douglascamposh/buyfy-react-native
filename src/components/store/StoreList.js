import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';
import { storesFetch, deleteStore } from '../../actions';
import StoreListItem from './StoreListItem';
import InvoiceCards from '../checkout/InvoiceCards';
import { Card, AppleStyleSwipeableRow, RightActions } from '../common';
import { Colors, Size } from '../../constants/Styles';
import { Icon } from 'react-native-elements';
import RecomendedStores from './RecomendedStores';

class StoreList extends Component {

  componentWillMount() {
    this.props.storesFetch();
  }

  storeOnClick = (store) => {
    this.props.navigation.navigate('productList', { store });
  }

  invoiceCardOnClick = (invoiceId) => {
    this.props.navigation.navigate('currentOrder', { invoiceId });
  }

  storeEditOnClick = (store) => {
    this.props.navigation.navigate('editStore', { store });
  }

  storeDeleteOnClick = (store) => {
    this.props.deleteStore(store.uid);
  }

  renderRightActions = (progress, item, close) => {
    const buttonActions = [
      {
        onPress: () => { close(); this.storeEditOnClick(item); }, color: Colors.primaryBlue, item: item,
        icon: (
          <Icon
            name='ios-create'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
          />
        )
      },
      {
        onPress: () => { this.storeDeleteOnClick(item); close(); }, color: Colors.primaryRed, item: item,
        icon: (
          <Icon
            name='ios-trash'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
          />
        )
      }
    ];
    return (
      <RightActions progress={progress} buttonActions={buttonActions} />
    )
  };

  renderItem = ({ item: store }) => {
    return (
      <AppleStyleSwipeableRow
        renderRightActions={this.renderRightActions}
        item={store}>
        <StoreListItem store={store} storeOnClick={this.storeOnClick} />
      </AppleStyleSwipeableRow>
    );
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <RecomendedStores stores={this.props.stores}/>
        </Card>
        <InvoiceCards
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
