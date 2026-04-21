import React from 'react';
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window'); // calculate once outside

const CustomButton = ({ containerStyle, label, textStyle, onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          padding: width * 0.014,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2196F3', // default blue button bg
          borderRadius: 8,
          height: 60, // fixed height to avoid layout jump
        },
        containerStyle,
      ]}
      disabled={loading} // prevent press when loading
    >
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Text style={[{ color: '#fff', fontSize: 16, fontWeight: 'bold' }, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;