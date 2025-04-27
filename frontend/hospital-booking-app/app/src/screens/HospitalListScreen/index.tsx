import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, Text } from 'react-native';
import { Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { SkeletonLoader } from '../../components/';
import { useQuery } from '@apollo/client';
import { GET_HOSPITALS_QUERY } from '../../queries/hostital.query';
import { styles } from './styles';
// Interface to define the structure of a Hospital object
interface Hospital {
  id: string;
  name: string;
  services: string[];
  imageUrl: string;
}

// Hospital List Screen Component
const HospitalListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({}); // Track loading state of images

  // Fetch hospital data using Apollo's useQuery hook
  const { data, loading, error } = useQuery(GET_HOSPITALS_QUERY);

  // Validate search query and ensure it's a valid string
  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  // Memoized filter to avoid re-calculating filtered list on every render
  const filteredHospitals = useMemo(() => {
    return data?.hospitals?.hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  // Callback to handle hospital selection and navigate to another screen
  const handleHospitalSelect = useCallback((hospital: Hospital) => {
    navigation.navigate('AppointmentBookingScreen', { hospital });
  }, [navigation]);

  // Handler for when an image is loaded
  const handleImageLoad = useCallback((id: string) => {
    setLoadingImages(prevState => ({ ...prevState, [id]: false }));
  }, []);

  // Render Loader or Error message based on Apollo Query state
  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>Failed to load hospitals. Please try again later.</Text>;
  }

  // If no hospitals found after filtering
  if (filteredHospitals?.length === 0 && !loading && !error) {
    return <Text>No hospitals found.</Text>;
  }

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
      </View>

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
