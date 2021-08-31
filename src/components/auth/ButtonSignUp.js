import React, { useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from 'react-native-fast-toast'
import {createUser} from '../../actions'
import { Input, Icon } from 'react-native-elements'
import { Text, View } from 'react-native';
import { Button, Spinner } from '../common';
import LoginEmailForm from './LoginEmailForm';
import { FontWeight, Size, Colors, Padding } from '../../constants/Styles';
import SignUpEmailForm from './SignUpEmailForm';
import { create } from 'lodash';

const ButtonSignUp = (props) => {

  return (
    <Button style={styles.loginBtn} textStyle={styles.loginText} onPress={()=> props.navigateSignUp()}>Crear cuenta</Button>
  );
}

const styles = {
  loginBtn:{
    width: "80%",
    backgroundColor: Colors.primaryRed,
    borderRadius: 25,
    marginTop: 40,
    flex: 0,
    borderColor: Colors.primaryRed
  },
  loginText:{
    color: Colors.primaryTextInverse
  },  
};

export default ButtonSignUp;