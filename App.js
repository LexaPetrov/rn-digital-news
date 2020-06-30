import React from 'react';
import News from './src/components/News'
import Feedback from './src/components/Feedback'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Post from './src/components/Post';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const getHeaderTitle = route => {
  const routeName = route.state ? route.state.routes[route.state.index].name : '#минцифра56: Новости'
  console.log(routeName);
  
  switch (routeName) {
    case 'News':
      return '#минцифра56: Новости'
    case 'Feedback':
      return '#минцифра56: Оставить обращение'
    case '#минцифра56: Новости':
      return '#минцифра56: Новости'
  }
}

function navTab({ navigation, route }) {
  navigation.setOptions({
    headerTitle: getHeaderTitle(route)
  })

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#00185c',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
          fontWeight: "bold"
        }
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Новости',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="newspaper" size={20} color={focused ? '#00185c' : 'gray'} />
          ),
        }}
        name="News"
        component={News}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Обращение',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="feedback" size={20} color={focused ? '#00185c' : 'gray'} />
          )
        }}
        name="Feedback"
        component={Feedback}
      />
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="#минцифра56" component={navTab}
          options={
            ({ route }) => ({
              title: getHeaderTitle(route)
            }),
            {
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? '#00185c' : 'white',
              },
              headerTintColor: Platform.OS === 'android' ? 'white' : '#00185c',
            }
          }
        />
        <Stack.Screen name="Post" component={Post}
          options={{
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? '#00185c' : 'white',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : '#00185c',
            headerTitle: 'Post'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
