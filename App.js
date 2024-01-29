import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, } from 'react-native';

export default function App() {
  const morseCodeList = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..',
  ];

  const [text, setText] = useState('');
  const [morseCodeTranslated, setMorseCodeTranslated] = useState([]);

  const translateMorseCode = (word) => {
    const morseCodeStringTemp = [];
    const arrayLetters = word.toUpperCase().split('');

    for (let i = 0; i < arrayLetters.length; i++) {
      const char = arrayLetters[i];
      // I get the ASCII code of the letter, and I substract 65 to get the index I will use to access the 'morseCodeList'
      const index = char.charCodeAt(0) - 65;

      // I verify if the index is between 0 to 26, that will mean that letter is from the alphabet.
      if (index >= 0 && index <= 26) {
        morseCodeStringTemp.push(morseCodeList[index]);
      }
      // If character is a space, add SPACE to list.
      else if (/^[\s]+$/.test(char)) {
        morseCodeStringTemp.push('SPACE');
      }
      // If it is some other character add NA.
      else {
        morseCodeStringTemp.push('NA');
      }
    }
    return morseCodeStringTemp.join(' ');
  };

  const changeText = (word) => {
    setText(word);
    const newListTemp = translateMorseCode(word).split(' ');
    setMorseCodeTranslated(newListTemp);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Morse Code</Text>
        </View>
        <TextInput
          maxLength={50}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Insert Text"
          placeholderTextColor="gray"
          autoCapitalize="none"
          value={text}
          onChangeText={changeText}
        />

        <View style={styles.letterContainer}>
          {morseCodeTranslated.map((code, index) => (
            <View style={styles.letterBox} key={index}>
              <Text style={styles.letterText}>{code}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.containerInfo}>
        <Text style={styles.textInfo}>
          This translator just works with AMERICAN ALPHABET
        </Text>

        <View style={styles.containerRestrictions}>
          <View style={styles.restriction}>
            <Text style={styles.textRestriction}>NO</Text>
            <Text style={styles.textRestriction}>Symbols</Text>
          </View>

          <View style={styles.restriction}>
            <Text style={styles.textRestriction}>NO</Text>
            <Text style={styles.textRestriction}>Digits</Text>
          </View>

          <View style={styles.restriction}>
            <Text style={styles.textRestriction}>NO</Text>
            <Text style={styles.textRestriction}>Spaces</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    alignItems: 'center',
  },

  header: {
    width: Dimensions.get('window').width,
    height: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#2C2C2C',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  textHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },

  input: {
    margin: 15,
    marginTop: 25,
    width: Dimensions.get('window').width * 0.9,
    height: 30,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  letterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  letterBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontSize: 14,
  },

  containerInfo: {
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },

  textInfo: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },

  containerRestrictions: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  restriction: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#3A77CC',
    width: Dimensions.get('window').width * 0.2,
  },

  textRestriction: {
    color: 'white',
    textWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
});

