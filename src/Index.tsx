import React, {FunctionComponent} from 'react';
import {StyleSheet, View, ScrollView, StatusBar} from 'react-native';
import Body from './components/Body';
import Header from './components/Header';
import {BLUE_COLOR_20, BLACK_COLOR, GREY_COLOR, DARK_GREEN_COLOR} from './styles/constants';
import Container from './components/Container';

interface Props {}

const Index: FunctionComponent<Props> = () => {

  return (
    <View style={{flex: 1, backgroundColor: BLUE_COLOR_20}}>
      <StatusBar barStyle='light-content' backgroundColor={DARK_GREEN_COLOR} />
      <Header headerText='Deutsch Englisch Translator' style={{backgroundColor: BLACK_COLOR, flex: 1, flexBasis: 0}}/>
      <View style={{flex: 15}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: GREY_COLOR, padding: 2}}>
            <Container styleProperty={{alignItems: 'center', flex: 1, alignSelf: 'stretch'}}>
              <Body></Body>
            </Container>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {alignItems: 'center', flex: 1},
  bodyContainer: {alignSelf: 'stretch', flex: 100}
});

export default Index;
