import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Alert, Modal,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function RegisterScreen({navigation}) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    image: null,
    phone: "",
    gender: "",
    email: "",
    wallet: "",
    cardnumber: "",
    expiration: "",
    cvv: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [enteredOtpValue, setEnteredOtpValue] = useState("");
  const [faceScanned, setFaceScanned] = useState(false);
  const [startScan, setStartScan] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const handleReset = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtpValue("");
    setEnteredOtpValue("");
    setFormData({});
  };

  //handle submit function
  const handleSubmit = (event) => {
    // console.log(formData);
    event.preventDefault();
    if (otpValue != enteredOtpValue) {
      setMessage("OTP not matched");
      alert("OTP NOT MATCHED");
      handleReset();
      return;
    }
    //Final step after otp is verfied
    // axios
    //   .post("http://127.0.0.1:3002/users/api/register", formData)
    //   .then((res) => {
    //     setMessage(res.data);
    //     // console.log(res.data);
    //     handleReset();
    //   })
    //   .catch((err) => {
    //     setMessage("User not registered! Try again");
    //     handleReset();
    //     console.log(err);
    //   });
    // console.log(formData);
  };

  const sendOtpToUser = (event) => {
    event.preventDefault();
    //generate an OTP of 4 number and send it to the number given in form
    //Generate OTP
    let otp = "1234";
    setOtpValue(otp);
    setOtpSent(true);
    // for (let i = 0; i < 6; i++) {
    //   otp += Math.floor(Math.random() * 10);
    // }
    // setOtpValue(otp);
    // // console.log(otp);
    // axios
    //   .post("http://127.0.0.1:3002/users/api/send-otp", {
    //     otp: otp,
    //     phone: formData.phone,
    //   })
    //   .then((res) => {
    //     if (res.status == 200) {
    //       setOtpSent(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  //handle input functions
  const handleInputs = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const onCapture = (e) => {

  }
  const handleImageUpload = () => {
    setShowCamera(true);
  };
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  return (

    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text style={styles.modalText}>Hello World!</Text> */}
              <View style={styles.cameraContainer}>
                <Camera style={styles.camera} type={type}>
                  <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
                      <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity> */}
                  </View>
                </Camera>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={toggleCameraType}
              >
                <Text style={styles.textStyle} >Scan</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      </View>
      <Text style={styles.mainTitle}>Register</Text>
      <View style={styles.form}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChangeText={handleInputs}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Gender"
          />
          <TextInput
            style={styles.input}
            placeholder="PAN Number"
          />
        </View>
        <View style={styles.row}>
          <TextInput
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
              style={styles.cardInputEXP}
              placeholder="MM"
            />
            {/* <Text style={styles.expiryDateSeparator}>/</Text> */}
            <TextInput
              style={styles.cardInputEXP}
              placeholder="YR"
            />
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.scanFaceButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.scanFaceButtonText} >Scan face</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.register} onPress={() => navigation.navigate('OTP')}>
            <Text style={styles.registerText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </View>


    </View>
  );
}
const styles = StyleSheet.create({
  mainTitle: {
    paddingTop: 60,
    marginBottom: 50,
    fontSize: 65,
    fontWeight: 'bold',
    color: '#df4fc8',
    textAlign:'center',
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
  scanFaceButton: {
    height: 40,
    width: '22%',
    backgroundColor: '#dd4fce',
    borderRadius: 5,
    paddingLeft: 10,
    // marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  scanFaceButtonText: {
    color: '#ffffff'
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // width: '80%',
    width: '80%',
    height: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'red',
    width:'100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  cameraButton: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})