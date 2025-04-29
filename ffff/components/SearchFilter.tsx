import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { theme } from '@/constants/theme';
import { ChevronDown, MapPin, X } from 'lucide-react-native';
import { citiesList } from '@/data/mockData';

type SearchFilterProps = {
  selectedCity: string | null;
  onCitySelect: (city: string | null) => void;
};

export default function SearchFilter({ selectedCity, onCitySelect }: SearchFilterProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = citiesList.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCity = (city: string) => {
    onCitySelect(city);
    setModalVisible(false);
  };

  const clearCity = () => {
    onCitySelect(null);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <MapPin size={16} color={selectedCity ? theme.colors.primary : theme.colors.gray[500]} />
          <Text 
            style={[
              styles.filterText, 
              selectedCity ? styles.activeFilterText : {}
            ]}
            numberOfLines={1}
          >
            {selectedCity || 'Location'}
          </Text>
          <ChevronDown size={16} color={theme.colors.gray[500]} />
        </TouchableOpacity>
        
        {selectedCity && (
          <TouchableOpacity style={styles.clearButton} onPress={clearCity}>
            <X size={16} color={theme.colors.gray[500]} />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select location</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={20} color={theme.colors.gray[700]} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search city..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholderTextColor={theme.colors.gray[500]}
              />
            </View>
            
            <FlatList
              data={filteredCities}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.cityItem,
                    selectedCity === item && styles.selectedCityItem
                  ]} 
                  onPress={() => handleSelectCity(item)}
                >
                  <MapPin size={16} color={selectedCity === item ? theme.colors.primary : theme.colors.gray[600]} />
                  <Text 
                    style={[
                      styles.cityText,
                      selectedCity === item && styles.selectedCityText
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    maxWidth: 150,
  },
  filterText: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginHorizontal: theme.spacing.sm,
    flex: 1,
  },
  activeFilterText: {
    color: theme.colors.primary,
    fontFamily: 'Inter-Medium',
  },
  clearButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.round,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.lg,
    color: theme.colors.black,
  },
  searchContainer: {
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.gray[100],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  selectedCityItem: {
    backgroundColor: theme.colors.primaryLight + '20',
  },
  cityText: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[800],
    marginLeft: theme.spacing.md,
  },
  selectedCityText: {
    color: theme.colors.primary,
    fontFamily: 'Inter-Medium',
  },
});