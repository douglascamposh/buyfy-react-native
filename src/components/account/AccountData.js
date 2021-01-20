import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { CardSection, Button } from '../common';
import { Size, FontWeight, Colors } from '../../constants/Styles';

class AccountData extends Component {

	logOutButton(){
		firebase.auth().signOut();
		firebase.auth().onAuthStateChanged( user => {
      if(!user) {
				this.props.navigation.navigate('storeList');
      }
		});
	}
	VerifyUser(){
		let user = firebase.auth().currentUser;
		let email;
		user != null ? email = user.email : email = 'Debes inicar sesión';
		return email;
	}

	render() {
		return (			
			<View>
				<CardSection style = {styles.carsSecction}>
					<View style = {styles.titleDataStyle}>
						<Text style = {styles.titleDataTextStyle}>Mis datos</Text>
					</View>
					<View style = {styles.emailContent}>
						<Text style = {styles.emailStyle}>{this.VerifyUser()}</Text>
					</View>
				</CardSection>
				<View>
					<Button style={styles.logOutBtn} textStyle={styles.logOutText} onPress={()=>this.logOutButton()}>Log out</Button>
				</View>
			</View>
		);
	}
}

const styles = {
	carsSecction: {
		flexDirection: 'column'
	},
	titleDataStyle:{
		alignItems: 'center',
	},
	titleDataTextStyle: {
		fontSize: Size.header,
		fontWeight: FontWeight.header
	},
	emailContent:{
		alignItems: 'center',
		marginTop: 30
	},
	logOutBtn:{
		marginLeft:45,
		marginRight:45,
    borderRadius: 25,
    marginTop: 40,
    marginBottom: 10,
    flex: 0,
    borderColor: Colors.primaryRed,
		backgroundColor: Colors.primaryRed
	},
	logOutText:{
		color: Colors.primaryTextInverse,
	},
	emailStyle:{
		fontSize: 20,
		color: Colors.secondaryTextInverse,
	}
}

export default AccountData;             