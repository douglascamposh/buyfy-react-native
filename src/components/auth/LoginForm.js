import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Input, Icon } from 'react-native-elements'
import { Text, View } from 'react-native';
import { Button, Spinner } from './../common';
import { FontWeight, Size, Colors, Padding } from '../../constants/Styles';

class LoginForm extends Component {
  state = {firstName: '', lastName: '', email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginUserExists.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSucces.bind(this))
      .catch(this.onLoginFail.bind(this));
    });
  }

  onLoginFail() {
    this.setState({ error: 'No se pudo Autenticar', loading: false });
  }

  onLoginUserExists() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    this.props.navigateTo(); //ToDo: check if we need to pass the route, to be more flexible  
  }

  onLoginSucces() {
    const user = firebase.auth().currentUser;
    firebase.firestore().collection('users').doc(user.uid)
    .set({
      profilePicture: '',
      firstName:'',
      lastName: '',
      email: this.state.email,
      createdAt: Date.now()
    })
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    this.props.navigateTo(); //ToDo: check if we need to pass the route, to be more flexible  
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small"></Spinner>;
    }
    return (
      <Button style={styles.loginBtn} textStyle={styles.loginText} onPress={this.onButtonPress.bind(this)}>Log in</Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>BuyFy</Text>
        <View style={styles.inputView} >
          <Input
            inputStyle={styles.input}
            labelStyle={styles.label}
            placeholder="user@domain.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.error}
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
        </View>
        <View style={styles.inputView} >
          <Input
            inputStyle={styles.input}
            labelStyle={styles.label}
            placeholder="*******"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
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
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    alignSelf: 'center',
    color: Colors.primaryRed
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight: FontWeight.header,
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView:{
    width: "80%",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginBtn:{
    width: "80%",
    backgroundColor: Colors.primaryRed,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    flex: 0,
    borderColor: Colors.primaryRed
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

export default LoginForm;
