import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import DropDown from './AComponent/DropwDown';
import {CameraIcon, GalleryIcon} from '../assets/SVG';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Path, Svg} from 'react-native-svg';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import {BackHandler} from 'react-native';
import {io} from 'socket.io-client';
import ImagePicker from 'react-native-image-crop-picker';
import Modals from './AComponent/Modal';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
// const socket = io('https://reactnativebackendnew.onrender.com');
const url = 'http://192.168.1.6:4000';
const socket = io(url);
// const url = 'https://reactnativebackendnew.onrender.com';

export default function IDCard() {
  const {width, height} = useWindowDimensions();
  const classarr = [
    'All',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
  ];
  const secarr = [
    'ALL',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const [classindex, setClassIndex] = useState<number>(-1);
  const [secindex, setSecIndex] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [list, setList] = useState<any[]>([]);
  const [lcheck, setLcheck] = useState<Array<boolean>>(new Array(0));
  const [mcheck, setMcheck] = useState<boolean>(true);
  const [succes, setSucces] = useState<boolean>(false);
  const [emsgVisible, setEmsgVisible] = useState<boolean>(false);
  const [errmsg, setErrmsg] = useState<string>('');
  const navigation = useNavigation();
  const [mainlist, setMainlist] = useState<any[]>([]);
  //   fetch()
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', (): boolean => {
      Alert.alert('Are you sure you want to exit?');
      return true;
    });
    socket.on('getImage', (data: any) => {
      // console.log('recieved ', data);
      // setList(data);
      console.log('recived data from getImage');
      setMainlist(data);
      setList(data);
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', (): boolean => {
        return true;
      });
      socket.disconnect();
    };
  }, []);
  const handleCameraPicker = (admno: string) => {
    ImagePicker.openCamera({
      width,
      height: 400,
      cropping: true,
    })
      .then((image: any) => {
        console.log('camera ', image);
        uploadData(image, admno);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (classindex > -1) {
      socket.emit('getImage', {
        class: classarr[classindex],
      });
      setList([]);
      setMainlist([]);
      console.log('rerender ', classindex);
    }
  }, [classindex]);

  useEffect(() => {
    console.log('secindex', secindex);
    if (secindex === 0) {
      setList(mainlist);
    } else if (secindex > 0 && text === '') {
      const sec = secarr[secindex];
      const arr = mainlist.filter((x: any) => x.section === sec);
      console.log('arr ', arr);
      setList(arr);
    }
    if (text !== '') {
      const sec = secarr[secindex];
      const arr = mainlist.filter(
        (x: any) =>
          (x.section === sec || secindex === 0) && text.trim() === `${x.roll}`,
      );
      setList(arr);
    }
  }, [secindex, text]);
  const uploadData = (image: any, admno: string) => {
    const form = new FormData();
    const obj = image;
    try {
      const names = obj.path.split('/').pop();
      const extension = names.slice(names.lastIndexOf('.') + 1);
      console.log(extension);
      const imageName = `${admno}.${extension}`;
      console.log('uploading process started ', admno);

      form.append('image', {
        uri: obj.path,
        type: obj.mime,
        name: imageName,
      });

      form.append('admno', admno);
      form.append('imagename', imageName);

      fetch(`${url}/imageupload`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: form,
      })
        .then((resp: any) => {
          try {
            if (resp.status === 200) {
              console.log('completed uploading');
              setSucces(true);
              socket.emit('getImage', {
                class: classarr[classindex],
              });
            }
          } catch (err: any) {
            console.error('Error uploading image:');

            // setText(`Error : ${err.message}`);
          }
        })
        .catch((error: any) => {
          console.error('Error uploading image:', error);
          // setText(`Error : ${error.message}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: 'white',
      }}>
      <Modals
        text={errmsg}
        visible={emsgVisible}
        setVisible={setEmsgVisible}></Modals>
      <Modal
        animationType="fade"
        visible={succes}
        transparent={true}
        onRequestClose={() => {
          setSucces(false);
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: 30,
          }}>
          <View
            style={{
              width: '100%',
              height: 150,
              backgroundColor: '#F1F5F9',
              flexDirection: 'Column',
              borderRadius: 20,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: '#4B5563',
                textAlign: 'center',
              }}>
              Send Successfully
            </Text>
            <TouchableOpacity
              onPress={() => setSucces(false)}
              style={{
                width: 200,
                height: 50,

                backgroundColor: '#32AD29',
                borderRadius: 25,
                elevation: 32,
                shadowColor: '#32AD29',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: 'white',
          flex: 0.2,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center'}}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AHome'}],
              }),
            )
          }>
          <Svg width={40} height={40} viewBox="0 0 16 16" fill="none">
            <Path
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              fill="black"
            />
          </Svg>
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            flex: 1.3,
            textAlignVertical: 'center',
            textAlign: 'left',
            fontWeight: '500',
            fontSize: 18,
            backgroundColor: 'white',
          }}>
          ID Card
        </Text>
      </View>
      <View
        style={{
          width: width,
          marginTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 10,
          columnGap: 10,
          flexDirection: 'row',
        }}>
        <DropDown
          arr={classarr}
          text="Select class"
          fun={(value: number) => {
            setClassIndex(value);
            console.log('classindex ', classindex);
          }}
        />
        <DropDown
          arr={secarr}
          text={secarr[secindex]}
          fun={(value: number) => {
            console.log('secindex ', secindex);
            setSecIndex(value);
          }}
        />
        <TextInput
          style={{
            flex: 1,
            height: 50,
            backgroundColor: '#E9ECEF',
            borderRadius: 10,
            paddingHorizontal: 10,
            fontSize: 15,
            color: 'gray',
          }}
          onChangeText={e => setText(e.trim())}
          value={text}
          cursorColor={'gray'}
          keyboardType="numeric"
          placeholderTextColor={'gray'}
          placeholder="Enter Roll"
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 3,
          borderBottomWidth: 1,
          borderColor: '#E9ECEF',
        }}>
        <FlatList
          data={list}
          renderItem={({item, index}: any) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  flex: 3,
                  borderWidth: 1,
                  borderColor: '#E9ECEF',
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#E9ECEF',
                    paddingHorizontal: 10,
                    alignContent: 'center',
                    paddingVertical: 10,
                    minHeight: 40,

                    flexDirection: 'row',
                  }}>
                  <View>
                    <Image
                      source={
                        item.imagepath !== ''
                          ? {uri: `data:image/jpeg;base64,${item.imagepath}`}
                          : require('../assets/user.png')
                      }
                      style={{
                        backgroundColor: 'white',
                        width: 100,
                        height: 100,
                        borderRadius: 100 / 2,
                        marginRight: 30,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        handleCameraPicker(item.admno);
                        // openCamera(item.admno);
                        console.log(item.admno);
                      }}
                      style={{
                        padding: 10,
                        position: 'absolute',
                        backgroundColor: 'black',
                        borderRadius: 50,
                        left: 55,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CameraIcon
                        color="white"
                        width={20}
                        height={20}
                        style={{}}></CameraIcon>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          fontSize: 16,
                          flex: 1,
                        }}>
                        Name
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          backgroundColor: 'white',
                          fontSize: 16,
                          flex: 3,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      }}>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          fontSize: 16,
                          flex: 1,
                        }}>
                        Class
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          backgroundColor: 'white',
                          fontSize: 16,
                          flex: 3,
                        }}>
                        {item.class},{item.section},{item.roll}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      }}>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          fontSize: 16,
                          flex: 1,
                        }}>
                        F.Name
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          backgroundColor: 'white',
                          fontSize: 16,
                          flex: 3,
                        }}>
                        {item.fname}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      }}>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          fontSize: 16,
                          flex: 1,
                        }}>
                        Add
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          backgroundColor: 'white',
                          fontSize: 16,
                          flex: 3,
                        }}>
                        {item.ptown}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'white',
                      }}>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          fontSize: 16,
                          flex: 1,
                        }}>
                        Mob
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          textAlign: 'left',
                          backgroundColor: 'white',
                          fontSize: 16,
                          flex: 3,
                        }}>
                        {item.fmob}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
