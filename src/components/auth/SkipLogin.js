import React from 'react';
import { Button } from '../common';
import { Colors } from '../../constants/Styles';

const SkipLogin = (props) => {

  const skipSignInBtn = ()=> {    
    props.navigateTo();
  }
  
  return (
    <Button style={styles.skipBtn} textStyle={styles.skipBtnText} onPress={()=>skipSignInBtn()}>Continuar sin iniciar sesion</Button>  
  );
  
}

const styles = {
  skipBtn:{
    width: "80%",
    borderRadius: 25,
    marginTop: 20,
    flex: 0,
    borderColor: Colors.secondaryTextInverse
  },
  
  skipBtnText:{
    color: Colors.secondaryTextInverse
  },
};

export default SkipLogin;