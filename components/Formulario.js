import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  guardarMoneda,
  guardarCriptomoneda,
  guardarConsultarAPI
}) => {

  const [ criptomonedas, guardarCriptomonedas ] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const resultado = await axios.get(url);
      console.log(resultado.data.Data);
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, [] );

  // Almacena las selecciones del Usuario
  const obtenerMoneda = (moneda) => {
    guardarMoneda(moneda);
  };

  const obtenerCriptomoneda = (moneda) => {
    guardarCriptomoneda(moneda);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta()
      return;
    }

    // Si pasa la validación -> Cambiar el state de consultar API
    guardarConsultarAPI(true);
  };

  const mostrarAlerta = () => {
    Alert.alert(
      'Error...',
      'Ambos campos son obligatorios',
      [
        { text: 'OK' }
      ]
    )
  };

  return (
    <View>
      {/* Moneda */}
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={ moneda }
        onValueChange={ moneda => obtenerMoneda(moneda) }
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label='- Seleccione -' value='' />
        <Picker.Item label='Dolar de Estados Unidos' value='USD' />
        <Picker.Item label='Euro' value='EUR' />
        <Picker.Item label='Libra Esterlina' value='GBP' />
        <Picker.Item label='Pero de Argentina' value='ARG' />
      </Picker>

      {/* Criptomoneda */}
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={ criptomoneda }
        onValueChange={ criptomoneda => obtenerCriptomoneda(criptomoneda) }
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label='- Seleccione -' value='' />
        { criptomonedas.map( cripto => (
          <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
        ))}
      </Picker>

      {/* Cotizar */}
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={ () => cotizarPrecio() }
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>

      </TouchableHighlight>

    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20
  },
  textoCotizar: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Black.tff',
    textTransform: 'uppercase',
    textAlign: 'center'
  }

});


 
export default Formulario;