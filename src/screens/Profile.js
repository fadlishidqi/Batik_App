// src/screens/Profile.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBatikImages } from '../service/batikService';
import BatikModal from '../components/BatikModal';

const Profile = () => {
  const [batikImages, setBatikImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBatik, setSelectedBatik] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getBatikImages();
      // Membatasi data menjadi 5 batik saja
      setBatikImages(data.slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  const achievements = [
    {
      icon: "ribbon-outline",
      title: "Kolektor Batik",
      description: "Mengoleksi 50 Motif Batik"
    },
    {
      icon: "location-outline",
      title: "Penjelajah",
      description: "Mengunjungi 10 Kota Batik"
    },
    {
      icon: "book-outline",
      title: "Pengetahuan",
      description: "Mempelajari 20 Filosofi Batik"
    }
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF385C" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/seputipy.appspot.com/o/covers%2Fbayu.jpeg?alt=media' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.name}>Bayu Soepadmo</Text>
          <Text style={styles.subtitle}>Penggemar Budaya Indonesia</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{batikImages.length}</Text>
            <Text style={styles.statLabel}>Koleksi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Provinsi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>52</Text>
            <Text style={styles.statLabel}>Favorit</Text>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pencapaian</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Ionicons name={achievement.icon} size={24} color="#FF385C" />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDesc}>{achievement.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Saved Batiks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Batik Tersimpan</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.savedBatiksContainer}
          >
            {batikImages.map((batik, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.batikCard}
                onPress={() => {
                  setSelectedBatik(batik);
                  setModalVisible(true);
                }}
              >
                <Image
                  source={{ uri: batik.gambar }}
                  style={styles.batikImage}
                />
                <View style={styles.batikInfo}>
                  <Text style={styles.batikName} numberOfLines={1}>{batik.nama}</Text>
                  <View style={styles.batikLocation}>
                    <Ionicons name="location-sharp" size={12} color="#666" />
                    <Text style={styles.batikOrigin} numberOfLines={1}>{batik.asal}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BatikModal 
        isVisible={modalVisible}
        batik={selectedBatik}
        onClose={() => {
          setModalVisible(false);
          setSelectedBatik(null);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 90 : 70,
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    paddingBottom: 24,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#eee',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 56, 92, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#666',
  },
  savedBatiksContainer: {
    paddingRight: 16,
  },
  batikCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  batikImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f5f5f5',
  },
  batikInfo: {
    padding: 12,
    backgroundColor: '#ffffff',
  },
  batikName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  batikLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batikOrigin: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default Profile;