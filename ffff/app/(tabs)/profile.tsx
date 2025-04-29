import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';
import { useApp } from '@/context/AppContext';
import { LogOut, Heart, Settings, Package, Star, ShoppingBag, CircleHelp as HelpCircle, MessageSquare } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useApp();
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        
        <Animated.View 
          entering={FadeIn.duration(400)}
          style={styles.authContainer}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3280908/pexels-photo-3280908.jpeg' }}
            style={styles.authImage}
            contentFit="cover"
          />
          <Text style={styles.authTitle}>Create an account</Text>
          <Text style={styles.authText}>
            Sign up to buy, sell, and discover amazing second-hand items in your area
          </Text>
          <Button 
            title="Log in" 
            onPress={navigateToLogin} 
            size="large"
            style={styles.authButton}
          />
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Settings size={24} color={theme.colors.gray[700]} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userLocation}>{user.city}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={theme.colors.warning} fill={theme.colors.warning} />
              <Text style={styles.ratingText}>{user.rating}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Listed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Sold</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <ShoppingBag size={20} color={theme.colors.gray[700]} />
            <Text style={styles.menuText}>My Listings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Package size={20} color={theme.colors.gray[700]} />
            <Text style={styles.menuText}>Purchases</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Heart size={20} color={theme.colors.gray[700]} />
            <Text style={styles.menuText}>Favorites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MessageSquare size={20} color={theme.colors.gray[700]} />
            <Text style={styles.menuText}>Messages</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={20} color={theme.colors.gray[700]} />
            <Text style={styles.menuText}>Help Center</Text>
          </TouchableOpacity>
        </View>
        
        <Button
          title="Log out"
          variant="outline"
          onPress={handleLogout}
          icon={<LogOut size={18} color={theme.colors.gray[700]} />}
          style={styles.logoutButton}
          textStyle={{ color: theme.colors.gray[700] }}
        />
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
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.xl,
    color: theme.colors.black,
  },
  contentContainer: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: theme.spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.lg,
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  userLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[700],
    marginLeft: theme.spacing.xs,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.md,
    ...theme.shadow.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: theme.colors.gray[200],
  },
  menuSection: {
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    ...theme.shadow.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  menuText: {
    fontFamily: 'Inter-Medium',
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[800],
    marginLeft: theme.spacing.lg,
  },
  logoutButton: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xxl,
    marginHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.gray[100],
    borderColor: theme.colors.gray[300],
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  authImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: theme.spacing.lg,
  },
  authTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.xl,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  authText: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  authButton: {
    width: '80%',
  },
});