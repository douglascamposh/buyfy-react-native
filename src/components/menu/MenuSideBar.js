import React, {Component} from 'react';
import { View, Text, Image} from 'react-native';
import { connect } from 'react-redux';
import { Size, FontWeight} from '../../constants/Styles';
import { fetchUserData } from '../../actions';

class MenuSideBar extends Component{
  componentDidMount() {
		this.props.fetchUserData();		
	}

  verifyPhoto = () => {
    const { photoURL, email } = this.props.user;
    const defaultPhoto = require('../../../assets/defaultPhoto.jpg');
    const photoUrl = { uri: photoURL };
     return photoURL ? <Image source={photoUrl} style={styles.photoStyle} /> : 
     email ? <Image source={defaultPhoto} style={styles.photoStyle} /> : null
  }

  render(){
    const {displayName, email} = this.props.user
    return(
      <View style={styles.centerContent}>
        {this.verifyPhoto()}
        <Text 
          style={ email ? styles.nameOrEmailStyle : null } 
          numberOfLines={2} 
          ellipsizeMode='tail'>
          { displayName || email }
        </Text>
      </View> 
    )
  }
}

const styles = {
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameOrEmailStyle: {
    textAlign: 'center',
    fontSize: Size.header, 
    fontWeight: FontWeight.header, 
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  photoStyle: {
    height:90, 
    width:90, 
    borderRadius: 60, 
    marginTop: 20, 
    marginBottom: 20
  }
}

const mapStateToProps = state => {
	const { user } = state;
	return { user };
};

export default connect(mapStateToProps, { fetchUserData })(MenuSideBar);