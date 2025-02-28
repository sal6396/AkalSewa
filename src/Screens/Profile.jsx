import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ImageBackground } from 'react-native';

const Profile = ({ route }) => {
  const user = route?.params?.user;

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <>
          <View style={styles.header}>
            <ImageBackground
              source={require('../Assets/profile_cover.webp')}
              style={styles.backgroundImage}
              resizeMode="cover" >

              <Image
                source={require('../Assets/user.png')} // Replace with actual image URL
                style={styles.avatar}
              />
              <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
            </ImageBackground>

          </View>


          <View style={styles.infoBox}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.info}>{user.name}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.info}>{user.email}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.info}>User data not available.</Text>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden', // Ensures the background image doesn't overflow
    marginBottom: 20,
    elevation: 10,
  },

  backgroundImage: {
    width: '150%',
    padding: 20, // Adjust padding as needed
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff', // White border for better contrast
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // White text for better contrast with the background
    marginTop: 10,
  },

  questionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
});
