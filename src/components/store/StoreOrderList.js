import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FlatList } from 'react-native';
import { storesByUserIdFetch } from '../../actions';
import StoreListItem from './StoreListItem';

class StoreOrderList extends Component {

  componentDidMount() {
    this.props.storesByUserIdFetch();
  }

  storeOnClick = (store) => {
    this.props.navigation.navigate('ordersStore', { store });
  }

  renderItem = ({ item: store }) => {
    return (
      <StoreListItem store={store} storeOnClick={this.storeOnClick} />
    );
  }

  render() {
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

  return { stores };
};

export default connect(mapStateToProps, { storesByUserIdFetch })(StoreOrderList);
