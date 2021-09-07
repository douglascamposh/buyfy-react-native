import React, { useState  } from 'react';
import { TextInput, Button, GoogleMap, CardSection, Title, Content, Spinner } from '../common';
import { View } from 'react-native';
import { FontWeight, Size, Colors, Padding } from '../../constants/Styles';
import LoginGoogle from '../auth/LoginGoogle';
import { Input, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  string: {
    min: 'Ingrese al menos ${min} caracteres'
  }
});

const UserSchema = yup.object({
  firstName: yup.string()
    .label('Nombre')
    .required('Debes ingresar tu ${label}.')
    .min(3)
    .trim(),
  lastName: yup.string()
  .label('Apellidos')
  .required('Debes ingresar tus ${label}.')
  .min(3)
  .trim(),
  email: yup.string().email('Ingresa un email valido')
    .label('Email')
    .required('Debes ingresar el ${label}.')
    .min(5)
    .trim(),
  password: yup.string().required('Password es requerido'),    
  confirmPassword: yup.string()
    .label('Confirmirmar password')
    .required('${label} es requerido')
    .oneOf([yup.ref('password')], 'El password no coincide'),
});

const SignUpEmailForm = (props) => {
  const {user, signUp} = props;
  return (  
    <Formik
      initialValues={{ ...user }}
      validationSchema={UserSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        signUp(values);  
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
            
            <TextInput
              inputStyle={styles.input}
              labelStyle={styles.label}
              placeholder="*******"
              label="Confirme password"
              value={props.values.confirmPassword}
              onChangeText={props.handleChange('confirmPassword')}
              secureTextEntry
              errorMessage={props.touched.confirmPassword && props.errors.confirmPassword}
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
            <TextInput
              inputStyle={styles.input}
              labelStyle={styles.label}
              placeholder="Ingrese su nombre"
              label="Nombres"
              value={props.values.firstName}
              onChangeText={props.handleChange('firstName')}
              errorMessage={props.touched.firstName && props.errors.firstName}
              leftIcon={
                <Icon
                  name='person'
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
              placeholder="Ingrese su apellido"
              label="Apellidos"
              value={props.values.lastName}
              onChangeText={props.handleChange('lastName')}
              errorMessage={props.touched.lastName && props.errors.lastName}
              leftIcon={
                <Icon
                  name='person'
                  type='ionicon'
                  size={Size.iconInput}
                  color={Colors.secondaryText}
                />
              }
              leftIconContainerStyle={styles.iconContainerStyle}
            />
          </View>         
          {user.pending ? <Spinner size={'small'}/> : <Button style={styles.loginBtn} textStyle={styles.loginText} onPress={props.handleSubmit}>Crear Cuenta</Button>}   
          <Title style={styles.title}>- O -</Title>
          <LoginGoogle navigateTo={props.navigateTo}/>        
        </>        
      )}
    </Formik>  
  );
}

const styles = {
  inputView:{
    marginBottom: 30,
    width: '90%'
  },
  loginBtn:{
    flex: 0,
    width: "80%",
    backgroundColor: Colors.primaryRed,
    borderRadius: 25,
    borderColor: Colors.primaryRed,
    marginBottom: 10,
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
  },
  title: {
    textAlign: 'center'
  }
};

export default SignUpEmailForm;
