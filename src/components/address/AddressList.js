import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { addressListFetchByUserId, deleteAddress } from '../../actions';
import AddressListItem from './AddressListItem';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AppleStyleSwipeableRow, RightActions, Content, Button, Title, CardSection } from '../common/index';
import { Colors, Size, FontWeight } from '../../constants/Styles';
import { Icon, Overlay } from 'react-native-elements';

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      currentAddress: null
    }
  }

  componentDidMount() {
    this.props.addressListFetchByUserId();
  }

  componentDidUpdate(prevProps) { 
    if(this.props.addresses.length !== prevProps.addresses.length){
      this.props.addressListFetchByUserId();
    }  
  }
  
  addressDetailOnClick = (address) => {
    this.props.navigation.navigate('editAddress', { address });
  }

  addressDeleteOnClick = (addressId) => {
    this.props.deleteAddress(addressId);
    this.setState({isVisible: false})
  }

  renderModal() { 
    const { currentAddress } = this.state;
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false})}
        height="30%"
      >
        <View style={styles.modalStyle}>
          <Title style={[styles.titleStyle, styles.centerContent]}>¿Esta seguro que desea eliminar la direccion?</Title>
          <Content style={styles.centerContent}>La direccion se borrará permanentemente</Content>
          <CardSection style={styles.CardSectionStyle}>
            <Button style={styles.modalButtonStyle} onPress={()=> this.setState({isVisible: false})} >No</Button>
            <Button style={styles.modalButtonStyle} onPress={() => this.addressDeleteOnClick(currentAddress.uid)}>Sí, continuar</Button>
          </CardSection>
        </View>
      </Overlay>
    );
  }

  renderRightActions = (progress, item, close) => {
    const buttonActions = [
      { onPress: () => {close(); this.addressDetailOnClick(item)}, color: Colors.primaryBlue, item: item,
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
      { onPress: () => { this.setState({currentAddress: item, isVisible: true}); close()}, color: Colors.primaryRed, item: item,
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
        {this.renderModal()}
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
  },
  modalStyle: {
    justifyContent: 'center',
    flex: 1
  },
  centerContent: {
    textAlign: 'center',
  },
  titleStyle: {
    fontSize: 20,
    marginTop: 10,
    color: Colors.primaryText
  },
  CardSectionStyle: {
    borderBottomWidth: 0
  },modalButtonStyle: {
    color: Colors.primaryRed,
  }
};

const mapStateToProps = state => {
  const addresses = _.map(state.addresses.data, (val) => {
    return { ...val };
  });
  return { addresses };
};
export default connect(mapStateToProps, { addressListFetchByUserId, deleteAddress })(AddressList);
