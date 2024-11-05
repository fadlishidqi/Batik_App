// src/components/BatikModal.js
import React, { useState } from 'react';
import {
 View,
 Text,
 Modal,
 Image,
 StyleSheet,
 TouchableOpacity,
 ScrollView,
 Dimensions,
 ActivityIndicator,
 Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BatikModal = ({ isVisible, batik, onClose }) => {
 const [imageLoading, setImageLoading] = useState(true);

 return (
   <Modal
     animationType="slide"
     transparent={true}
     visible={isVisible}
     onRequestClose={onClose}
   >
     <View style={styles.modalOverlay}>
       <View style={styles.modalContent}>
         <TouchableOpacity 
           style={styles.closeIconButton}
           onPress={onClose}
         >
           <Ionicons name="close-circle" size={32} color="#fff" />
         </TouchableOpacity>

         <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
           <View style={styles.imageContainer}>
             {imageLoading && (
               <View style={styles.loadingContainer}>
                 <ActivityIndicator size="large" color="#FF385C" />
               </View>
             )}
             <Image 
               source={{ uri: batik?.gambar }} 
               style={styles.modalImage}
               resizeMode="cover"
               onLoadStart={() => setImageLoading(true)}
               onLoadEnd={() => setImageLoading(false)}
             />
           </View>

           <View style={styles.modalInfo}>
             <View style={styles.header}>
               <Text style={styles.modalTitle}>{batik?.nama}</Text>
               <View style={styles.locationContainer}>
                 <Ionicons name="location-sharp" size={16} color="#666" />
                 <Text style={styles.modalSubtitle}>{batik?.asal}</Text>
               </View>
             </View>

             <View style={styles.divider} />

             <View style={styles.descriptionContainer}>
               <Text style={styles.sectionTitle}>Makna & Filosofi</Text>
               <Text style={styles.modalDescription}>{batik?.makna}</Text>
             </View>
           </View>
         </ScrollView>

         <View style={styles.footer}>
           <TouchableOpacity 
             style={styles.closeButton}
             onPress={onClose}
             activeOpacity={0.8}
           >
             <Text style={styles.closeButtonText}>Tutup</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
   </Modal>
 );
};

const styles = StyleSheet.create({
 modalOverlay: {
   flex: 1,
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   justifyContent: 'flex-end', // Modal muncul dari bawah
 },
 modalContent: {
   width: '100%',
   maxHeight: windowHeight * 0.9,
   backgroundColor: '#fff',
   borderTopLeftRadius: 24,
   borderTopRightRadius: 24,
   overflow: 'hidden',
 },
 closeIconButton: {
   position: 'absolute',
   top: 16,
   right: 16,
   zIndex: 1,
   ...Platform.select({
     ios: {
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
     },
     android: {
       elevation: 5,
     },
   }),
 },
 imageContainer: {
   width: '100%',
   height: 300,
   backgroundColor: '#f5f5f5',
 },
 loadingContainer: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#f5f5f5',
 },
 modalImage: {
   width: '100%',
   height: '100%',
 },
 modalInfo: {
   padding: 20,
 },
 header: {
   marginBottom: 16,
 },
 modalTitle: {
   fontSize: 24,
   fontWeight: '700',
   color: '#1a1a1a',
   marginBottom: 8,
 },
 locationContainer: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 modalSubtitle: {
   fontSize: 16,
   color: '#666',
   marginLeft: 4,
   fontWeight: '500',
 },
 divider: {
   height: 1,
   backgroundColor: '#eee',
   marginVertical: 16,
 },
 descriptionContainer: {
   gap: 8,
 },
 sectionTitle: {
   fontSize: 18,
   fontWeight: '600',
   color: '#1a1a1a',
   marginBottom: 4,
 },
 modalDescription: {
   fontSize: 15,
   color: '#444',
   lineHeight: 24,
 },
 footer: {
   padding: 16,
   paddingBottom: Platform.OS === 'ios' ? 32 : 16,
   borderTopWidth: 1,
   borderTopColor: '#eee',
 },
 closeButton: {
   backgroundColor: '#FF385C',
   padding: 16,
   alignItems: 'center',
   borderRadius: 12,
   ...Platform.select({
     ios: {
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.1,
       shadowRadius: 3.84,
     },
     android: {
       elevation: 3,
     },
   }),
 },
 closeButtonText: {
   color: '#fff',
   fontSize: 16,
   fontWeight: '600',
 },
});

export default BatikModal;