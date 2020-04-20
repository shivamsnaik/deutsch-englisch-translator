import React, {FunctionComponent, useState, useEffect} from 'react';
import {TextInput, Alert, FlatList, ScrollView} from 'react-native';
import TextView from './TextView';
import Container from './Container';
import BasicButton from './BasicButton';
import {WHITE_COLOR, BLACK_COLOR, GREY_COLOR, GREEN_COLOR, DEFAULT_FONT_FAMILY, LIGHT_GREY_COLOR} from '../styles/constants';
import AutoLink from 'react-native-autolink';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {}

const Body: FunctionComponent<Props> = () => {
  const [englishText, setEnglishText] = useState('');
  const [deutschText, setDeutschText] = useState('');
  const [searchLog, setSearchLog] = useState({en: ['English'], de: ['Deutsch']});

  const updateSearchLogData = async (englishValue: string, deutschValue: string) => {
    try {
      const updatedLog = {en: [...searchLog.en, englishValue], de: [...searchLog.de, deutschValue]};
      await AsyncStorage.setItem('log', JSON.stringify(updatedLog));
      setSearchLog(updatedLog);
    } catch (e) {
      // saving error
    }
  };

  const getSearchLogData = async () => {
    try {
      const value = await AsyncStorage.getItem('log');
      return value;
    } catch (e) {
      // error reading value
    }
  };

  const clearSearchLogData = async () => {
    try {
      const updatedLog = {en: ['English'], de: ['Deutsch']};
      await AsyncStorage.setItem('log', JSON.stringify(updatedLog));
      setSearchLog(updatedLog);
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    const data = getSearchLogData();
    data.then(logData => {
      if (logData !== null && logData !== undefined)
        setSearchLog(JSON.parse(logData));
    });
  }, []);
  function translateText(text: string, source: string, target: string) {
    fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${text}`,
      {method: 'GET'})
      .then((response) => {
        response.json().then(async (jsonResponse) => {
          if (source === 'en') {
            await setDeutschText(jsonResponse[0][0][0]);
            updateSearchLogData(text, jsonResponse[0][0][0]);
          } else {
            await setEnglishText(jsonResponse[0][0][0]);
            updateSearchLogData(jsonResponse[0][0][0], text);
          }
        });
      })
      .catch((reason) => {
        return reason;
      });
  }

  return (
    <Container styleProperty={{flex: 1, alignItems: 'center', alignSelf: 'stretch'}}>
      <TextView
        text='Welcome to Deutsch Englisch Translator'
        styleProperty={{
          fontSize: 18,
          fontFamily: DEFAULT_FONT_FAMILY,
          alignSelf: 'stretch',
          color: WHITE_COLOR,
          backgroundColor: BLACK_COLOR,
          margin: 0,
          marginBottom: 2,
          flex: 1,
          textAlign: 'center',
        }}
      />
      <Container styleProperty={{flex: 2, alignSelf: 'stretch'}}>
        <Container styleProperty={{flex: 1, alignSelf: 'stretch', backgroundColor: BLACK_COLOR, padding: 10, alignItems: 'center'}}>
          <TextView
            text='English'
            styleProperty={{
              marginTop: 70,
              textAlign: 'center',
              fontSize: 18,
              fontFamily: DEFAULT_FONT_FAMILY,
              color: GREEN_COLOR
            }}
          />
          <TextInput
            value={englishText}
            style={{
              textAlign: 'center',
              fontFamily: DEFAULT_FONT_FAMILY,
              borderColor: WHITE_COLOR,
              borderWidth: 0.1,
              borderRadius: 2,
              width: 345,
              color: WHITE_COLOR,
              backgroundColor: GREY_COLOR

            }}
            multiline={false}
            returnKeyType='route'
            placeholder='Enter English Text to be translated'
            onChangeText={(text) => { setEnglishText(text); }}
            placeholderTextColor={LIGHT_GREY_COLOR}
          />

          <TextView
            text='Deutsch'
            styleProperty={{
              marginTop: 70,
              textAlign: 'center',
              fontSize: 18,
              fontFamily: DEFAULT_FONT_FAMILY,
              color: GREEN_COLOR
            }}
          />
          <TextInput
            value={deutschText}
            style={{
              textAlign: 'center',
              fontFamily: DEFAULT_FONT_FAMILY,
              borderColor: WHITE_COLOR,
              borderWidth: 0.1,
              borderRadius: 2,
              width: 345,
              color: WHITE_COLOR,
              backgroundColor: GREY_COLOR
            }}
            multiline={false}
            placeholder='Bitte geben Sie den Text'
            onChangeText={(text) => { setDeutschText(text); }}
            placeholderTextColor={LIGHT_GREY_COLOR}
            selectionColor={GREEN_COLOR}
          />

          <Container styleProperty={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', marginTop: 20}}>
            <BasicButton
              color={GREY_COLOR}
              buttonTitle='Convert'
              buttonStyle={{backgroundColor: GREY_COLOR}}
              textStyle={{color: GREEN_COLOR, fontFamily: DEFAULT_FONT_FAMILY}}
              buttonAction={() => {
                if (englishText === '')
                  Alert.alert('Conversion Error', 'Enter text in English to convert');
                else
                  translateText(englishText, 'en', 'de');
              }}
            />

            <BasicButton
              color={GREY_COLOR}
              buttonTitle='Konvertieren'
              buttonStyle={{backgroundColor: GREY_COLOR}}
              textStyle={{color: GREEN_COLOR, fontFamily: DEFAULT_FONT_FAMILY}}
              buttonAction={() => {
                if (deutschText === '')
                  Alert.alert('Conversion Error', 'Tut mir leid. Bitte geben Sie den Text ein');
                else
                  translateText(deutschText, 'de', 'en');
              }}
            />
          </Container>
        </Container>
      </Container>

      <Container styleProperty={{flex: 5, marginTop: 2, alignItems: 'center', backgroundColor: BLACK_COLOR, alignSelf: 'stretch'}}>
        <TextView text='Logs' styleProperty={{color: GREEN_COLOR, fontFamily: DEFAULT_FONT_FAMILY}}/>

        <BasicButton
          buttonTitle='Clear Log'
          textStyle={{fontSize: 15, fontFamily: DEFAULT_FONT_FAMILY, padding: 2}}
          buttonStyle={{backgroundColor: LIGHT_GREY_COLOR, borderRadius: 2}}
          buttonAction={() => {
            Alert.alert(
              'Clear Log',
              'The logs will be deleted permanently, continue?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'Ok',
                  onPress: () => clearSearchLogData()
                }
              ]
            );
          }}
        />

        <ScrollView contentContainerStyle={{overflow: 'scroll', alignSelf: 'baseline', flexGrow: 1, flexDirection: 'row'}}>
            <FlatList
              data={searchLog.en}
              renderItem={({item}) => <TextView styleProperty={{textAlign: 'center', color: GREEN_COLOR}} text={item}/>}
            />

            <FlatList
              data={searchLog.de}
              renderItem={({item}) => <TextView styleProperty={{textAlign: 'center', color: GREEN_COLOR}} text={item}/>}
            />
        </ScrollView>
      </Container>

      <Container styleProperty={{flex: 1, alignSelf: 'stretch', marginTop: 2, backgroundColor: BLACK_COLOR, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

        <TextView text='Developed by SHIVAM NAIK' styleProperty={{color: WHITE_COLOR, fontFamily: DEFAULT_FONT_FAMILY}}/>
        <AutoLink style={{color: WHITE_COLOR, fontFamily: DEFAULT_FONT_FAMILY}} text='Link: https://github.com/shivamsnaik' linkStyle={{color: GREEN_COLOR, textDecorationLine: 'underline'}}/>

      </Container>
    </Container>
  );
};

export default Body;
