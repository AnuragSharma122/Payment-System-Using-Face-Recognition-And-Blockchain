import * as React from 'react';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeScreen({ navigation }) {
  return (
    <View >
      <Text style={styles.mainTitle}>Face Scan And Payment</Text>
      <View style={{alignItems:'center', justifyContent:'center'}}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.registerText}>Payment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    paddingTop: 60,
    // paddingLeft: 20,
    marginBottom: 50,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#df4fc8'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 80,
  },
  register: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 50,
    width: '86%',
    backgroundColor: '#dd4fce',
    borderRadius: 20,
    paddingLeft: 10,
    // marginBottom: 10,
  },
  registerText: {
    paddingLeft: 125,
    color: '#ffffff'
  },
})