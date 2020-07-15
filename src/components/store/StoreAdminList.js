import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AppleStyleSwipeableRow, RightActions } from '../common';
import { FlatList, ScrollView } from 'react-native';
import { storesByUserIdFetch } from '../../actions';
import { Colors, Size } from '../../constants/Styles';
import { Icon } from 'react-native-elements';
import StoreListItem from './StoreListItem';

class StoreAdminList extends Component {
  
  componentDidMount() {
    this.props.storesByUserIdFetch();
  }

  storeOnClick = (store) => {
    this.props.navigation.navigate('productAdminList', { store });
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
        <FlatList
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.stores}
          keyExtractor={({ uid }) => String(uid)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const stores = _.map(state.stores, (val, uid) => {
    return { ...val, uid };
  });

  return { stores };
};

export default connect(mapStateToProps, { storesByUserIdFetch })(StoreAdminList);