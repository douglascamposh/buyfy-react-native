import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { CardSection, Button, Title } from '../common';
import { Size, FontWeight, Colors } from '../../constants/Styles';

class AccountData extends Component {
	state = {
		email: ''
	}

	componentDidMount(){
		this.setState({
			email: this.verifyUser()
		});
	}

	logOutButton = () => {
		firebase.auth().signOut();
		firebase.auth().onAuthStateChanged( user => {
      if(!user) {
				this.setState({
					email: this.verifyUser()
				});
				this.props.navigation.navigate('storeList');
      }
		});
	}

	verifyUser = () => {
		let user = firebase.auth().currentUser;
		let email;
		user != null ? email = user.email : email = 'Debes inicar sesión';
		return email;
	}

	render() {
		const { email } = this.state;
		return (				
			<View>
				<CardSection style={styles.carsSecction}>	
					<View>
						<Title style={styles.titleStyleHeader}>Mis datos</Title>					
					</View>				
					<View>
							<Title style={styles.emailStyle}>{email}</Title>
					</View>
				</CardSection>
				<View>
					<Button style={styles.logOutBtn} textStyle={styles.logOutTextBtn} onPress={()=>this.logOutButton()}>Log out</Button>
				</View>
			</View>
		);
	}
}

const styles = {
	carsSecction: {
		flexDirection: 'column'
	},

	titleStyleHeader: {
		textAlign: 'center',
		fontSize: Size.header,
    fontWeight: FontWeight.header
	},

	emailStyle: {
		textAlign: 'center',
	},

	logOutBtn: {
    backgroundColor: Colors.primaryRed,
    borderRadius: 25,
    marginTop: 20,
    flex: 0,
    borderColor: Colors.primaryRed
	},

	logOutTextBtn:{
		color: Colors.primaryTextInverse
	},
};

export default AccountData;             