import React, { useState, useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  SectionList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import Title from "../../components/Title";
import {server} from "../../config/environment"
import { response } from 'express';
import { json } from 'body-parser';

export default function Schedule(){
  const [barbers,setBarbers] = useState([]);
  
  /**
   * Função responsável por retornar todos os barbeiros
   * @returns barbeiros
   */
  useEffect(()=>{
    fetch(`${server.host}:${server.port}/barbers`)
      .then((response)=>response.json())
      .then((json)=>(setBarbers(json)))
      .catch(()=>(alert('Impossível carregar a agenda!')))
  },[])

  console.log(barbers)

  return(
    <SafeAreaView style={styles.container}>
      <Title/>

    </SafeAreaView>
  );
}