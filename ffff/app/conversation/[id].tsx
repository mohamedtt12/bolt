import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { ChevronLeft, Send, Plus } from 'lucide-react-native';
import { mockMessages, mockConversations } from '@/data/mockData';
import { formatMessageTime } from '@/utils/formatters';
import { Message } from '@/types';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  // Get conversation and messages data
  const conversation = mockConversations.find(c => c.id === id);
  const messages = mockMessages[id as string] || [];
  
  if (!conversation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={theme.colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Conversation</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.errorText}>Conversation not found</Text>
      </SafeAreaView>
    );
  }

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    
    // In a real app, this would send the message to the server
    // Here we just clear the input
    setMessage('');
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.senderId === '1'; // Current user id
    
    return (
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.otherMessageContainer
        ]}
      >
        {!isUser && (
          <Image
            source={{ uri: conversation.participantAvatar }}
            style={styles.avatar}
            contentFit="cover"
          />
        )}
        
        <View 
          style={[
            styles.messageBubble,
            isUser ? styles.userMessageBubble : styles.otherMessageBubble
          ]}
        >
          <Text style={[
            styles.messageText,
            isUser ? styles.userMessageText : styles.otherMessageText
          ]}>
            {item.content}
          </Text>
          <Text style={[
            styles.messageTime,
            isUser ? styles.userMessageTime : styles.otherMessageTime
          ]}>
            {formatMessageTime(item.timestamp)}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={theme.colors.black} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.headerProfile} onPress={() => {}}>
          <Image
            source={{ uri: conversation.participantAvatar }}
            style={styles.headerAvatar}
            contentFit="cover"
          />
          <View>
            <Text style={styles.headerTitle}>{conversation.participantName}</Text>
          </View>
        </TouchableOpacity>
        
        <View style={{ width: 40 }} />
      </View>
      
      <View style={styles.productContainer}>
        <TouchableOpacity 
          style={styles.productCard}
          onPress={() => router.push(`/product/${conversation.productId}`)}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: conversation.productImage }}
            style={styles.productImage}
            contentFit="cover"
          />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle} numberOfLines={1}>{conversation.productTitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Plus size={24} color={theme.colors.gray[600]} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
            placeholderTextColor={theme.colors.gray[500]}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              message.trim().length === 0 ? styles.sendButtonDisabled : {}
            ]}
            onPress={sendMessage}
            disabled={message.trim().length === 0}
          >
            <Send size={20} color={message.trim().length === 0 ? theme.colors.gray[400] : theme.colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
  },
  productContainer: {
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    padding: theme.spacing.md,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  productImage: {
    width: 60,
    height: 60,
  },
  productInfo: {
    flex: 1,
    padding: theme.spacing.sm,
    justifyContent: 'center',
  },
  productTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[800],
  },
  messagesContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: theme.spacing.xs,
  },
  messageBubble: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    maxWidth: '100%',
  },
  userMessageBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.xs,
  },
  userMessageText: {
    color: theme.colors.white,
  },
  otherMessageText: {
    color: theme.colors.black,
  },
  messageTime: {
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.xs,
    alignSelf: 'flex-end',
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  otherMessageTime: {
    color: theme.colors.gray[500],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  attachButton: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: Platform.OS === 'ios' ? theme.spacing.sm : 8,
    maxHeight: 100,
    fontFamily: 'Inter-Regular',
    fontSize: theme.fontSize.md,
    color: theme.colors.black,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.gray[200],
  },
  errorText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.fontSize.lg,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: 100,
  },
});