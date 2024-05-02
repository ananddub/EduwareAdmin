import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {View} from 'react-native';
import Modals from './AComponent/Modal';
import {CommonActions, useNavigation} from '@react-navigation/native';
function ALogin() {
  const {width, height} = useWindowDimensions();
  const user: string = 'admin';
  const [tuser, setTuser] = useState<string>('');
  const [tpassword, setTpassword] = useState<string>('');
  const password: string = 'admin';
  const [inavlid, setInvalid] = useState<boolean>(false);
  const navigator = useNavigation();
  const onSubmit = () => {
    if (user === tuser.trim() && password === tpassword.trim()) {
      console.log('sucessfully submitted');
      navigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AHome'}],
        }),
      );
    } else {
      setInvalid(true);
    }
  };

  return (
    <View
      style={{
        width: width,
        height: height,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        gap: 10,
        paddingHorizontal: 20,
      }}>
      <Modals text="Inavlid Admin" visible={inavlid} setVisible={setInvalid} />
      <View>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            textAlign: 'center',
          }}>
          Admin Login
        </Text>
      </View>
      <TextInput
        placeholder="Enter your username"
        onChangeText={setTuser}
        style={{
          backgroundColor: '#E9ECEF',
          borderRadius: 10,
          fontSize: 16,
          color: 'gray',
          borderWidth: 0,
          paddingHorizontal: 10,
          borderColor: '#1c9cf7',
        }}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={setTpassword}
        style={{
          backgroundColor: '#E9ECEF',
          borderRadius: 10,
          fontSize: 16,
          color: 'gray',
          borderWidth: 0,
          paddingHorizontal: 10,
          borderColor: '#1c9cf7',
        }}
        placeholderTextColor="gray"
      />
      <TouchableOpacity
        onPress={onSubmit}
        style={{
          backgroundColor: '#1c9cf7',
          borderRadius: 10,
          padding: 10,
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ALogin;
