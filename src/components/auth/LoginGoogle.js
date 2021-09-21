import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Button } from '../common';
import { Icon } from 'react-native-elements'
import { Size, Colors, Padding } from '../../constants/Styles';
import * as Google from 'expo-google-app-auth';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '../../../environment.json';

class LoginGoogle extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (const i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            String(providerData[i].uid) === String(googleUser.user.id)) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
        .then(function(result) {
          console.log('user signed in', result);
          if(result.additionalUserInfo.isNewUser) {
            firebase.firestore().collection('users').doc(result.user.uid)
            .set({
              id: result.additionalUserInfo.profile.sub,
              email: result.user.email,
              profilePicture: result.additionalUserInfo.profile.picture,
              firstName: result.additionalUserInfo.profile.given_name,
              lastName: result.additionalUserInfo.profile.family_name,
              locale: result.additionalUserInfo.profile.locale,
              createdAt: Date.now()
            })
            .then(function(response){
              console.info('User Created');
            }).catch(error => {
              console.warn('It was not created the User', error);
            });
          } else {
            firebase.firestore().collection('users').doc(result.user.uid)
            .update({
              lastLogged: Date.now()
            })
            .then(function(response){
              console.info('User Updated', response);
            }).catch(error => {
              console.warn('It was not updated the User', error);
            });
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          console.log('error firebase credentials', error)
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async() => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log("LoginGoogle.js | ", result.user.givenName);
        this.onSignIn(result);
        this.props.navigateTo(); //ToDo: check if we need to pass the route, to be more flexible
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginGoogle.js | Error with login', e);
      return { error: true };
    }
  }

  render() {
    return (
      <Button
        style={styles.googleBtn}
        onPress={() => this.signInWithGoogleAsync()}
        icon={
          <Icon
            name='logo-google'
            type='ionicon'
            size={Size.iconInput}
            color={Colors.primaryBlue}
            iconStyle={styles.iconStyle}
          />
        }  
      >
        Continuar con Google
      </Button>
    );
  }
}

const styles = {
  googleBtn: {
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007aff',
    flex: 0,
  },
  iconStyle: {
    paddingRight: Padding.headerLeft
  }
}

export default LoginGoogle;
