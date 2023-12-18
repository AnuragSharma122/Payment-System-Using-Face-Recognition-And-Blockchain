import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity, Alert, Modal,
    Pressable,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function PaymentScanScreen({navigation}) {
    const [modalVisible, setModalVisible] = useState(true);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
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
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    function close(){
        setModalVisible(!modalVisible)
        navigation.navigate('Home')
    }
    return (
        <View>
            <Text style={styles.mainTitle}>Payment Scan</Text>
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
                                onPress={close}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    mainTitle: {
        paddingTop: 60,
        // paddingLeft: 50,
        marginBottom: 50,
        fontSize: 45,
        fontWeight: 'bold',
        color: '#df4fc8',
        textAlign:'center',
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