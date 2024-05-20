import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; 
import { fetchUserDetails } from '../../api';

interface User {
  email: string;
  id: string;
}

interface UserDetails {
  currentlyGamesPlaying: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  user: User;
}

const UserDetailScreen = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (token) {
          console.log('Fetching user details with token:', token);
          const data = await fetchUserDetails(token);
          console.log('User details fetched:', data);
          setUserDetails(data);
        } else {
          console.log('No token available');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#407BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No user details available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Details</Text>
      <Text style={styles.labelText}>Id:</Text><Text style={styles.detailText}>{userDetails.user.id}</Text>
      <Text style={styles.labelText}>Email:</Text><Text style={styles.detailText}>{userDetails.user.email}</Text>
      <Text style={styles.labelText}>Currently Games Playing:</Text><Text style={styles.detailText}>{userDetails.currentlyGamesPlaying}</Text>
      <Text style={styles.labelText}>Games Lost:</Text><Text style={styles.detailText}>{userDetails.gamesLost}</Text>
      <Text style={styles.labelText}>Games Played:</Text><Text style={styles.detailText}>{userDetails.gamesPlayed}</Text>
      <Text style={styles.labelText}>Games Won:</Text><Text style={styles.detailText}>{userDetails.gamesWon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDF8E', 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF4925', 
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4925', 
  },
  detailText: {
    fontSize: 18,
    marginBottom: 12, 
    color: '#FE765C', 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD2AD',
  },
  errorText: {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserDetailScreen;
