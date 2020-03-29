import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Title } from './Title';
import { Colors, Padding } from '../../constants/Styles';

const Button = (props) => {
    const styles = {
        textStyle: {
            alignSelf: 'center',
            color: Colors.primaryBlue,
            paddingTop: Padding.buttonTop,
            paddingBottom: Padding.buttonBottom,
            paddingLeft: 0,
            marginTop: 0
        },
        buttonStyle: {
            flex: 1, // flex ocupa toda la pantalla, y hay algunos problemas con otros componentes q no usan card y card section
            // alignSelf: 'stretch',
            backgroundColor: '#fff',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: Colors.primaryBlue,
            marginLeft: 5,
            marginRight: 5
        },
        containerStyle: {
          flexDirection: 'row',
          alignItems: 'center'
        }
    };
    
    const {buttonStyle, textStyle} = styles;
    return (
        <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
          <View style={styles.containerStyle}>
            {props.icon}
            <Title style={[textStyle, props.textStyle]}>{props.children}</Title>
          </View>
        </TouchableOpacity>
    );
};

export {Button};