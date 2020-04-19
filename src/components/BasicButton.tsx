import React, {FunctionComponent} from 'react';
import {Button, View, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity, StyleSheet} from 'react-native';

interface Props {
  buttonTitle: string;
  buttonAction: any;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
}

const BasicButton: FunctionComponent<Props> = ({...props}) => {
  return (

    <TouchableOpacity onPress={props.buttonAction} style={[styles.button, props.buttonStyle]}>
            <Text style={[styles.text, props.textStyle]}>{props.buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20
  },

  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});

export default BasicButton;
