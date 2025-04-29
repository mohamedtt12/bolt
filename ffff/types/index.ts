export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  city: string;
  joinedDate: string;
  rating: number;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  location: string;
  postedDate: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  isFavorite: boolean;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  productId: string;
  productTitle: string;
  productImage: string;
  content: string;
  timestamp: string;
  isRead: boolean;
};

export type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  productId: string;
  productTitle: string;
  productImage: string;
};