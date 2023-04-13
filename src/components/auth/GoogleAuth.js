import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import jwtDecode from 'jwt-decode';
import { Button } from '../common';
import { Icon } from 'react-native-elements'
import { Size, Colors, Padding } from '../../constants/Styles';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID } from '../../../environment.json';

WebBrowser.maybeCompleteAuthSession();

const GoogleAuth = (props) => {

  const [request, responseIdToken, promptAsyncIdToken] = Google.useIdTokenAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if(responseIdToken?.type === "success") {
      console.log("LoginGoogle.js | setIdToken: ", responseIdToken);
      onLogin(responseIdToken.params.id_token);
    }
  },[responseIdToken]);

  const onLogin = (token) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      const googleUser = jwtDecode(token);
      if (isUserEqual(googleUser, firebaseUser)) {
        // Check if we are already signed-in Firebase with the correct user.
        console.log('User already signed-in Firebase.');
        props.navigateTo();
      } else {
        console.log('Register User');
        onSignIn(token);
      }
    }.bind(this));
  }

  const onSignIn = (idToken) => {
    // Build Firebase credential with the Google ID token.
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    // Sign in with credential from the Google user.
    firebase.auth().signInWithCredential(credential)
    .then(result => {
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
        .then(res =>{
          console.info('User Created');
          props.navigateTo();
        }).catch(error => {
          console.warn('It was not created the User', error);
        });
      } else {
        firebase.firestore().collection('users').doc(result.user.uid)
        .update({
          lastLogged: Date.now()
        })
        .then(() => {
          console.info('User Updated', result.user.uid);
          props.navigateTo();
        }).catch(error => {
          console.warn('It was not updated the User', error);
        });
      }
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log('error firebase credentials', error)
    });
  }

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            String(providerData[i].email) === String(googleUser.email)) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  return (
    <Button
      // disable={!request} verificarf como agregar boto desabilitado o usar boton de la libreria
      style={styles.googleBtn}
      onPress={() => promptAsyncIdToken()}
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

export default GoogleAuth;
