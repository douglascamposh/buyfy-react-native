import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { addressListFetchByUserId, deleteAddress } from '../../actions';
import AddressListItem from './AddressListItem';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AppleStyleSwipeableRow, RightActions, Content, Button, Title, CardSection } from '../common/index';
import { Colors, Size, FontWeight } from '../../constants/Styles';
import { Icon, Overlay } from 'react-native-elements';

const AddressList = (props) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const { data: addresses, pending } = useSelector((store) => store.addresses);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(addressListFetchByUserId());
    
  }, [addresses.length]);

  addressDetailOnClick = (address) => {
    props.navigation.navigate('editAddress', { address });
  }

  addressDeleteOnClick = (addressId) => {
    dispatch(deleteAddress(addressId));
    setIsVisible(false);
  }

  renderModal = () => {
    return (
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        height="30%"
      >
        <View style={styles.modalStyle}>
          <Title style={[styles.titleStyle, styles.centerContent]}>¿Esta seguro que desea eliminar la direccion?</Title>
          <Content style={styles.centerContent}>La direccion se borrará permanentemente</Content>
          <CardSection style={styles.CardSectionStyle}>
            <Button style={styles.modalButtonStyle} onPress={() => setIsVisible(false)} >No</Button>
            <Button style={styles.modalButtonStyle} onPress={() => addressDeleteOnClick(currentAddress.uid)}>Sí, continuar</Button>
          </CardSection>
        </View>
      </Overlay>
    );
  }

  renderRightActions = (progress, item, close) => {
    const buttonActions = [
      { onPress: () => {close(); addressDetailOnClick(item)}, color: Colors.primaryBlue, item: item,
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
      { onPress: () => {
        setCurrentAddress(item);
        setIsVisible(true);
        close();
      }, color: Colors.primaryRed, item: item,
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
        renderRightActions={renderRightActions}
        item={address}>
        <AddressListItem address={address} addressDetailOnClick={addressDetailOnClick} />
      </AppleStyleSwipeableRow>
    );
  }
  
  return (
    <View style={styles.container}>
      {renderModal()}
      <FlatList
        enableEmptySections
        renderItem={renderItem}
        data={addresses}
        keyExtractor={({ uid }) => String(uid)}
      />
    </View>
  );
  
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

export default AddressList;
