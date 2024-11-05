// src/screens/Explore.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const exploreCategories = [
  {
    id: 1,
    title: "Batik Klasik",
    description: "Koleksi motif batik warisan budaya",
    icon: "diamond-outline",
    color: "#FF385C",
    image: "https://id-everbestshoes-cdn.ascentismedia.com/SharedImages/Public/files/BLOG/2021/Motif%20Batik%20Populer/15%20cuwiri.jpg"
  },
  {
    id: 2,
    title: "Batik Pesisir",
    description: "Ragam batik dari daerah pesisir",
    icon: "water-outline",
    color: "#4A90E2",
    image: "https://i.pinimg.com/564x/bc/3b/c0/bc3bc0c9a6e42d7e55632e3a9dfaf150.jpg"
  },
  {
    id: 3,
    title: "Batik Modern",
    description: "Inovasi motif batik kontemporer",
    icon: "trending-up-outline",
    color: "#50E3C2",
    image: "https://i.pinimg.com/564x/7a/90/cc/7a90cc75e434ffdb5f2904fa52655ad9.jpg"
  }
];

const exploreRegions = [
  {
    id: 1,
    name: "Yogyakarta",
    count: "24 Motif",
    image: "https://i.pinimg.com/564x/0f/87/58/0f875806539d6421e6327d0c8750d9a7.jpg"
  },
  {
    id: 2,
    name: "Solo",
    count: "18 Motif",
    image: "https://i.pinimg.com/564x/84/0b/f4/840bf464bbd48c6101ff5834d70770c2.jpg"
  },
  {
    id: 3,
    name: "Pekalongan",
    count: "15 Motif",
    image: "https://i.pinimg.com/736x/ee/47/4e/ee474e24b1402ab7cd0f98243af41bbf.jpg"
  },
  {
    id: 4,
    name: "Cirebon",
    count: "12 Motif",
    image: "https://i.pinimg.com/564x/44/c7/43/44c743eb273a4a8aedbc1c7770f604ba.jpg"
  }
];

const learningTopics = [
  {
    id: 1,
    title: "Filosofi & Makna",
    lessons: "12 Pelajaran",
    icon: "book-outline",
    color: "#FF8C00"
  },
  {
    id: 2,
    title: "Teknik Membatik",
    lessons: "8 Tutorial",
    icon: "color-palette-outline",
    color: "#9B59B6"
  },
  {
    id: 3,
    title: "Sejarah Batik",
    lessons: "6 Artikel",
    icon: "time-outline",
    color: "#2ECC71"
  }
];

const Explore = () => {
  const renderCategoryCard = (category) => (
    <TouchableOpacity 
      key={category.id}
      style={styles.categoryCard}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: category.image }}
        style={styles.categoryImage}
      />
      <View style={styles.categoryContent}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color + '15' }]}>
          <Ionicons name={category.icon} size={22} color={category.color} />
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRegionCard = (region) => (
    <TouchableOpacity 
      key={region.id}
      style={styles.regionCard}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: region.image }}
        style={styles.regionImage}
      />
      <View style={styles.regionOverlay}>
        <Text style={styles.regionName}>{region.name}</Text>
        <Text style={styles.regionCount}>{region.count}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderLearningCard = (topic) => (
    <TouchableOpacity 
      key={topic.id}
      style={styles.learningCard}
      activeOpacity={0.9}
    >
      <View style={[styles.learningIcon, { backgroundColor: topic.color + '20' }]}>
        <Ionicons name={topic.icon} size={24} color={topic.color} />
      </View>
      <View style={styles.learningContent}>
        <Text style={styles.learningTitle}>{topic.title}</Text>
        <Text style={styles.learningLessons}>{topic.lessons}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eksplorasi</Text>
          <Text style={styles.headerSubtitle}>Temukan keindahan batik Nusantara</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategori</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {exploreCategories.map(renderCategoryCard)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daerah Penghasil</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.regionsContainer}
          >
            {exploreRegions.map(renderRegionCard)}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pembelajaran</Text>
          <View style={styles.learningContainer}>
            {learningTopics.map(renderLearningCard)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 90 : 70,
  },
  header: {
    paddingHorizontal: 4,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    paddingHorizontal: 4,
    letterSpacing: -0.4,
  },
  categoriesContainer: {
    paddingRight: 16,
    gap: 16,
  },
  categoryCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginLeft: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
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
  categoryImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f8f8f8',
  },
  categoryContent: {
    padding: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  regionsContainer: {
    paddingRight: 16,
    gap: 12,
  },
  regionCard: {
    width: 160,
    height: 200,
    borderRadius: 16,
    marginLeft: 4,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
  regionImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  regionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingTop: 32,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  regionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  regionCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  learningContainer: {
    paddingHorizontal: 4,
    gap: 12,
  },
  learningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
  learningIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  learningContent: {
    flex: 1,
  },
  learningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  learningLessons: {
    fontSize: 14,
    color: '#666',
    letterSpacing: -0.2,
  },
});

export default Explore;