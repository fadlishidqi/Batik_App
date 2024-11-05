// src/screens/Home.js
import React, { useEffect, useState } from 'react';
import { 
 View, 
 Text, 
 FlatList, 
 Image, 
 StyleSheet, 
 ActivityIndicator,
 Dimensions,
 SafeAreaView,
 TouchableOpacity,
 StatusBar,
 Platform,
} from 'react-native';
import { getBatikImages } from '../service/batikService';
import BatikModal from '../components/BatikModal';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const ITEM_WIDTH = (windowWidth - 40) / 2;
const ITEM_HEIGHT = 220;

const Home = () => {
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
     setBatikImages(data);
   } finally {
     setLoading(false);
   }
 };

 const renderHeader = () => (
   <View style={styles.headerSection}>
     <Text style={styles.headerTitle}>Jelajahi</Text>
     <Text style={styles.headerSubtitle}>Keindahan Batik Nusantara</Text>
     
     <View style={styles.statsContainer}>
       <View style={styles.statCard}>
         <View style={styles.statIconContainer}>
           <Ionicons name="grid-outline" size={24} color="#FF385C" />
         </View>
         <View style={styles.statTextContainer}>
           <Text style={styles.statNumber}>{batikImages.length}</Text>
           <Text style={styles.statLabel}>Koleksi Motif</Text>
         </View>
       </View>
       
       <View style={styles.statCard}>
         <View style={styles.statIconContainer}>
           <Ionicons name="map-outline" size={24} color="#FF385C" />
         </View>
         <View style={styles.statTextContainer}>
           <Text style={styles.statNumber}>34</Text>
           <Text style={styles.statLabel}>Provinsi</Text>
         </View>
       </View>
     </View>
   </View>
 );

 const renderItem = ({ item }) => (
   <TouchableOpacity 
     style={styles.card}
     activeOpacity={0.9}
     onPress={() => {
       setSelectedBatik(item);
       setModalVisible(true);
     }}
   >
     <Image 
       source={{ uri: item.gambar }} 
       style={styles.cardImage}
       resizeMode="cover"
     />
     <View style={styles.cardOverlay}>
       <View style={styles.cardContent}>
         <Text style={styles.cardTitle} numberOfLines={1}>
           {item.nama}
         </Text>
         <View style={styles.cardLocation}>
           <Ionicons name="location-sharp" size={16} color="#fff" />
           <Text style={styles.cardLocationText} numberOfLines={1}>
             {item.asal}
           </Text>
         </View>
       </View>
     </View>
   </TouchableOpacity>
 );

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
     
     <FlatList
       data={batikImages}
       renderItem={renderItem}
       keyExtractor={(item, index) => index.toString()}
       numColumns={2}
       contentContainerStyle={{
         ...styles.listContainer,
         paddingBottom: Platform.OS === 'android' ? 70 : 0
       }}
       ListHeaderComponent={renderHeader}
       showsVerticalScrollIndicator={false}
       columnWrapperStyle={styles.columnWrapper}
       contentInset={{
         bottom: Platform.OS === 'ios' ? 90 : 0
       }}
       contentInsetAdjustmentBehavior="automatic"
       automaticallyAdjustContentInsets={true}
     />

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
   backgroundColor: '#fff',
 },
 headerSection: {
   paddingHorizontal: 16,
   paddingTop: Platform.OS === 'ios' ? 20 : 40,
   paddingBottom: 24,
 },
 headerTitle: {
   fontSize: 32,
   fontWeight: '700',
   color: '#1a1a1a',
   marginBottom: 2,
 },
 headerSubtitle: {
   fontSize: 18,
   color: '#666',
   marginBottom: 24,
   fontWeight: '500',
 },
 statsContainer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   gap: 12,
 },
 statCard: {
   flex: 1,
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderRadius: 16,
   padding: 16,
   ...Platform.select({
     ios: {
       shadowColor: '#000',
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.1,
       shadowRadius: 3.84,
     },
     android: {
       elevation: 3,
     },
   }),
 },
 statIconContainer: {
   width: 48,
   height: 48,
   borderRadius: 12,
   backgroundColor: 'rgba(255, 56, 92, 0.1)',
   justifyContent: 'center',
   alignItems: 'center',
   marginRight: 12,
 },
 statTextContainer: {
   flex: 1,
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
 listContainer: {
   padding: 12,
 },
 columnWrapper: {
   justifyContent: 'space-between',
   marginHorizontal: 4,
 },
 card: {
   width: ITEM_WIDTH,
   height: ITEM_HEIGHT,
   marginBottom: 12,
   borderRadius: 12,
   overflow: 'hidden',
   backgroundColor: '#fff',
   ...Platform.select({
     ios: {
       shadowColor: '#000',
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.1,
       shadowRadius: 4,
     },
     android: {
       elevation: 2,
     },
   }),
 },
 cardImage: {
   width: '100%',
   height: '100%',
   backgroundColor: '#f5f5f5',
 },
 cardOverlay: {
   position: 'absolute',
   bottom: 0,
   left: 0,
   right: 0,
   padding: 12,
   paddingTop: 32,
   backgroundColor: 'rgba(0,0,0,0.45)',
 },
 cardContent: {
   gap: 4,
 },
 cardTitle: {
   fontSize: 15,
   fontWeight: '600',
   color: '#fff',
   marginBottom: 2,
 },
 cardLocation: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 cardLocationText: {
   fontSize: 12,
   color: '#fff',
   opacity: 0.9,
   marginLeft: 4,
   fontWeight: '400',
 },
});

export default Home;