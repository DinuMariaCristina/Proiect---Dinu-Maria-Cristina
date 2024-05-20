import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; 
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const userName = useSelector((state: RootState) => state.auth.userName);
  
  const handleProfile = () => {
    navigation.navigate('User');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bună, {userName}!</Text>
      <Text style={styles.gameText}>Game</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to User Details"
          onPress= {handleProfile}
          color="#006BA1" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A5F3F8', 
  },
  welcomeText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#006BA1',
    marginBottom: 20, 
  },
  gameText: {
    fontSize: 18,
    color: '#006BA1', 
    marginBottom: 50, 
  },
  buttonContainer: {
    shadowColor: "#006BA1",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  }
});

export default HomeScreen;
