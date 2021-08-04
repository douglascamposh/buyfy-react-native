import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Content } from './Content';

const FloatButton = ({text, onPress, style}) => {
  return (
    <View style={styles.bottomView}>
      <TouchableOpacity style={[styles.buttonStyle, style]} onPress={onPress}>
        <Content style={styles.textStyle}>{text}</Content>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  bottomView: {
    width: '100%', 
    height: 60,
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
