import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }: any) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginId.trim() || !password.trim()) {
      Alert.alert('त्रुटि', 'कृपया सभी फ़ील्ड भरें');
      return;
    }

    setIsLoading(true);
    
    // API: POST /login - Authenticate user
    // Yahan par aap fetch ya axios ka use karke backend ko loginId aur password bhejenge

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, accept any loginId/password
      if (loginId && password) {
        Alert.alert('सफलता', 'लॉगिन सफल रहा!', [
          { text: 'ठीक है', onPress: () => navigation.navigate('MainApp') }
        ]);
      } else {
        Alert.alert('त्रुटि', 'गलत लॉगिन आईडी या पासवर्ड');
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    // API: POST /forgot-password - Send password reset link
    // Yahan par aap fetch ya axios ka use karke backend ko loginId bhejenge
    Alert.alert('पासवर्ड भूल गए', 'पासवर्ड रीसेट लिंक आपके पंजीकृत मोबाइल नंबर पर भेजा जाएगा।');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="library" size={60} color="#2563eb" />
            </View>
            <Text style={styles.appTitle}>स्मृति पुस्तकालय</Text>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            {/* Login ID Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>लॉगिन आईडी</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={loginId}
                  onChangeText={setLoginId}
                  placeholder="अपनी लॉगिन आईडी दर्ज करें"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>पासवर्ड</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="अपना पासवर्ड दर्ज करें"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity 
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#64748b" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>पासवर्ड भूल गए?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#fff" style={{ marginBottom: 8 }} />
                  <Text style={styles.loadingText}>लॉगिन किया जा रहा है...</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="log-in" size={20} color="#fff" />
                  <Text style={styles.loginButtonText}>लॉगिन करें</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              लॉगिन करके, आप हमारी सेवा शर्तों और गोपनीयता नीति से सहमत हैं।
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  form: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  eyeButton: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinning: {
    transform: [{ rotate: '360deg' }],
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  loadingOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    flexDirection: 'column',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 