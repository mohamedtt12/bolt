import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import ProductCard from '@/components/ProductCard';
import CategoryItem from '@/components/CategoryItem';
import SearchFilter from '@/components/SearchFilter';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Product, Category } from '@/types';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Filter products based on search query, category, and city
  useEffect(() => {
    const filtered = mockProducts.filter(product => {
      const matchesQuery = searchQuery 
        ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory.name
        : true;
      
      const matchesCity = selectedCity
        ? product.location === selectedCity
        : true;
      
      return matchesQuery && matchesCategory && matchesCity;
    });
    
    setSearchResults(filtered);
  }, [searchQuery, selectedCategory, selectedCity]);

  const handleCategorySelect = (category: Category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color={theme.colors.gray[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands, and more..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setIsSearchActive(!!text);
            }}
            onFocus={() => setIsSearchActive(true)}
            placeholderTextColor={theme.colors.gray[500]}
            returnKeyType="search"
          />
          {isSearchActive && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={20} color={theme.colors.gray[500]} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {mockCategories.map(category => (
            <CategoryItem 
              key={category.id}
              category={category}
              isSelected={selectedCategory?.id === category.id}
              onPress={handleCategorySelect}
            />
          ))}
        </ScrollView>
        
        <View style={styles.locationFilter}>
          <SearchFilter
            selectedCity={selectedCity}
            onCitySelect={setSelectedCity}
          />
        </View>
      </View>

      {searchResults.length > 0 ? (
        <Animated.View 
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          style={styles.resultsContainer}
        >
          <Text style={styles.resultsText}>
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
          </Text>
          
          <FlatList
            data={searchResults}
            renderItem={({ item }) => <ProductCard product={item} horizontal />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      ) : (
        <Animated.View 
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          style={styles.emptyContainer}
        >
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>
            Try adjusting your search or filters to find what you're looking for
          </Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
  filtersContainer: {
    marginBottom: theme.spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  locationFilter: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  resultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.lg,
    color: theme.colors.gray[700],
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[500],
    textAlign: 'center',
    lineHeight: 22,
  },
});