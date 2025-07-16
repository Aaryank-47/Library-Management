import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { Donation } from '../types';

type RootStackParamList = {
  DonationsList: undefined;
  DonationDetails: { donation: Donation & { donorName: string } };
};

type DonationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DonationsList'>;

interface DonationsScreenProps {
  navigation: DonationsScreenNavigationProp;
}

// Dummy/mock data removed. You can fetch or add real data here in the future.

export default function DonationsScreen({ navigation }: DonationsScreenProps) {
  // API: GET /donations - Fetch all donations for this user
  // Yahan par useEffect me API call karke donations set karenge
  const [donations] = useState<(Donation & { donorName: string })[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return '#10b981';
      case 'In Review':
        return '#f59e0b';
      case 'Rejected':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'checkmark-circle';
      case 'In Review':
        return 'time';
      case 'Rejected':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const handleEditDonation = (donation: Donation & { donorName: string }) => {
    Alert.alert('दान संपादित करें', `"${donation.book.title}" के लिए दान संपादित करें`);
  };

  const handleDeleteDonation = (donation: Donation & { donorName: string }) => {
    Alert.alert(
      'दान हटाएं',
      `क्या आप वाकई "${donation.book.title}" को हटाना चाहते हैं?`,
      [
        { text: 'रद्द करें', style: 'cancel' },
        { text: 'हटाएं', style: 'destructive', onPress: () => {
          Alert.alert('हटा दिया गया', 'दान हटा दिया गया है');
        }}
      ]
    );
  };

  const handleDonationPress = (donation: Donation & { donorName: string }) => {
    navigation.navigate('DonationDetails', { donation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Stats */}
        <View style={styles.headerStats}>
          <View style={styles.statCard}>
            <Ionicons name="library" size={24} color="#2563eb" />
            <Text style={styles.statNumber}>{donations.length}</Text>
            <Text style={styles.statLabel}>कुल दान</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            <Text style={styles.statNumber}>
              {donations.filter(d => d.status === 'Accepted').length}
            </Text>
            <Text style={styles.statLabel}>स्वीकृत</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#f59e0b" />
            <Text style={styles.statNumber}>
              {donations.filter(d => d.status === 'In Review').length}
            </Text>
            <Text style={styles.statLabel}>समीक्षा में</Text>
          </View>
        </View>

        {/* Donations List */}
        <View style={styles.donationsContainer}>
          <Text style={styles.sectionTitle}>दान सूची</Text>
          
          {donations.map((donation) => (
            <TouchableOpacity 
              key={donation.id} 
              style={styles.donationCard}
              onPress={() => handleDonationPress(donation)}
              activeOpacity={0.7}
            >
              <View style={styles.donationHeader}>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>दाता: {donation.donorName}</Text>
                </View>
              </View>

              <View style={styles.donationDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar" size={16} color="#64748b" />
                  <Text style={styles.detailText}>
                    दान तिथि: {donation.dateDonated.toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="library" size={16} color="#64748b" />
                  <Text style={styles.detailText}>
                    कुल दान की गई पुस्तकें: {donations.length}
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleEditDonation(donation)}
                >
                  <Ionicons name="create" size={16} color="#2563eb" />
                  <Text style={styles.actionButtonText}>संपादित करें</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDeleteDonation(donation)}
                >
                  <Ionicons name="trash" size={16} color="#ef4444" />
                  <Text style={[styles.actionButtonText, styles.deleteButtonText]}>हटाएं</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  donationsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  donationCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  donationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  bookGenre: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  donationDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#2563eb',
    marginLeft: 4,
    fontWeight: '600',
  },
  deleteButton: {
    borderColor: '#fecaca',
  },
  deleteButtonText: {
    color: '#ef4444',
  },
}); 