import { StatusBar } from 'expo-status-bar';
import { 
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity, } from 'react-native';

export default function PaymentScreen() {
  return (
    <View>
      <Text style={styles.mainTitle}>Payment</Text>
      <View style={styles.form}>
        <View style={styles.row}>
          <TextInput
            editable={false} 
            selectTextOnFocus={false}
            style={styles.input}
            placeholder="First Name"
          />
          <TextInput
            editable={false} 
            selectTextOnFocus={false}
            style={styles.input}
            placeholder="Last Name"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            editable={false} 
            selectTextOnFocus={false}
            style={styles.input}
            placeholder="Phone Number"
          />
          <TextInput
            editable={false} 
            selectTextOnFocus={false}
            style={styles.input}
            placeholder="Email"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            editable={false} 
            selectTextOnFocus={false}
            style={styles.input}
            placeholder="Card Number"
          />
          <View
            style={styles.cardInputPlace}
          >
            <TextInput
              style={styles.cardInputCVV}
              placeholder="CVV"

            />
            <TextInput
              editable={false} 
              selectTextOnFocus={false}
              style={styles.cardInputEXP}
              placeholder="MM"
            />
            {/* <Text style={styles.expiryDateSeparator}>/</Text> */}
            <TextInput
              editable={false} 
              selectTextOnFocus={false}
              style={styles.cardInputEXP}
              placeholder="YR"
            />
          </View>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.amountInput}
            placeholder="Enter your amount"
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.register}>
            <Text style={styles.registerText}>Submit</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    paddingTop:60,
    // paddingLeft: 75,
    marginBottom: 50,
    fontSize: 65,
    fontWeight: 'bold',
    color: '#df4fc8',
    textAlign:'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
    marginBottom: 80,
  },
  expiryRow: {
    flex: 1,
    flexDirection: 'flex-end',
    paddingLeft: 28,
    marginBottom: 80,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent : 'space-evenly',
    // alignItems: 'center',
  },
  input: {
    height: 40,
    width: '40%',
    backgroundColor: 'grey',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  amountInput: {
    height: 40,
    width: '86%',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  cardInputPlace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    width: "40%",
    // backgroundColor: 'red',
    marginBottom: 10,
  },
  cardInputCVV: {
    height: 40,
    width: '30%',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  cardInputEXP: {
    height: 40,
    width: '25%',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  expiryDateSeparator: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  register:{
    alignContent: 'center',
    justifyContent: 'center',
    height: 50,
    width: '86%',
    backgroundColor: '#dd4fce',
    borderRadius: 20,
    paddingLeft: 10,
    // marginBottom: 10,
  },
  registerText:{
    paddingLeft: 125,
    color: '#ffffff'
  },
})