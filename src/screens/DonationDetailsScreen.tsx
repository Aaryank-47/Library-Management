import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Donation } from '../types';

type RootStackParamList = {
  MyDonationsList: undefined;
  DonationDetails: { donation: Donation & { donorName: string } };
};

type DonationDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DonationDetails'>;
type DonationDetailsScreenRouteProp = RouteProp<RootStackParamList, 'DonationDetails'>;

interface DonationDetailsScreenProps {
  navigation: DonationDetailsScreenNavigationProp;
  route: DonationDetailsScreenRouteProp;
}

export default function DonationDetailsScreen({ route, navigation }: DonationDetailsScreenProps) {
  const { donation } = route.params;
  const donorName = donation.donorName;
  // API: GET /donations/:id - Fetch details for a specific donation if needed
  // API: GET /donations?donorName=... - Fetch all donations by this donor (if needed)
  const donorDonations: (Donation & { donorName: string })[] = [];

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

  // Status Hindi mapping
  const getStatusHindi = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'स्वीकृत';
      case 'In Review':
        return 'समीक्षा में';
      case 'Rejected':
        return 'अस्वीकृत';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>दान विवरण</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Donor Name at the top */}
        <Text style={styles.sectionTitle}>दाता: {donorName}</Text>

        {/* List of all books donated by this donor */}
        <Text style={styles.sectionTitle}>दान की गई पुस्तकें</Text>
        {/* No dummy data. Show a message or leave empty. */}
        <Text style={{ color: '#64748b', marginBottom: 16 }}>कोई दान की गई पुस्तक नहीं मिली।</Text>

        {/* Certificate section removed as it was based on dummy data. */}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  placeholder: {
    width: 40,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  },
  bookInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginLeft: 8,
    width: 80,
  },
  infoValue: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  certificateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  certificate: {
    borderWidth: 2,
    borderColor: '#f59e0b',
    borderRadius: 12,
    padding: 24,
    backgroundColor: '#fefce8',
  },
  certificateHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  certificateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400e',
    marginTop: 8,
    textAlign: 'center',
  },
  certificateContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  certificateText: {
    fontSize: 16,
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 8,
  },
  donorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
    textAlign: 'center',
  },
  bookName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  donationDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400e',
    marginTop: 8,
    textAlign: 'center',
  },
  certificateFooter: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f59e0b',
    paddingTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#92400e',
    textAlign: 'center',
    marginBottom: 16,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#92400e',
    paddingTop: 8,
    width: 150,
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e',
  },
}); 