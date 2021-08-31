import React from 'react';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from 'react-native-fast-toast'
import { signInUser } from '../../actions'
import { Icon } from 'react-native-elements'
import { Text, View } from 'react-native';
import LoginEmailForm from './LoginEmailForm';
import { FontWeight, Colors } from '../../constants/Styles';

const LoginEmail = (props) => {
  const toast = useToast();
  const { email, password, error, pending} = useSelector((store) => store.emailForm);
  const dispatch = useDispatch();

  const onPressButton = (user) => {
    dispatch(signInUser(user))
  }

  const onPressButtonSignUp = () => {
    props.navigateSignUp()
  } 
  
  const showToast = () =>{
    if(error){
      toast.show("Usuario no encontrado, por favor crea una cuenta", {
        icon: <Icon name="close-sharp" type='ionicon' color='#fff'/>,
        duration: 2500,			
        style: { 
          padding: 0, 
          backgroundColor: Colors.primaryRed 
        },
        textStyle: { fontSize: 15, textAlign: 'center', paddingRight: 35} 
      });
    }  
  }
    
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BuyFy</Text>
      <LoginEmailForm user={{ email, password, error, pending }} saveUser={onPressButton} signUp={onPressButtonSignUp}/>
      {showToast()}
    </View>
  );
}

const styles = {
  errorTextStyle: {
    alignSelf: 'center',
    color: Colors.primaryRed
  },
  container: {
    width: '80%',
  },
  logo:{
    textAlign:'center',
    fontWeight: FontWeight.header,
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  }, 
};

export default LoginEmail;