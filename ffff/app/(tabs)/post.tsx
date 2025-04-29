import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import { Camera, Upload, ImagePlus } from 'lucide-react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function PostScreen() {
  const { isAuthenticated } = useApp();
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/auth/login');
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Post an Item</Text>
        </View>
        
        <Animated.View 
          entering={FadeIn.duration(400)}
          style={styles.authContainer}
        >
          <Upload size={64} color={theme.colors.gray[300]} />
          <Text style={styles.authTitle}>Ready to sell?</Text>
          <Text style={styles.authText}>
            Log in to post your items and connect with local buyers
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
        <Text style={styles.title}>Post an Item</Text>
      </View>
      
      <ScrollView 
        style={styles.form}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContent}
      >
        <Text style={styles.sectionTitle}>Photos</Text>
        <Text style={styles.sectionDescription}>Add up to 5 photos of your item</Text>
        
        <View style={styles.photoGrid}>
          <View style={styles.photoUpload}>
            <Camera size={24} color={theme.colors.gray[500]} />
            <Text style={styles.photoText}>Take photo</Text>
          </View>
          
          <View style={styles.photoUpload}>
            <ImagePlus size={24} color={theme.colors.gray[500]} />
            <Text style={styles.photoText}>Upload photo</Text>
          </View>
          
          <View style={[styles.photoUpload, styles.photoUploadEmpty]} />
          <View style={[styles.photoUpload, styles.photoUploadEmpty]} />
          <View style={[styles.photoUpload, styles.photoUploadEmpty]} />
        </View>
        
        <Text style={styles.sectionTitle}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a descriptive title"
          placeholderTextColor={theme.colors.gray[500]}
        />
        
        <Text style={styles.sectionTitle}>Price</Text>
        <View style={styles.priceInput}>
          <Text style={styles.currency}>€</Text>
          <TextInput
            style={styles.priceTextInput}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor={theme.colors.gray[500]}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.selector}>
          <Text style={styles.selectorText}>Select a category</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Condition</Text>
        <View style={styles.selector}>
          <Text style={styles.selectorText}>Select condition</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.selector}>
          <Text style={styles.selectorText}>Select your location</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Describe your item in detail..."
          multiline={true}
          numberOfLines={6}
          placeholderTextColor={theme.colors.gray[500]}
          textAlignVertical="top"
        />
        
        <Button
          title="Preview Listing"
          variant="outline"
          size="large"
          style={styles.previewButton}
        />
        
        <Button
          title="Post Item"
          size="large"
          style={styles.postButton}
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
  form: {
    flex: 1,
  },
  formContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
    marginBottom: theme.spacing.xs,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.md,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  photoUpload: {
    width: '48%',
    height: 120,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderStyle: 'dashed',
  },
  photoUploadEmpty: {
    borderStyle: 'dotted',
    borderColor: theme.colors.gray[200],
  },
  photoText: {
    fontFamily: 'Inter-Medium',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginTop: theme.spacing.sm,
  },
  textInput: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    padding: theme.spacing.md,
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
    marginBottom: theme.spacing.xl,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    marginBottom: theme.spacing.xl,
  },
  currency: {
    fontFamily: 'Inter-Bold',
    fontSize: theme.fontSize.xl,
    color: theme.colors.gray[600],
    paddingHorizontal: theme.spacing.md,
  },
  priceTextInput: {
    flex: 1,
    padding: theme.spacing.md,
    fontFamily: 'Inter-Bold',
    fontSize: theme.fontSize.xl,
    color: theme.colors.black,
  },
  selector: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  selectorText: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    color: theme.colors.gray[500],
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  previewButton: {
    marginBottom: theme.spacing.md,
  },
  postButton: {
    marginBottom: theme.spacing.xxl,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  authTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.xl,
    color: theme.colors.black,
    marginTop: theme.spacing.lg,
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