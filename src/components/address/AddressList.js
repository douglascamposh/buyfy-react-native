import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { addressFetchByUserId } from '../../actions';
import AddressListItem from './AddressListItem';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class AddressList extends Component {

  componentWillMount() {
    this.props.addressFetchByUserId();
  }

  addressDetailOnClick = (address) => {
    this.props.navigation.navigate('editAddress', { address });
  }

  renderItem = ({item: address}) => {
    return <AddressListItem address={address} addressDetailOnClick={this.addressDetailOnClick}/>
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.addresses}
          keyExtractor={({ uid }) => String(uid)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const mapStateToProps = state => {
  const addresses = _.map(state.addresses, (val, uid) => {
    return { ...val, uid };
  });
  return { addresses };
};
export default connect(mapStateToProps, { addressFetchByUserId })(AddressList);
