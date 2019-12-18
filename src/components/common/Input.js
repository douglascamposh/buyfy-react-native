import React from 'react';
import {TextInput, View, Text} from 'react-native';
import NumericInput from 'react-native-numeric-input';

const Input = ({label, value, onChangeText, placeholder, secureTextEntry, numeric = false}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  const input = numeric ? (<NumericInput
    value={value}
    onChange={onChangeText}
    minValue={0}
    maxValue={9999}
    separatorWidth={0}
    iconSize={20}
    valueType='real'
    borderColor='white'
    containerStyle={inputStyle}
    rightButtonBackgroundColor='white'
    leftButtonBackgroundColor='white'/>
  ) : ( <TextInput
    placeholder={placeholder}
    autoCorrect={false}
    style={inputStyle}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}/>
  );
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      {input}
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    paddingLeft: 20,
    fontSize: 18,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};
export {Input};
