import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';
import { userLogin } from '../../actions/auth';  // ✅ FIXED IMPORT

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password');
      return;
    }
    dispatch(userLogin({ email, password }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inputWrapper}>
        <CustomTextInput
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={val => setEmail(val)}
          containerStyle={{ width: '100%', marginBottom: 15 }}
          labelStyle={{ fontSize: 20, fontWeight: '500' }}
          textStyle={{ fontSize: 20 }}
        />

        <CustomTextInput
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={val => setPassword(val)}
          containerStyle={{ width: '100%' }}
          labelStyle={{ fontSize: 20, fontWeight: '500' }}
          textStyle={{ fontSize: 20 }}
          secureTextEntry
        />
      </View>

      <CustomButton
        label="LOGIN"
        containerStyle={{
          marginVertical: 20,
          width: '80%',
          backgroundColor: 'blue',
          borderRadius: 10,
        }}
        textStyle={{
          color: '#ffffff',
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 20,
        }}
        loading={isLoading}
        onPress={handleLogin}
      />

      <View style={styles.row}>
        <Text>Not registered yet?</Text>
        <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inputWrapper: { alignItems: 'center', justifyContent: 'center', width: '80%' },
  row: { flexDirection: 'row' },
  linkText: { color: 'red', fontWeight: '800' },
});

export default Login;