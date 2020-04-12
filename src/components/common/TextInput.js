import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { FontWeight, Size, Colors } from '../../constants/Styles';

const TextInput = (props) => {
  return (
    <View style={[props.containerStyle, styles.containerStyle]}>
      <Input
        {...props}
        inputStyle={[props.inputStyle, styles.inputStyle]}
        labelStyle={[props.labelStyle, styles.labelStyle]}
        leftIconContainerStyle={[props.leftIconContainerStyle, styles.leftIconContainerStyle]}
        rightIconContainerStyle={[props.rightIconContainerStyle, styles.rightIconContainerStyle]}
        errorStyle={[props.errorStyle, styles.errorStyle]}
        disabledInputStyle={[props.disabledInputStyle, styles.disabledInputStyle]}
        label={props.label}
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: "center"
  },
  inputStyle: {
    fontSize: Size.descriptionCard,
    fontWeight: FontWeight.descriptionCard,
    color: Colors.secondaryText
  },
  labelStyle: {
    fontSize: Size.titleCard,
    fontWeight: FontWeight.titleCard,
    color: Colors.primaryText
  }
};
export { TextInput };
