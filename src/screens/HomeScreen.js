import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../utils';

import { useDispatch, useSelector } from 'react-redux';
import { resetLogin } from '../app/reducers/auth';
import { fetchProducts, fetchCatering } from '../app/api/auth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  const [products, setProducts] = useState([]);
  const [caterings, setCaterings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, cateringsData] = await Promise.all([
          fetchProducts(token),
          fetchCatering(token),
        ]);
        setProducts(productsData);
        setCaterings(cateringsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        Products
      </Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            padding: 12,
            marginBottom: 8,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
            <Text>Price: ₱{item.price}</Text>
            <Text>Stock: {item.stock}</Text>
            <Text style={{ color: 'gray', fontSize: 12 }}>{item.description}</Text>
          </View>
        )}
      />

      <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10 }}>
        Catering
      </Text>
      <FlatList
        data={caterings}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            padding: 12,
            marginBottom: 8,
            backgroundColor: '#e8f4ff',
            borderRadius: 8,
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
            <Text>Event Date: {item.eventDate}</Text>
            <Text>Guests: {item.numberOfGuests}</Text>
            <Text>Price: ₱{item.price}</Text>
            <Text style={{
              color: item.status === 'Pending' ? 'orange' : 'green',
              fontWeight: 'bold',
            }}>
              {item.status}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
        style={{
          padding: 15,
          backgroundColor: 'blue',
          borderRadius: 10,
          marginTop: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          Go to Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => dispatch(resetLogin())}
        style={{
          padding: 15,
          backgroundColor: 'red',
          borderRadius: 10,
          marginTop: 10,
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

export default HomeScreen;