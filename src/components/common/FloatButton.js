import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const FloatButton = ({text, onPress}) => {
  return (
    <View style={styles.bottomView}>
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  bottomView: {
    width: '100%', 
    height: 50,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    width: '90%', 
    height: 45,
    backgroundColor: 'red',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 0,
    textAlign: 'center'
  }
};

export {FloatButton};
