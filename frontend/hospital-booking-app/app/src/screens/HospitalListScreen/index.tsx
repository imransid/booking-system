import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { SkeletonLoader } from '../../components/';
import { styles } from './styles';

// Interface to define the structure of a Hospital object
interface Hospital {
  id: string;
  name: string;
  services: string[];
  imageUrl: string;
}

// Sample hospitals data
const hospitals: Hospital[] = [
  { id: '1', name: 'City Hospital', services: ['X-ray', 'Blood Test', 'MRI'], imageUrl: 'https://www.evercarebd.com/wp-content/themes/wp-bootstrap-starter-child/asset/img/Evercare-Dhaka-scaled.jpeg' },
  { id: '2', name: 'Downtown Clinic', services: ['ECG', 'Blood Test', 'Ultrasound'], imageUrl: 'https://www.evercarebd.com/wp-content/themes/wp-bootstrap-starter-child/asset/img/Evercare-Dhaka-scaled.jpeg' },
  { id: '3', name: 'Riverdale Hospital', services: ['X-ray', 'Surgery', 'Blood Test'], imageUrl: 'https://www.evercarebd.com/wp-content/themes/wp-bootstrap-starter-child/asset/img/Evercare-Dhaka-scaled.jpeg' },
];

const HospitalListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({}); // Track loading state of images
  const [error, setError] = useState<string>(''); // State for error message

  // Validate search query and ensure it's a valid string
  const handleSearchQueryChange = (text: string) => {
    if (text.trim() === '') {
      setError('Search query cannot be empty.');
    } else {
      setError('');
    }
    setSearchQuery(text);
  };

  // Memoized filter to avoid re-calculating filtered list on every render
  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Callback to handle hospital selection and navigate to another screen
  const handleHospitalSelect = useCallback((hospital: Hospital) => {
    // navigation.navigate('HospitalServices', { hospital }); // Uncomment for navigation
  }, []);

  // Handler for when an image is loaded
  const handleImageLoad = useCallback((id: string) => {
    setLoadingImages(prevState => ({ ...prevState, [id]: false }));
  }, []);

  return (
    <View style={styles.container}>
      {/* Appbar for the header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Hospitals" />
        <Appbar.Action icon="account-circle" />
      </Appbar.Header>

      {/* Subheader with search bar */}
      <View style={styles.subheader}>
        <TextInput
          value={searchQuery}
          onChangeText={handleSearchQueryChange} // Update search query on change
          placeholder="Search hospitals..."
          style={styles.searchInput}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      {/* Display an error message if no hospitals are found */}
      {filteredHospitals.length === 0 && !error && (
        <Text style={styles.noResultsText}>No hospitals found.</Text>
      )}

      {/* List of hospitals with conditional rendering for loading images */}
      <FlatList
        data={filteredHospitals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleHospitalSelect(item)}>
            <Card style={styles.card}>
              <>
                {/* Conditional rendering for image load */}
                {loadingImages[item.id] ? (
                  <SkeletonLoader />
                ) : (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.cardImage}
                    resizeMode="cover"
                    contentFit="cover"
                    onLoad={() => handleImageLoad(item.id)} // Image loaded handler
                  />
                )}
                <Card.Content>
                  <Title style={styles.cardTitle}>{item.name}</Title>
                  <Paragraph>{item.services.join(', ')}</Paragraph>
                </Card.Content>
              </>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HospitalListScreen;
