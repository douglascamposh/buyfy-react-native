import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AppleStyleSwipeableRow, RightActions, Spinner} from '../common';
import { FlatList } from 'react-native';
import { storesByUserIdFetch, storeUpdateFields } from '../../actions';
import { Colors, Size } from '../../constants/Styles';
import { Icon } from 'react-native-elements';
import StoreListItem from './StoreListItem';

class StoreAdminList extends Component {
  
  componentDidMount() {
    this.props.storesByUserIdFetch();
  }

  componentDidUpdate(prevProps) { 
    if(this.props.stores.length !== prevProps.stores.length){
      this.props.storesByUserIdFetch();
    }  
    if(this.props.store){
        if(prevProps.store){
         if(this.props.store.updated_at && prevProps.store.updated_at){
          this.props.storesByUserIdFetch();
         }
        }else{
          this.props.storesByUserIdFetch();
        }    
    } else{
      console.log('enter to else'); 
    }
  }

  storeOnClick = (store) => {
    this.props.navigation.navigate('productAdminList', { storeId: store.uid });
  }

  storeEditOnClick = (store) => {
    this.props.navigation.navigate('editStore', { store });
  }

  storeDeleteOnClick = (store) => {
    this.props.storeUpdateFields({ ...store, deleted: !store.deleted });
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
            name={Boolean(item.deleted) ? 'ios-undo' : 'ios-trash'}
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
    if(this.props.pending){
      return(<Spinner/>)
    }
    return (
      <FlatList
        enableEmptySections
        renderItem={this.renderItem}
        data={this.props.stores}
        keyExtractor={({ uid }) => String(uid)}
      />
    );
  }
}

const mapStateToProps = state => {
  const stores = _.map(state.adminStores.data, (val) => {
    return { ...val };
  });
  const { store } = state.adminStores; 
  const { pending } = state.adminStores;
  return { stores, pending, store };
};

export default connect(mapStateToProps, { storesByUserIdFetch, storeUpdateFields })(StoreAdminList);
