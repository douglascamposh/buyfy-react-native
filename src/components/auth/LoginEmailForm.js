import React, { useState  } from 'react';
import { TextInput, Button, GoogleMap, CardSection, Title, Content } from '../common';
import { View } from 'react-native';
import { FontWeight, Size, Colors, Padding } from '../../constants/Styles';
import { Input, Icon } from 'react-native-elements'
import { Formik } from 'formik';
import { Spinner } from '../common';
import * as yup from 'yup';

const UserSchema = yup.object({
  email: yup.string().email('Ingresa un email valido')
    .label('Email')
    .required('Debes ingresar el ${label}.')
    .min(5)
    .trim(),
    password: yup.string().required('Password es requerido'),
});

const LoginEmailForm = ({user, saveUser, signUp}) => {

  const buttonCreateOrLogin = (props) => {
    if(user.pending){
      return <Spinner size={'small'}/>
    } else {
      return (
        <>
          <Button style={styles.loginBtn} textStyle={styles.loginText} onPress={props.handleSubmit}>Inicar sesion</Button>
          <Button style={styles.loginBtn} textStyle={styles.loginText} onPress={()=>signUp()}>Crear cuenta</Button>
        </>
      )
    } 
  }
  
  return (  
    <Formik
      initialValues={{ ...user }}
      validationSchema={UserSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        saveUser(values); 
      }}
    >
      {(props) => (  
        <>
          <View style={styles.inputView} >
            <TextInput
              inputStyle={styles.input}
              labelStyle={styles.label}
              placeholder="user@domain.com"
              label="Email"
              value={props.values.email}
              onChangeText={props.handleChange('email')}
              errorMessage={props.touched.email && props.errors.email}
              leftIcon={
                <Icon
                  name='ios-mail'
                  type='ionicon'
                  size={Size.iconInput}
                  color={Colors.secondaryText}
                />
              }
              leftIconContainerStyle={styles.iconContainerStyle}
            />
            <TextInput
              inputStyle={styles.input}
              labelStyle={styles.label}
              placeholder="*******"
              label="Password"
              value={props.values.password}
              onChangeText={props.handleChange('password')}
              secureTextEntry
              errorMessage={props.touched.password && props.errors.password}
              leftIcon={
                <Icon
                  name='lock-closed'
                  type='ionicon'
                  size={Size.iconInput}
                  color={Colors.secondaryText}
                />
              }
              leftIconContainerStyle={styles.iconContainerStyle}
            />
          </View> 
          <View style={styles.buttonContainer}>
            {buttonCreateOrLogin(props)}
          </View>
        </>        
      )}
    </Formik>  
  );
}

const styles = {
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  inputView:{
    marginBottom: 20,
  },
  loginBtn:{
    width: "48%",  
    backgroundColor: Colors.primaryRed,
    borderRadius: 25,
    marginTop: 40,
    marginBottom: 10,
    flex: 0,
    borderColor: Colors.primaryRed,
    marginLeft: 0,
    marginRight: 0
  },
  loginText:{
    color: Colors.primaryTextInverse
  },
  input: {
    fontSize: Size.descriptionCard,
    fontWeight: FontWeight.descriptionCard,
    color: Colors.secondaryText
  },
  label: {
    fontSize: Size.titleCard,
    fontWeight: FontWeight.titleCard,
    color: Colors.primaryText
  },
  iconContainerStyle: {
    paddingRight: Padding.headerLeft
  }
};

export default LoginEmailForm;
