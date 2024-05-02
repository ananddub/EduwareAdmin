import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import temp from './temp/temp';
import AHome from './Admin/AHome';
import ALogin from './Admin/Alogin';
import ANotice from './Admin/ANotice';
import Searching from './Admin/Searching';

const stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="ALogin"
          component={ALogin}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <stack.Screen
          name="AHome"
          component={AHome}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <stack.Screen
          name="Sealecting"
          component={Searching}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <stack.Screen
          name="ANotice"
          component={ANotice}
          options={{
            title: 'Admin Annoucment List',
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
