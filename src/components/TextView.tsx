import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';

interface Props {
  text: string;
  styleProperty?: StyleProp<TextStyle>;
}

const TextView: FunctionComponent<Props> = ({text, styleProperty}) => {
  return (
    <Text style={[styles.textView, styleProperty]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  textView: {
    margin: 5,
    textAlignVertical: 'center'
  }
});

export default TextView;
