import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import PaymentScreen from './Screens/Payment';
import RegisterScreen from './Screens/Register';
import PaymentScan from './Screens/PaymentScan';
import OTP from './Screens/OTP';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
        contentStyle:{
          backgroundColor:'#1f2251'
        }
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Payment" component={PaymentScan} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 100,
    backgroundColor: '#1f2251',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
