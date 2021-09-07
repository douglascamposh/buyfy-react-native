import React from 'react';
import { View, ScrollView } from 'react-native';
import 'firebase/firestore';
import { Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from 'react-native-fast-toast'
import { createUser } from '../../actions'
import { Colors } from '../../constants/Styles';
import SignUpEmailForm from './SignUpEmailForm';

const SignUpEmail = (props) => {
  const toast = useToast();
  const { firstName, lastName, email, password, confirmPassword, signUpError, pending} = useSelector((store) => store.emailForm);
  const dispatch = useDispatch();
  
  const OnButtonPress = (user) => {
    dispatch(createUser(user));
  }

  const showToast = () =>{
    if(signUpError){
      toast.show("Error al crear usuario", {
        icon: <Icon name="close-sharp" type='ionicon' color='#fff'/>,
        duration: 2500,			
        style: { 
          padding: 0, 
          backgroundColor: Colors.primaryRed 
        },
        textStyle: { fontSize: 15 } 
      });
    }  
  }
  
  return (
    <View style={styles.container}>
     <SignUpEmailForm user={{ firstName, lastName, email, password, confirmPassword, pending }} signUp={OnButtonPress} navigateTo={props.navigateTo}/>
     {showToast()}
    </View>
  );
}

const styles = {
  container: {
    width:'100%',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default SignUpEmail;