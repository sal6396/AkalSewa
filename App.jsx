import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import Dashboard from './src/Screens/Dashboard';
import AcademyPage from './src/Screens/AcademyPage';
import AcademyDetails from './src/Screens/AcademyDetails';
import Estimate from './src/Screens/Estimate';
import AddEstimate from './src/Screens/AddEstimate';
import EstimateSearch from './src/Screens/EstimateSearch';
import Profile from './src/Screens/Profile';
import ApprovedEstimateHistory from './src/Screens/ApprovedEstimateHistory ';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Estimate" component={Estimate}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Estimate Access Control',
            headerRight: () => (
              <React.Fragment>
                {/* <TouchableOpacity onPress={() => navigation.navigate('EstimateSearch')}>
                  <Text style={{ marginRight: 20, fontSize: 18 }}>🔍</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => navigation.setParams({ sortModalVisible: true })}>
                  <Text style={{ marginRight: 20, fontSize: 18 }}>⬇️</Text>
                </TouchableOpacity> */}
              </React.Fragment>
            ),
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: 'white'
          })}
        />
        <Stack.Screen name="AcademyPage" component={AcademyPage}
          options={{
            headerShown: true, headerTitle: 'Academy List',
            headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white'
          }} />
        <Stack.Screen name="ApprovedEstimateHistory" component={ApprovedEstimateHistory}
        options={({ navigation }) => ({
            headerShown: true, headerTitle: 'Approved Estimate History',
            headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white',
            headerRight: () => (
              <React.Fragment>
                {/* <TouchableOpacity onPress={() => navigation.navigate('EstimateSearch')}>
                  <Text style={{ marginRight: 20, fontSize: 18 }}>🔍</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => navigation.setParams({ sortModalVisible: true })}>
                  <Text style={{ marginRight: 20, fontSize: 18 }}>⬇️</Text>
                </TouchableOpacity> */}
              </React.Fragment>
            ),
          })} />
        <Stack.Screen name="Profile" component={Profile}
          options={{
            headerShown: true, headerTitle: 'Profile',
            headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white'
          }} />
        <Stack.Screen name="AcademyDetails" component={AcademyDetails}
          options={{
            headerShown: true, headerTitle: 'Academy Details',
            headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white'
          }} />
        <Stack.Screen name="EstimateSearch" component={EstimateSearch}
          options={{
            headerShown: true, headerTitle: 'Search Academy',
            headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white'
          }} />
        <Stack.Screen name="AddEstimate" component={AddEstimate}
          options={{
            headerShown: true, headerTitle: 'Create New Estimate',
            headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white'
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;