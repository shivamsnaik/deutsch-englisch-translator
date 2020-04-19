import React, {FunctionComponent} from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

interface Props {
  styleProperty?: StyleProp<ViewStyle>;
}

const Container: FunctionComponent<Props> = ({styleProperty, children}) => {
  return (
    <View style={styleProperty}>
      {children}
    </View>
  );
};

export default Container;
