import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { fetchUserData, userDataUpdate } from '../../actions';
import firebase from 'firebase';
import UserDataForm from './UserDataForm';
import { CardSection, Button, Title } from '../common';
import { Size, FontWeight, Colors } from '../../constants/Styles';

class AccountData extends Component {
	state = {
		email: '',
		isLogued: false
	}

	componentDidMount() {
		const { navigation } = this.props;
		this.focusListener = navigation.addListener('didFocus', () => {
			this.props.fetchUserData();
			this.setState({
				email: this.verifyUser(),
				isLogued: Boolean(firebase.auth().currentUser)
			});
		});
	}

	componentWillUnmount() {
		this.focusListener.remove();
	}

	logInLogOutButton = () => {
		const { isLogued } = this.state;
		return isLogued ? (
			<View>
				<UserDataForm userData={this.props.user} updateUser={this.updateUser} />
				<Button style={styles.logOutBtn} textStyle={styles.logOutTextBtn} onPress={() => this.logOutButton()}>Cerrar sesión</Button>
			</View>
		) : (<Button style={styles.logIntBtn} textStyle={styles.logInTextBtn} onPress={this.onButtonPress.bind(this)}>Iniciar sesión</Button>);
	}

	logOutButton = () => {
		firebase.auth().signOut();
		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				this.setState({
					email: this.verifyUser(),
					isLogued: Boolean(firebase.auth().currentUser)
				});
				this.props.navigation.navigate('storeList');
			}
		});
	}

	onButtonPress() {
		this.setState({
			email: '',
			isLogued: false
		});
		this.props.navigation.navigate('auth');
	}

	verifyUser = () => {
		const user = firebase.auth().currentUser;
		return !firebase.auth().currentUser ? 'Debes iniciar sesion' : user.email;
	}

	updateUser = ({ firstName, lastName }) => { 
		this.props.userDataUpdate({ firstName, lastName }); 
		this.props.navigation.navigate('storeList');
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
					{this.logInLogOutButton()}
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

	logOutTextBtn: {
		color: Colors.primaryTextInverse
	},

	logIntBtn: {
		backgroundColor: Colors.primaryBlue,
		borderRadius: 25,
		marginTop: 20,
		flex: 0,
		borderColor: Colors.primaryBlue
	},
	
	logInTextBtn: {
		color: Colors.primaryTextInverse
	}
};

const mapStateToProps = state => {
	let { user } = state;
	if(!user) { user = { firstName: '', lastName:'' }} return {user};
};
export default connect(mapStateToProps, { fetchUserData, userDataUpdate })(AccountData);