import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Product } from '@/types';
import { useApp } from '@/context/AppContext';

type ProductCardProps = {
  product: Product;
  horizontal?: boolean;
};

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - theme.spacing.lg;

export default function ProductCard({ product, horizontal = false }: ProductCardProps) {
  const router = useRouter();
  const { favoriteProducts, toggleFavorite } = useApp();
  const isFavorite = favoriteProducts.includes(product.id);

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleFavoritePress = () => {
    toggleFavorite(product.id);
  };

  if (horizontal) {
    return (
      <TouchableOpacity 
        style={styles.horizontalCard} 
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <Image
          source={{ uri: product.images[0] }}
          style={styles.horizontalImage}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.horizontalContent}>
          <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          <View style={styles.horizontalDetails}>
            <Text style={styles.location}>{product.location}</Text>
            <Text style={styles.date}>{formatDate(product.postedDate)}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          <Heart 
            size={20} 
            color={isFavorite ? theme.colors.secondary : theme.colors.gray[400]} 
            fill={isFavorite ? theme.colors.secondary : 'none'} 
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          <Heart 
            size={18} 
            color={isFavorite ? theme.colors.secondary : theme.colors.gray[400]} 
            fill={isFavorite ? theme.colors.secondary : 'none'} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <View style={styles.details}>
          <Text style={styles.location}>{product.location}</Text>
          <Text style={styles.date}>{formatDate(product.postedDate)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.small,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: theme.spacing.sm,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[600],
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[500],
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: theme.borderRadius.round,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow.small,
  },
  horizontalCard: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.small,
  },
  horizontalImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: theme.borderRadius.md,
    borderBottomLeftRadius: theme.borderRadius.md,
  },
  horizontalContent: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  horizontalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  }
});