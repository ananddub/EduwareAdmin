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
  BackHandler,
} from 'react-native';
import DropDown from './AComponent/DropwDown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Path, Svg} from 'react-native-svg';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import {io} from 'socket.io-client';
import Modals from './AComponent/Modal';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Circle} from 'react-native-animated-spinkit';
// const socket = io('https://reactnativebackendnew.onrender.com');
// const url = 'http://192.168.1.6:4000';
const url = 'http://3.110.47.78:4000';

// const url = 'https://reactnativebackendnew.onrender.com';

export default function Searching() {
  const {width, height} = useWindowDimensions();
  const classarr = [
    'All',
    'NUR',
    'LKG',
    'UKG',
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
  const secarr = ['ALL', 'A', 'B', 'C', 'D'];
  const [classindex, setClassIndex] = useState<number>(-1);
  const [secindex, setSecIndex] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [list, setList] = useState<any[]>([]);
  const [mainlist, setMainlist] = useState<any[]>([]);
  const [lcheck, setLcheck] = useState<Array<boolean>>(new Array(0));
  const [mcheck, setMcheck] = useState<boolean>(true);
  const [textmsg, setTextmsg] = useState<string>('');
  const [succes, setSucces] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(false);
  const [emsgVisible, setEmsgVisible] = useState<boolean>(false);
  const [errmsg, setErrmsg] = useState<string>('');
  const navigation = useNavigation();
  //   fetch()
  useEffect(() => {
    if (classindex > -1) {
      console.log('rerender ', classindex);
      setList([]);
      setSpin(true);
      const query = `${url}/searchstd?class=${classarr[classindex]}&sec=${
        secindex > 0 ? secarr[secindex] : 'null'
      }&roll=${text.length > 0 ? text : 'null'}`;
      console.log(query);
      fetch(query)
        .then((response: any) => {
          if (response.status === 200) {
            response.json().then((data: any) => {
              setList(data);
              setLcheck(new Array(data.length).fill(false));
              setSpin(false);
              console.log(data);
              console.log(typeof data);
            });
          } else if (response.status === 404) {
            setList([]);
            setSpin(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
      console.log('rerender1');
    }
  }, [classindex, secindex, text]);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', (): boolean => {
      navigation.navigate('AHome');
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', (): boolean => {
        return true;
      });
    };
  }, []);
  const onSubmit = () => {
    const socket = io(url);
    if (classindex === -1) {
      // setEFlags(true);
      setErrmsg('please select class');
      setEmsgVisible(true);
    } else if (textmsg.length === 0) {
      setErrmsg('please enter message');
      setEmsgVisible(true);
    } else if (
      mcheck === false &&
      lcheck.filter(x => x === true).length === 0
    ) {
      setErrmsg('please select students');
      setEmsgVisible(true);
    } else {
      if (classindex === 0) {
        const obj = {
          message: textmsg,
          to: ['all'],
          from: 'admin',
          class: '',
          sec: '',
        };
        socket.emit('admin', obj);
        setSucces(true);
      } else if (classindex > 0) {
        setMainlist([]);
        setList([]);
        if (mcheck === true) {
          const obj = {
            message: textmsg,
            to: classarr[classindex],
            from: 'admin',
            class: classarr[classindex],
            sec:
              secindex == 0 ? secarr[secindex].toLowerCase() : secarr[secindex],
          };
          socket.emit('admin', obj);
          setSucces(true);
        } else {
          const arr = lcheck
            .map((x, i) => (x === true ? list[i].admno : false))
            .filter(x => x);
          const classar = lcheck
            .map((x, i) => (x === true ? list[i].class : false))
            .filter(x => x);
          const sec = lcheck
            .map((x, i) => (x === true ? list[i].section : false))
            .filter(x => x);
          const roll = lcheck
            .map((x, i) => (x === true ? list[i].roll : false))
            .filter(x => x);
          const fname = lcheck
            .map((x, i) => (x === true ? list[i].fname : false))
            .filter(x => x);
          const name = lcheck
            .map((x, i) => (x === true ? list[i].name : false))
            .filter(x => x);
          const obj = {
            message: textmsg,
            to: arr,
            from: 'admin',
            class: null,
            sec: null,
            mclass: classar,
            msec: sec,
            mroll: roll,
            name: name,
            fname: fname,
          };
          console.log(arr);
          socket.emit('admin', obj);
          setSucces(true);
        }
      }
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
            flex: 1,
            textAlignVertical: 'center',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 18,
            backgroundColor: 'white',
          }}>
          Annoucment
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ANotice');
          }}
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 33,
              width: 33,
            }}
            source={require('../assets/archive.png')}
          />
        </TouchableOpacity>
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
            console.log('secindex', secindex);
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
        <View
          style={{
            borderBottomWidth: 1,
            height: 30,
            borderColor: 'gray',
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              fontSize: 16,
              backgroundColor: 'white',
              flex: 2,
            }}>
            Name
          </Text>

          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 16,
              backgroundColor: 'white',
              flex: 1,
            }}>
            Section
          </Text>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 16,
              backgroundColor: 'white',
              flex: 1,
            }}>
            Roll
          </Text>
          <View
            style={{
              flex: 0.4,
              backgroundColor: 'white',
            }}>
            <BouncyCheckbox
              size={25}
              fillColor="#1c9cf7"
              unFillColor="#FFFFFF"
              text=""
              isChecked={mcheck}
              iconStyle={{borderColor: 'red'}}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{fontFamily: 'JosefinSans-Regular'}}
              onPress={(isChecked: boolean) => {
                console.log(isChecked);
                setMcheck(isChecked);
                setLcheck(new Array(list.length).fill(isChecked));
              }}
            />
          </View>
        </View>
        <FlatList
          data={list}
          renderItem={({item, index}: any) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  flex: 3,
                  borderBottomWidth: 1,
                  borderColor: '#E9ECEF',
                }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#E9ECEF',
                    paddingHorizontal: 10,
                    alignContent: 'center',
                    minHeight: 40,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      textAlign: 'left',
                      textAlignVertical: 'center',

                      fontSize: 16,
                      backgroundColor: 'white',
                      flex: 2,
                    }}>
                    {item.name}
                  </Text>

                  <Text
                    style={{
                      color: 'gray',
                      textAlign: 'center',
                      fontSize: 16,
                      textAlignVertical: 'center',

                      backgroundColor: 'white',
                      flex: 1,
                    }}>
                    {item.section}
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      textAlign: 'center',
                      fontSize: 16,
                      textAlignVertical: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      flex: 1,
                    }}>
                    {item.roll}
                  </Text>
                  <View
                    style={{
                      flex: 0.4,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                    }}>
                    <BouncyCheckbox
                      size={25}
                      fillColor="#1c9cf7"
                      unFillColor="#FFFFFF"
                      text=""
                      isChecked={mcheck === true ? true : lcheck[index]}
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 2}}
                      textStyle={{fontFamily: 'JosefinSans-Regular'}}
                      onPress={(isChecked: boolean) => {
                        console.log(index);
                        lcheck[index] = !lcheck[index];
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flex: 0.45,
          backgroundColor: 'white',
        }}>
        <KeyboardAccessory>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flex: 1,
              height: 110,
              gap: 4,
              backgroundColor: 'white',
              borderTopWidth: 1,
              paddingHorizontal: 4,
              paddingVertical: 4,
            }}>
            <TextInput
              style={{
                backgroundColor: 'white',
                padding: 10,
                color: 'black',
                borderColor: '#1c9cf7',
                borderWidth: 2,
                borderRadius: 10,
                height: '78%',
                fontSize: 15,
                textAlignVertical: 'bottom',
                flex: 2.5,
              }}
              onChangeText={e => setTextmsg(e.trim())}
              multiline={true}
              placeholder="Enter your message"
              placeholderTextColor={'gray'}
            />
            <View
              style={{
                flex: 1,
                height: '80%',
                flexDirection: 'column-reverse',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: '#1c9cf7',
                  padding: 10,
                  maxHeight: '60%',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onSubmit}>
                <Text
                  style={{
                    fontWeight: '500',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 18,
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAccessory>
      </View>
      {spin && (
        <View
          style={{
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'center',
            top: height / 3,
            left: width / 2.5,
            alignItems: 'center',
          }}>
          <Circle size={100} color="black"></Circle>
        </View>
      )}
      {spin === false && list.length === 0 && (
        <View
          style={{
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'center',
            top: height / 3,
            width: width,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'gray',
              textAlign: 'center',
              fontSize: 30,
            }}>
            {classindex === 0 ? 'All Stduent Selected' : 'No Data'}
          </Text>
        </View>
      )}
    </View>
  );
}
