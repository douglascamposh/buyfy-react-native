import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AppleStyleSwipeableRow, RightActions, Spinner} from '../common';
import { FlatList, RefreshControl } from 'react-native';
import { storesByUserIdFetch, storeUpdateFields, disableEnableStore } from '../../actions';
import { Colors, Size } from '../../constants/Styles';
import { Icon } from 'react-native-elements';
import StoreListItem from './StoreListItem';

class StoreAdminList extends Component {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.storesByUserIdFetch();
  }

  componentDidUpdate(prevProps) { 
    if(this.props.stores.length !== prevProps.stores.length){
      this.props.storesByUserIdFetch();
    }
  }

  storeOnClick = (store) => {
    this.props.navigation.navigate('productAdminList', { storeId: store.uid, name: store.name });
  }

  storeEditOnClick = (store) => {
    this.props.navigation.navigate('editStore', { store });
  }

  storeDeleteOnClick = (store) => {
    this.props.disableEnableStore({ ...store, deleted: !store.deleted });
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
            name={Boolean(item.deleted) ? 'arrow-undo-sharp' : 'ios-trash'}
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

  onRefresh() {
    this.props.storesByUserIdFetch();
  }

  render() {
    if(this.props.pending){
      return <Spinner />
    }
    return (
      <FlatList
        enableEmptySections
        renderItem={this.renderItem}
        data={this.props.stores}
        keyExtractor={({ uid }) => String(uid)}
        refreshControl={
          <RefreshControl
            refreshing={this.props.pending}
            onRefresh={()=> this.onRefresh()}
            colors={[Colors.headerBlue]}
            tintColor={Colors.headerBlue}
          />
        }
      />
    );
  }
}

const mapStateToProps = state => {
  const stores = _.map(state.adminStores.data, (val) => {
    return { ...val };
  });
  const { pending } = state.adminStores;
  return { stores, pending };
};

export default connect(mapStateToProps, { storesByUserIdFetch, storeUpdateFields, disableEnableStore })(StoreAdminList);
