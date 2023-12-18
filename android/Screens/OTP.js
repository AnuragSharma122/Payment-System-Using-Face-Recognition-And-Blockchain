import React, { useState } from 'react';
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
// import styled from "styled-components/native";

export default function OTP({ navigation }) {

    return (
        <View>
            <Text style={styles.mainTitle}>OTP Verify</Text>
            <View style={styles.form}>
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                    />
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.scanFaceButton} >
                        <Text style={styles.scanFaceButtonText} >Verify OTP</Text>
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
        fontSize: 45,
        fontWeight: 'bold',
        color: '#df4fc8',
        textAlign: 'center'
    },
    form: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent : 'center',
        alignItems: 'center',
    },
    row: {
        // flex: 1,
        flexDirection: 'row',
        // backgroundColor:'red',
        justifyContent: 'space-evenly',
        marginBottom: 80,
    },
    input: {
        height: 40,
        width: '40%',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
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
})