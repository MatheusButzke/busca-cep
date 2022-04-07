import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import api from './services/api';

export default function App(){

  const [cepDigitado, setCepDigitado] = useState('');
  const [cep, setCep] = useState('');
  const inputReference = useRef(null);
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  function Limpar(){
    inputReference.current.clear();
    inputReference.current.focus();
    setCepDigitado('')
  };

  async function pegaCep(){
    const response = await api.get(`${cep}/json`)

    setCepDigitado(cep)
    setLogradouro(response.data.logradouro)
    setBairro(response.data.bairro)
    setCidade(response.data.localidade)
    setEstado(response.data.uf)
    Keyboard.dismiss()
    
  }

  return(
    <View style={styles.tela}>
      <Text style={styles.titulo}>Digite o CEP que deseja buscar</Text>
      <TextInput style={styles.input} placeholder='Exemplo: 89255140' onChangeText={(value) => setCep(value)} ref={inputReference}/>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btnBusca} onPress={()=>pegaCep()}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF'}}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLimpa} onPress={()=> Limpar()}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF'}}>Limpar</Text>
        </TouchableOpacity>
      </View>

      { cepDigitado !== '' &&(
        <View style={styles.resultados}>
          <Text style={styles.txtResultado}>CEP: {cepDigitado}</Text>
          <Text style={styles.txtResultado}>Logradouro: {logradouro}</Text>
          <Text style={styles.txtResultado}>Bairro: {bairro}</Text>
          <Text style={styles.txtResultado}>Cidade: {cidade}</Text>
          <Text style={styles.txtResultado}>Estado: {estado}</Text>
        </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tela:{
    flex:1,
    alignItems: 'center',
    backgroundColor: '#CCC',
    padding: 10,
  },
  titulo: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  input:{
    fontSize: 22,
    width: '90%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    elevation: 1,
  },
  btnArea:{
    flexDirection:'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  btnBusca:{
    width: '40%',
    backgroundColor: '#4682B4',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
  },
  btnLimpa:{
    width: '40%',
    backgroundColor: '#B22222',
    marginRight: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultados:{
    width: '90%',
    marginTop: 50,
    elevation: 1,
    padding: 10,
  },
  txtResultado:{
    fontSize: 22,
    fontWeight: 'bold',
  }
})