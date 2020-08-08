import React from 'react';
import { Text, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native';

const Header = () => {
  return (
    <Text style={styles.encabezado}>
      Criptomonedas
    </Text>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    fontFamily: 'Lato-Black.tff',
    backgroundColor: '#5E49E2',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
    paddingBottom: 10,
    marginBottom: 30,
  }
});

export default Header;
