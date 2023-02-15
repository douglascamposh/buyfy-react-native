import React from 'react';
import {TextInput, View, Text} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { FontWeight, Size, Colors } from '../../constants/Styles';
import { Title } from './Title';

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
      <Title>{label}</Title>
      {input}
    </View>
  );
};

const styles = {
  inputStyle: {
    fontSize: Size.descriptionCard,
    paddingLeft: 15,
    marginTop: 10,
    flex: 2,
    fontWeight: FontWeight.descriptionCard,
    color: Colors.secondaryText
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  }
};
export {Input};
