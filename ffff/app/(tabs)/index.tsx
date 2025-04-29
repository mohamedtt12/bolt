import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import ProductCard from '@/components/ProductCard';
import CategoryItem from '@/components/CategoryItem';
import Button from '@/components/Button';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Category } from '@/types';
import { useApp } from '@/context/AppContext';

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const featuredProducts = mockProducts.slice(0, 2);
  const recentProducts = mockProducts.filter(product => {
    if (selectedCategory) {
      return product.category === selectedCategory.name;
    }
    return true;
  });

  const handleCategoryPress = (category: Category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const navigateToSearch = () => {
    router.push('/search');
  };

  const navigateToAuth = () => {
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour 👋</Text>
          <Text style={styles.subtitle}>Find amazing second-hand items near you</Text>
        </View>
        
        {isAuthenticated ? (
          <View style={styles.iconContainer}>
            <Bell size={24} color={theme.colors.gray[700]} />
          </View>
        ) : (
          <Button 
            title="Log in" 
            variant="outline" 
            size="small" 
            onPress={navigateToAuth}
          />
        )}
      </View>
      
      <Button
        title="Search products, brands, and more..."
        variant="ghost"
        size="medium"
        fullWidth
        style={styles.searchButton}
        textStyle={styles.searchButtonText}
        icon={<Search size={18} color={theme.colors.gray[500]} />}
        onPress={navigateToSearch}
      />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          
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
                onPress={handleCategoryPress}
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          
          <View style={styles.featuredContainer}>
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                horizontal
              />
            ))}
          </View>
        </View>
        
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? `${selectedCategory.name} Items` : 'Recently Added'}
          </Text>
          
          <FlatList
            data={recentProducts}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  greeting: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.xl,
    color: theme.colors.black,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.xs,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: theme.colors.gray[100],
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    justifyContent: 'flex-start',
    paddingHorizontal: theme.spacing.md,
  },
  searchButtonText: {
    color: theme.colors.gray[500],
    fontFamily: 'Inter-Regular',
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  categoriesSection: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.lg,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  categoriesContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  featuredSection: {
    marginBottom: theme.spacing.xl,
  },
  featuredContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  recentSection: {
    flex: 1,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
  },
});