import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { resetLogin } from '../app/reducers/auth';
import { fetchProfile } from '../app/api/auth';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile(token);
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 30 }}>

      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>
        My Profile
      </Text>

      <View style={{
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        marginBottom: 20,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{profile?.name}</Text>
        <Text style={{ color: 'gray', marginTop: 4 }}>{profile?.email}</Text>
        <Text style={{ marginTop: 8 }}>Role: {profile?.role}</Text>
        <Text style={{ marginTop: 4 }}>
          Status: {profile?.isActive ? '✓ Active' : '✗ Inactive'}
        </Text>
        <Text style={{ color: 'gray', fontSize: 12, marginTop: 8 }}>
          Member since: {profile?.createdAt}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => dispatch(resetLogin())}
        style={{
          padding: 15,
          backgroundColor: 'red',
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          Logout
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default ProfileScreen;