import React, { useState, useEffect } from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Title from '../components/Title';
import env from "../../env.json"

export default function Schedule() {
  const [barbers, setBarbers] = useState([]);

  /**
   * Função responsável por retornar todos os barbeiros
   * @returns barbeiros
   */
  useEffect(() => {
    fetch(`${env.host}/schedule/`)
      .then((response) => response.json())
      .then((json) => (setBarbers(json)))
      .catch(() => (alert('Impossível carregar a agenda!')))
  }, [])


  console.log(barbers.map(item => { return item.name }))
  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <SectionList
        sections={barbers}

        renderItem={({item}) => {
          <View>
            <Text>{item.name}</Text>
          </View>
        }}

        renderSectionHeader={({barbers}) => {
          <View>
            <Text>
              {barbers.name}
            </Text>
          </View>
        }}

        keyExtractor={ (item) => item.id}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 10 : 0,
    width: "100%",
    height: "auto",
    backgroundColor: "#423e3c",
  }
})