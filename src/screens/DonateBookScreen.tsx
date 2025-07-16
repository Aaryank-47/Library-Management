import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Genre, BookCondition } from '../types';

export default function DonateBookScreen() {
  // Donor Information
  const [donorName, setDonorName] = useState('');
  const [donorMobile, setDonorMobile] = useState('');
  const [donationDate, setDonationDate] = useState(new Date().toISOString().split('T')[0]);
  // Book Information
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState(''); // Author field added
  const [isbn, setIsbn] = useState(''); // ISBN field added
  const [selectedGenre, setSelectedGenre] = useState<Genre>('Fiction'); // Genre field added
  const [selectedCondition, setSelectedCondition] = useState<BookCondition>('New');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [donorAddress, setDonorAddress] = useState(''); // keep for now if needed elsewhere
  // removed bookLocation as per new requirements
  const [showConditionPicker, setShowConditionPicker] = useState(false);
  const [showGenrePicker, setShowGenrePicker] = useState(false); // Genre picker state
  const conditions: BookCondition[] = [
    'New',
    'Used',
    'Poor',
    'Unusable',
  ];

  const genres: Genre[] = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Biography',
    'History',
    'Science',
    'Technology',
    'Self-Help',
    'Children',
    'Educational',
    'Other',
  ];

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images.');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera permissions to take photos.');
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = () => {
    if (!bookTitle.trim() || !donorName.trim() || !donorMobile.trim()) {
      Alert.alert('त्रुटि', 'कृपया सभी आवश्यक फ़ील्ड भरें (पुस्तक का नाम, दाता का नाम, मोबाइल नंबर)');
      return;
    }

    // API: POST /donations - Submit new donation
    // Yahan par aap fetch ya axios ka use karke backend ko data bhejenge
    // Agar image upload bhi backend par karni ho to pehle image upload API call hogi
    // API: POST /upload - Upload book image (if backend supports)

    Alert.alert(
      'सफलता!',
      'आपका दान सफलतापूर्वक सबमिट हो गया है। हम शीघ्र ही समीक्षा करेंगे।',
      [{ text: 'ठीक है', onPress: () => {
        setBookTitle('');
        setAuthor(''); // Reset author field
        setIsbn(''); // Reset ISBN field
        setSelectedGenre('Fiction'); // Reset Genre field
        setSelectedCondition('New');
        setSelectedImage(null);
        setDonorName('');
        setDonorMobile('');
        setDonationDate(new Date().toISOString().split('T')[0]);
        setDonorAddress('');
        // removed setBookLocation
      }}]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Ionicons name="library" size={32} color="#2563eb" />
          <Text style={styles.headerTitle}>दान फॉर्म</Text>
        </View>
        <View style={styles.form}>
          {/* Donor Information Section (moved to top) */}
          <Text style={styles.sectionTitle}>दाता की जानकारी</Text>
          {/* Donor Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>दाता का नाम *</Text>
            <TextInput
              style={styles.textInput}
              value={donorName}
              onChangeText={setDonorName}
              placeholder="पूरा नाम दर्ज करें"
              placeholderTextColor="#94a3b8"
            />
          </View>
          {/* Donor Mobile */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>मोबाइल नंबर *</Text>
            <TextInput
              style={styles.textInput}
              value={donorMobile}
              onChangeText={setDonorMobile}
              placeholder="मोबाइल नंबर दर्ज करें"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
            />
          </View>
          {/* Donation Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>दान की तिथि</Text>
            <TextInput
              style={styles.textInput}
              value={donationDate}
              onChangeText={setDonationDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#94a3b8"
            />
          </View>
          {/* Book Information Section */}
          <Text style={styles.sectionTitle}>पुस्तक की जानकारी</Text>
          {/* Book Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>पुस्तक का नाम *</Text>
            <TextInput
              style={styles.textInput}
              value={bookTitle}
              onChangeText={setBookTitle}
              placeholder="पुस्तक का नाम दर्ज करें"
              placeholderTextColor="#94a3b8"
            />
          </View>
          {/* Author Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>लेखक का नाम</Text>
            <TextInput
              style={styles.textInput}
              value={author}
              onChangeText={setAuthor}
              placeholder="लेखक का नाम दर्ज करें"
              placeholderTextColor="#94a3b8"
            />
          </View>
          {/* ISBN Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ISBN नंबर</Text>
            <TextInput
              style={styles.textInput}
              value={isbn}
              onChangeText={setIsbn}
              placeholder="ISBN नंबर दर्ज करें"
              placeholderTextColor="#94a3b8"
              keyboardType="default"
            />
          </View>
          {/* Genre Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>श्रेणी</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowGenrePicker(!showGenrePicker)}
              activeOpacity={0.7}
            >
              <Text style={styles.pickerButtonText}>{selectedGenre}</Text>
              <Ionicons name="chevron-down" size={20} color="#64748b" />
            </TouchableOpacity>
            {showGenrePicker && (
              <View style={styles.pickerOptions}>
                <ScrollView style={styles.pickerScroll} nestedScrollEnabled={true}>
                  {genres.map((genre) => (
                    <TouchableOpacity
                      key={genre}
                      style={[styles.pickerOption, selectedGenre === genre && { backgroundColor: '#e0e7ff' }]}
                      onPress={() => {
                        setSelectedGenre(genre);
                        setShowGenrePicker(false);
                      }}
                    >
                      <Text style={[
                        styles.pickerOptionText,
                        selectedGenre === genre && styles.pickerOptionTextSelected
                      ]}>
                        {genre}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          {/* Condition */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>पुस्तक की स्थिति</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowConditionPicker(!showConditionPicker)}
            >
              <Text style={styles.pickerButtonText}>{selectedCondition}</Text>
              <Ionicons name="chevron-down" size={20} color="#64748b" />
            </TouchableOpacity>
            {showConditionPicker && (
              <View style={styles.pickerOptions}>
                {conditions.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={styles.pickerOption}
                    onPress={() => {
                      setSelectedCondition(condition);
                      setShowConditionPicker(false);
                    }}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      selectedCondition === condition && styles.pickerOptionTextSelected
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {/* Book Image Upload */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>पुस्तक की छवि</Text>
            {selectedImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
                <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                  <Ionicons name="close-circle" size={24} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.uploadContainer}>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                  <Ionicons name="image" size={24} color="#2563eb" />
                  <Text style={styles.uploadButtonText}>गैलरी से चुनें</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                  <Ionicons name="camera" size={24} color="#2563eb" />
                  <Text style={styles.uploadButtonText}>फोटो लें</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="send" size={20} color="#fff" />
            <Text style={styles.submitButtonText}>दान सबमिट करें</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  uploadButtonText: {
    fontSize: 14,
    color: '#2563eb',
    marginTop: 4,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  uploadedImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#1e293b',
  },
  pickerOptions: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 4,
    maxHeight: 200, // limit height
    overflow: 'hidden',
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#64748b',
  },
  pickerOptionTextSelected: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 