import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';

import AuthNav from './AuthNav';
import MainNav from './MainNav';
import { useSelector } from 'react-redux';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { token } = useSelector(state => state.auth); // changed from data to token

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#000000', true);
    }
    StatusBar.setBarStyle('dark-content', true);
  }, [isDarkMode]);

  return (
    <NavigationContainer>
      {token ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};