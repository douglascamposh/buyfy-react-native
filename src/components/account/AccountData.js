import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { Icon } from 'react-native-elements'
import { userDataUpdate, userLogOut } from '../../actions';
import firebase from 'firebase';
import UserDataForm from './UserDataForm';
import { CardSection, Button, Title } from '../common';
import { Size, FontWeight, Colors } from '../../constants/Styles';

const AccountData = (props) => {
	const toast = useToast();
	const { firstName, lastName, email, isLoged, error} = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const showLogInLogOutButton = () => {
		return isLoged ? (
			<View>
				<UserDataForm userData={{firstName, lastName}} updateUser={updateUser} />
				<Button style={styles.logOutBtn} textStyle={styles.logOutTextBtn} onPress={() => logOutButton()}>Cerrar sesión</Button>
			</View>
		) : (<Button style={styles.logIntBtn} textStyle={styles.logInTextBtn} onPress={() => onButtonPress()}>Iniciar sesión</Button>);
	}

	const logOutButton = () => {
		dispatch(userLogOut())
	}

	const onButtonPress = () => {
		props.navigation.navigate('auth');
	}

	const updateUser = ({ firstName, lastName }) => { 
		dispatch(userDataUpdate({ firstName, lastName }));
	}	

	const showToast = () =>{
	if(!error && error !== null){
		toast.show("Usuario actualizado", {
			icon: <Icon name="checkmark-sharp" type='ionicon' color='#fff'/>,
			duration: 1500,			
			style: { 
				padding: 0, 
				backgroundColor: Colors.primaryBlue
			},
			textStyle: { fontSize: 15 } 
	});
	} else if(error){
		toast.show("Error al actualizar datos", {
		icon: <Icon name="close-sharp" type='ionicon' color='#fff'/>,	
		duration: 1500,
		style: { 
			padding: 0,
			backgroundColor: Colors.primaryRed 
		},
		textStyle: { fontSize: 15 }, });
	}
	}

	return (
		<View>
			<CardSection style={styles.carsSecction}>
				<View>
					<Title style={styles.titleStyleHeader}>Mis datos</Title>
				</View>
				<View>
					<Title style={styles.emailStyle}>{email || 'Debes inicar sesion'} </Title>
				</View>		
			</CardSection>
			<View>
				{showLogInLogOutButton()}
				{showToast()}
			</View>
		</View>
	);
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

export default AccountData;