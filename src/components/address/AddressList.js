import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { addressFetchByUserId, deleteAddress } from '../../actions';
import { StackActions, NavigationActions } from 'react-navigation';
import AddressListItem from './AddressListItem';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AppleStyleSwipeableRow, RightActions } from '../common/index';
import { Colors, Size, FontWeight } from '../../constants/Styles';
import { Icon } from 'react-native-elements';

class AddressList extends Component {

  componentDidMount() {
    this.props.addressFetchByUserId();
  }

  componentDidUpdate(prevProps) { 
    if(this.props.addresses.length !== prevProps.addresses.length){
      this.props.addressFetchByUserId();
    }  
  }
  
  addressDetailOnClick = (address) => {
    this.props.navigation.navigate('editAddress', { address });
  }

  addressDeleteOnClick = (address) => {
    this.props.deleteAddress(address.uid);
  }

  renderRightActions = (progress, item) => {
    const buttonActions = [
      { onPress: this.addressDetailOnClick, color: Colors.primaryBlue, item: item,
        icon: (
          <Icon
            name='ios-create'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse }
            iconStyle={styles.iconStyle}
          />
        )
      },
      { onPress: this.addressDeleteOnClick, color: Colors.primaryRed, item: item,
        icon: (
          <Icon
            name='ios-trash'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
            iconStyle={styles.iconStyle}
          />
        )
      }
    ];
    return (
      <RightActions progress={progress} buttonActions={buttonActions}/>
  )};

  renderItem = ({item: address}) => {
    return (
      <AppleStyleSwipeableRow
        renderRightActions={this.renderRightActions}
        item={address}>
        <AddressListItem address={address} addressDetailOnClick={this.addressDetailOnClick} />
      </AppleStyleSwipeableRow>
    );
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
  iconStyle: {
    fontWeight: FontWeight.button
  }
};

const mapStateToProps = state => {
  const addresses = _.map(state.addresses, (val) => {
    return { ...val };
  });
  return { addresses };
};
export default connect(mapStateToProps, { addressFetchByUserId, deleteAddress })(AddressList);
