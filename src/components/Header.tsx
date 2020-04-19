import React, {FunctionComponent} from 'react';
import {View, StyleSheet, Text, StyleProp, TextStyle} from 'react-native';
import {PRIMARY_COLOR, DEFAULT_FONT_FAMILY, GREEN_COLOR} from '../styles/constants';

interface Props {
  headerText: string;
  style: StyleProp<TextStyle>;
}

const Header: FunctionComponent<Props> = ({headerText, style, ...props}) => {
  return (
    <View style={[styles.headerContainer, style]}>
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: PRIMARY_COLOR
  },

  headerText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: GREEN_COLOR,
    fontSize: 18,
    fontFamily: DEFAULT_FONT_FAMILY
  },
});

export default Header;
