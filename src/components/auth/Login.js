import React, { Component } from 'react';
import { Card, CardSection, Button } from '../common';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { iosClientId, androidClientId } from '../../../TokenConfig';

class Login extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
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
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
        .then(function(result) {
          console.log('user signed in', result);
          if(result.additionalUserInfo.isNewUser) {
            firebase.database().ref(`/users/${result.user.uid}`)
            .set({
              id: result.additionalUserInfo.profile.sub,
              email: result.user.email,
              profilePicture: result.additionalUserInfo.profile.picture,
              firstName: result.additionalUserInfo.profile.given_name,
              lastName: result.additionalUserInfo.profile.family_name,
              locale: result.additionalUserInfo.profile.locale,
              createdAt: Date.now()
            })
            .then(function(response) {
              console.info('User Created', response);
            })
            .catch(error => {
              console.warn('It was not created the User', error);
            });
          } else {
            firebase.database().ref(`/users/${result.user.uid}`)
            .update({
              lastLogged: Date.now()
            })
            .then(function(response) {
              console.info('User Updated', response);
            })
            .catch(error => {
              console.warn('It was not updated the User', error);
            });
          }
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
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
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log("Login.js | ", result.user.givenName);
        this.onSignIn(result);
        this.props.navigateTo(); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('Login.js | Error with login', e);
      return { error: true };
    }
  }

  render() {
    return (
      <Card>
        <CardSection></CardSection>
        <CardSection>
          <Button onPress={() => this.signInWithGoogleAsync()}>
            Iniciar sesion con Google
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default Login;
