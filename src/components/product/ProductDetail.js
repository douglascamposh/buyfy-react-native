import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Overlay } from 'react-native-elements';
import { Card, AsyncTile, FloatButton, Title, Content, CardSection, Button } from '../common';
import { View, ScrollView } from 'react-native';
import ProductOrderForm from './ProductOrderForm';
import { orderCreate } from '../../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../../constants/Styles';

const ProductDetail = (props) => {

  const [isVisible, setIsVisible] = useState(true);

  const { quantity, notes } = useSelector((store) => store.productOrderForm);
  const { isLoged } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const addToOrder = () => {
    const { uid: productId, price, storeId, name, description } = props.product;
    dispatch(orderCreate({ productId, quantity, notes, price, name, description, storeId }));
    props.navigateTo('productList');
  }

  const renderModal = () => { 
    if(isLoged && isVisible){   
      setIsVisible(false);
    }
    return (
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        height="30%"
      >
        <View style={styles.modalStyle}>
          <Title style={[styles.titleStyle, styles.centerContent]}>Para continuar debe iniciar sesion</Title>
          <CardSection style={styles.CardSectionStyle}>
            <Button style={styles.modalButtonStyle} onPress={()=> props.navigateTo('auth')}>iniciar sesion</Button>
            <Button style={styles.modalButtonStyle} onPress={()=> props.navigateTo('storeList')} >volver</Button>
          </CardSection>
        </View>
      </Overlay>
    );
  }
    
  const { name, description, price, imageUri } = props.product;
    
  return (
    <View style={styles.container}>
      {renderModal()} 
      <View style={styles.containerDetail}>
        <ScrollView>
          <KeyboardAwareScrollView>
          <Card>
              <AsyncTile uri={imageUri} title={name}>
              <Content style={styles.descriptionStyle}>
                {description}
              </Content>
              <Title>
                {price} Bs.
              </Title>
            </AsyncTile>
          </Card>
          <ProductOrderForm />
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
      {
        isLoged ?  <FloatButton text={'Agregar a mi pedido'} onPress={()=>addToOrder()}/> :
        <FloatButton style={styles.buttonDisable} text={'Agregar a mi pedido'} onPress={() => setIsVisible(true)}/>
      }   
    </View>
  );
}

const styles = {
  container: {
    flex: 1
  },
  containerDetail: {
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  descriptionStyle: {
    marginTop: 0
  },
  centerContent: {
    textAlign: 'center',
  },
  titleStyle: {
    fontSize: 20,
    marginTop: 10,
    color: Colors.primaryText
  },
  modalStyle: {
    justifyContent: 'center',
    flex: 1
  },
  modalButtonStyle: {
    color: Colors.primaryRed,
  },
  CardSectionStyle: {
    borderBottomWidth: 0
  },
  buttonDisable: {
    backgroundColor: Colors.secondaryTextInverse,
  }
};

export default ProductDetail;