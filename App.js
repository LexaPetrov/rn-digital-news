import React from 'react';
import News from './src/components/News'
import Feedback from './src/components/Feedback'
import Services from './src/components/Services'
import Post from './src/components/Post'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

const getHeaderTitle = route => {
  const routeName = route.state ? route.state.routes[route.state.index].name : '#минцифра56: События'
  switch (routeName) {
    case 'News':
      return '#минцифра56: События 🎈'
    case 'Feedback':
      return '#минцифра56: Интернет-приемная 📝'
    case 'Services':
      return '#минцифра56:Сервисы 🛠'
    case '#минцифра56: События':
      return '#минцифра56: События 🎈'
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
          paddingLeft: Platform.OS === 'web' ? 15 : 0,
          fontWeight: "bold"
        }
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'События',
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
      <Tab.Screen
        options={{
          tabBarLabel: 'Сервисы',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="external-link-alt" size={20} color={focused ? '#00185c' : 'gray'} />
          )
        }}
        name="Services"
        component={Services}
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
              backgroundColor: Platform.OS === 'android' ? '#00185c' : 'white'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : '#00185c',
            headerTitle: 'Post'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
